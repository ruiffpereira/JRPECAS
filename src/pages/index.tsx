import React, { Fragment } from "react";
import { GetServerSideProps } from "next";
import ProductGrid from "@/components/products/productGrid";
import { getWebsitesEcommerceProducts } from "@/servers/ecommerce/hooks/useGetWebsitesEcommerceProducts";
import { GetWebsitesEcommerceProductsQueryResponse } from "@/servers/ecommerce/types/GetWebsitesEcommerceProducts";

interface HomeProps {
  products: GetWebsitesEcommerceProductsQueryResponse;
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <Fragment>
      <ProductGrid products={products} />
    </Fragment>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const token = process.env.NEXT_PUBLIC_TOKEN;

  if (!token) {
    return {
      props: {
        products: [],
      },
    };
  }

  try {
    const products = await getWebsitesEcommerceProducts({
      authorization: `Bearer ${token}`,
    });

    if (products && Array.isArray(products) && products.length > 0) {
      return {
        props: { products },
      };
    } else {
      console.warn("Nenhum produto encontrado.");
      return {
        props: { products: [] },
      };
    }
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      props: { products: [] },
    };
  }
};
