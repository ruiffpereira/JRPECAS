import client from "@kubb/plugin-client/clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  PostWebsitesEcommerceCartsMutationRequest,
  PostWebsitesEcommerceCartsMutationResponse,
  PostWebsitesEcommerceCarts400,
  PostWebsitesEcommerceCarts500,
} from "../types/PostWebsitesEcommerceCarts.js";
import { useMutation } from "@tanstack/react-query";

export const postWebsitesEcommerceCartsMutationKey = () =>
  [{ url: "/websites/ecommerce/carts" }] as const;

export type PostWebsitesEcommerceCartsMutationKey = ReturnType<
  typeof postWebsitesEcommerceCartsMutationKey
>;

/**
 * @summary Add a product to the cart
 * {@link /websites/ecommerce/carts}
 */
export async function postWebsitesEcommerceCarts(
  data: PostWebsitesEcommerceCartsMutationRequest,
  config: Partial<RequestConfig<PostWebsitesEcommerceCartsMutationRequest>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    PostWebsitesEcommerceCartsMutationResponse,
    ResponseErrorConfig<
      PostWebsitesEcommerceCarts400 | PostWebsitesEcommerceCarts500
    >,
    PostWebsitesEcommerceCartsMutationRequest
  >({
    method: "POST",
    url: `/websites/ecommerce/carts`,
    baseURL: "http://localhost:2001/api",
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @summary Add a product to the cart
 * {@link /websites/ecommerce/carts}
 */
export function usePostWebsitesEcommerceCarts<TContext>(
  options: {
    mutation?: UseMutationOptions<
      PostWebsitesEcommerceCartsMutationResponse,
      ResponseErrorConfig<
        PostWebsitesEcommerceCarts400 | PostWebsitesEcommerceCarts500
      >,
      { data: PostWebsitesEcommerceCartsMutationRequest },
      TContext
    >;
    client?: Partial<
      RequestConfig<PostWebsitesEcommerceCartsMutationRequest>
    > & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? postWebsitesEcommerceCartsMutationKey();

  return useMutation<
    PostWebsitesEcommerceCartsMutationResponse,
    ResponseErrorConfig<
      PostWebsitesEcommerceCarts400 | PostWebsitesEcommerceCarts500
    >,
    { data: PostWebsitesEcommerceCartsMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return postWebsitesEcommerceCarts(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
