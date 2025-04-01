/**
 * @description Customer logged in or created successfully
 */
export type PostWebsitesCustomersLogin200 = {
  /**
   * @description ID of the customer
   * @type string | undefined
   */
  customerId?: string;
  /**
   * @description Name of the customer
   * @type string | undefined
   */
  name?: string;
  /**
   * @description Contact information of the customer
   * @type string | undefined
   */
  contact?: string;
  /**
   * @description Email of the customer
   * @type string | undefined
   */
  email?: string;
  /**
   * @description Profile image of the customer
   * @type string | undefined
   */
  photo?: string;
  /**
   * @description JWT token for the customer
   * @type string | undefined
   */
  token?: string;
};

/**
 * @description Validation error or missing fields
 */
export type PostWebsitesCustomersLogin400 = {
  /**
   * @type array | undefined
   */
  error?: {
    /**
     * @description Field that caused the error
     * @type string | undefined
     */
    path?: string;
    /**
     * @description Error message
     * @type string | undefined
     */
    message?: string;
  }[];
};

/**
 * @description User or email not found
 */
export type PostWebsitesCustomersLogin404 = {
  /**
   * @type string | undefined
   */
  error?: string;
};

/**
 * @description Internal server error
 */
export type PostWebsitesCustomersLogin500 = {
  /**
   * @type string | undefined
   */
  error?: string;
};

export type PostWebsitesCustomersLoginMutationRequest = {
  /**
   * @description Google ID Token for authentication
   * @type string
   */
  idToken: string;
};

export type PostWebsitesCustomersLoginMutationResponse =
  PostWebsitesCustomersLogin200;

export type PostWebsitesCustomersLoginMutation = {
  Response: PostWebsitesCustomersLogin200;
  Request: PostWebsitesCustomersLoginMutationRequest;
  Errors:
    | PostWebsitesCustomersLogin400
    | PostWebsitesCustomersLogin404
    | PostWebsitesCustomersLogin500;
};
