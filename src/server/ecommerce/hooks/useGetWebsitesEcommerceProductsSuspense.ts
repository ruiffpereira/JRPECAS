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
  GetWebsitesEcommerceProductsQueryResponse,
  GetWebsitesEcommerceProductsHeaderParams,
  GetWebsitesEcommerceProducts400,
  GetWebsitesEcommerceProducts404,
  GetWebsitesEcommerceProducts500,
} from "../types/GetWebsitesEcommerceProducts.js";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const getWebsitesEcommerceProductsSuspenseQueryKey = () =>
  [{ url: "/websites/ecommerce/products" }] as const;

export type GetWebsitesEcommerceProductsSuspenseQueryKey = ReturnType<
  typeof getWebsitesEcommerceProductsSuspenseQueryKey
>;

/**
 * @summary Get all products for a website
 * {@link /websites/ecommerce/products}
 */
export async function getWebsitesEcommerceProductsSuspense(
  headers: GetWebsitesEcommerceProductsHeaderParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    GetWebsitesEcommerceProductsQueryResponse,
    ResponseErrorConfig<
      | GetWebsitesEcommerceProducts400
      | GetWebsitesEcommerceProducts404
      | GetWebsitesEcommerceProducts500
    >,
    unknown
  >({
    method: "GET",
    url: `/websites/ecommerce/products`,
    baseURL: "http://localhost:2001/api",
    ...requestConfig,
    headers: { ...headers, ...requestConfig.headers },
  });
  return res.data;
}

export function getWebsitesEcommerceProductsSuspenseQueryOptions(
  headers: GetWebsitesEcommerceProductsHeaderParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getWebsitesEcommerceProductsSuspenseQueryKey();
  return queryOptions<
    GetWebsitesEcommerceProductsQueryResponse,
    ResponseErrorConfig<
      | GetWebsitesEcommerceProducts400
      | GetWebsitesEcommerceProducts404
      | GetWebsitesEcommerceProducts500
    >,
    GetWebsitesEcommerceProductsQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getWebsitesEcommerceProductsSuspense(headers, config);
    },
  });
}

/**
 * @summary Get all products for a website
 * {@link /websites/ecommerce/products}
 */
export function useGetWebsitesEcommerceProductsSuspense<
  TData = GetWebsitesEcommerceProductsQueryResponse,
  TQueryData = GetWebsitesEcommerceProductsQueryResponse,
  TQueryKey extends QueryKey = GetWebsitesEcommerceProductsSuspenseQueryKey,
>(
  headers: GetWebsitesEcommerceProductsHeaderParams,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetWebsitesEcommerceProductsQueryResponse,
        ResponseErrorConfig<
          | GetWebsitesEcommerceProducts400
          | GetWebsitesEcommerceProducts404
          | GetWebsitesEcommerceProducts500
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
    queryOptions?.queryKey ?? getWebsitesEcommerceProductsSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(getWebsitesEcommerceProductsSuspenseQueryOptions(
      headers,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<
      | GetWebsitesEcommerceProducts400
      | GetWebsitesEcommerceProducts404
      | GetWebsitesEcommerceProducts500
    >
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
