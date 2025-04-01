import client from "@kubb/plugin-client/clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import type {
  GetWebsitesEcommerceCartsQueryResponse,
  GetWebsitesEcommerceCartsHeaderParams,
  GetWebsitesEcommerceCarts404,
  GetWebsitesEcommerceCarts500,
} from "../types/GetWebsitesEcommerceCarts.js";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const getWebsitesEcommerceCartsSuspenseQueryKey = () =>
  [{ url: "/websites/ecommerce/carts" }] as const;

export type GetWebsitesEcommerceCartsSuspenseQueryKey = ReturnType<
  typeof getWebsitesEcommerceCartsSuspenseQueryKey
>;

/**
 * @summary Get all items in the cart
 * {@link /websites/ecommerce/carts}
 */
export async function getWebsitesEcommerceCartsSuspense(
  headers: GetWebsitesEcommerceCartsHeaderParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    GetWebsitesEcommerceCartsQueryResponse,
    ResponseErrorConfig<
      GetWebsitesEcommerceCarts404 | GetWebsitesEcommerceCarts500
    >,
    unknown
  >({
    method: "GET",
    url: `/websites/ecommerce/carts`,
    baseURL: "http://localhost:2001/api",
    ...requestConfig,
    headers: { ...headers, ...requestConfig.headers },
  });
  return res.data;
}

export function getWebsitesEcommerceCartsSuspenseQueryOptions(
  headers: GetWebsitesEcommerceCartsHeaderParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getWebsitesEcommerceCartsSuspenseQueryKey();
  return queryOptions<
    GetWebsitesEcommerceCartsQueryResponse,
    ResponseErrorConfig<
      GetWebsitesEcommerceCarts404 | GetWebsitesEcommerceCarts500
    >,
    GetWebsitesEcommerceCartsQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getWebsitesEcommerceCartsSuspense(headers, config);
    },
  });
}

/**
 * @summary Get all items in the cart
 * {@link /websites/ecommerce/carts}
 */
export function useGetWebsitesEcommerceCartsSuspense<
  TData = GetWebsitesEcommerceCartsQueryResponse,
  TQueryData = GetWebsitesEcommerceCartsQueryResponse,
  TQueryKey extends QueryKey = GetWebsitesEcommerceCartsSuspenseQueryKey,
>(
  headers: GetWebsitesEcommerceCartsHeaderParams,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetWebsitesEcommerceCartsQueryResponse,
        ResponseErrorConfig<
          GetWebsitesEcommerceCarts404 | GetWebsitesEcommerceCarts500
        >,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getWebsitesEcommerceCartsSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(getWebsitesEcommerceCartsSuspenseQueryOptions(
      headers,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<
      GetWebsitesEcommerceCarts404 | GetWebsitesEcommerceCarts500
    >
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
