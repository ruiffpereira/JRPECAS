import client from "@kubb/plugin-client/clients/axios";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import type { UseMutationOptions } from "@tanstack/react-query";
import type {
  PostWebsitesCustomersLoginMutationRequest,
  PostWebsitesCustomersLoginMutationResponse,
  PostWebsitesCustomersLogin400,
  PostWebsitesCustomersLogin404,
  PostWebsitesCustomersLogin500,
} from "../types/PostWebsitesCustomersLogin.js";
import { useMutation } from "@tanstack/react-query";

export const postWebsitesCustomersLoginMutationKey = () =>
  [{ url: "/websites/customers/login" }] as const;

export type PostWebsitesCustomersLoginMutationKey = ReturnType<
  typeof postWebsitesCustomersLoginMutationKey
>;

/**
 * @summary Log in or create a customer
 * {@link /websites/customers/login}
 */
export async function postWebsitesCustomersLogin(
  data: PostWebsitesCustomersLoginMutationRequest,
  config: Partial<RequestConfig<PostWebsitesCustomersLoginMutationRequest>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    PostWebsitesCustomersLoginMutationResponse,
    ResponseErrorConfig<
      | PostWebsitesCustomersLogin400
      | PostWebsitesCustomersLogin404
      | PostWebsitesCustomersLogin500
    >,
    PostWebsitesCustomersLoginMutationRequest
  >({
    method: "POST",
    url: `/websites/customers/login`,
    baseURL: "http://localhost:2001/api",
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @summary Log in or create a customer
 * {@link /websites/customers/login}
 */
export function usePostWebsitesCustomersLogin<TContext>(
  options: {
    mutation?: UseMutationOptions<
      PostWebsitesCustomersLoginMutationResponse,
      ResponseErrorConfig<
        | PostWebsitesCustomersLogin400
        | PostWebsitesCustomersLogin404
        | PostWebsitesCustomersLogin500
      >,
      { data: PostWebsitesCustomersLoginMutationRequest },
      TContext
    >;
    client?: Partial<
      RequestConfig<PostWebsitesCustomersLoginMutationRequest>
    > & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? postWebsitesCustomersLoginMutationKey();

  return useMutation<
    PostWebsitesCustomersLoginMutationResponse,
    ResponseErrorConfig<
      | PostWebsitesCustomersLogin400
      | PostWebsitesCustomersLogin404
      | PostWebsitesCustomersLogin500
    >,
    { data: PostWebsitesCustomersLoginMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return postWebsitesCustomersLogin(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
