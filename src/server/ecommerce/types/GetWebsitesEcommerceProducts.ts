import type { Product } from "./Product.js";

export type GetWebsitesEcommerceProductsHeaderParams = {
  /**
   * @description Secret key for the website
   * @type string
   */
  authorization: string;
};

/**
 * @description List of products for the website
 */
export type GetWebsitesEcommerceProducts200 = Product[];

/**
 * @description Secret key is required
 */
export type GetWebsitesEcommerceProducts400 = any;

/**
 * @description User not found for the given secret key
 */
export type GetWebsitesEcommerceProducts404 = any;

/**
 * @description Error fetching products
 */
export type GetWebsitesEcommerceProducts500 = any;

export type GetWebsitesEcommerceProductsQueryResponse =
  GetWebsitesEcommerceProducts200;

export type GetWebsitesEcommerceProductsQuery = {
  Response: GetWebsitesEcommerceProducts200;
  HeaderParams: GetWebsitesEcommerceProductsHeaderParams;
  Errors:
    | GetWebsitesEcommerceProducts400
    | GetWebsitesEcommerceProducts404
    | GetWebsitesEcommerceProducts500;
};
