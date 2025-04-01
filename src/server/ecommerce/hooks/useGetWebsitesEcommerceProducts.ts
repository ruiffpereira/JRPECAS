import client from "@kubb/plugin-client/clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type {
  GetWebsitesEcommerceProductsQueryResponse,
  GetWebsitesEcommerceProductsHeaderParams,
  GetWebsitesEcommerceProducts400,
  GetWebsitesEcommerceProducts404,
  GetWebsitesEcommerceProducts500,
} from "../types/GetWebsitesEcommerceProducts.js";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getWebsitesEcommerceProductsQueryKey = () =>
  [{ url: "/websites/ecommerce/products" }] as const;

export type GetWebsitesEcommerceProductsQueryKey = ReturnType<
  typeof getWebsitesEcommerceProductsQueryKey
>;

/**
 * @summary Get all products for a website
 * {@link /websites/ecommerce/products}
 */
export async function getWebsitesEcommerceProducts(
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

export function getWebsitesEcommerceProductsQueryOptions(
  headers: GetWebsitesEcommerceProductsHeaderParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getWebsitesEcommerceProductsQueryKey();
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
      return getWebsitesEcommerceProducts(headers, config);
    },
  });
}

/**
 * @summary Get all products for a website
 * {@link /websites/ecommerce/products}
 */
export function useGetWebsitesEcommerceProducts<
  TData = GetWebsitesEcommerceProductsQueryResponse,
  TQueryData = GetWebsitesEcommerceProductsQueryResponse,
  TQueryKey extends QueryKey = GetWebsitesEcommerceProductsQueryKey,
>(
  headers: GetWebsitesEcommerceProductsHeaderParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetWebsitesEcommerceProductsQueryResponse,
        ResponseErrorConfig<
          | GetWebsitesEcommerceProducts400
          | GetWebsitesEcommerceProducts404
          | GetWebsitesEcommerceProducts500
        >,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? getWebsitesEcommerceProductsQueryKey();

  const query = useQuery({
    ...(getWebsitesEcommerceProductsQueryOptions(
      headers,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<
      | GetWebsitesEcommerceProducts400
      | GetWebsitesEcommerceProducts404
      | GetWebsitesEcommerceProducts500
    >
  > & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
