import React, { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import ProductGrid from '@/components/products/productGrid'
import Head from 'next/head'
import { getWebsitesEcommerceProducts } from '@/server/ecommerce/hooks/useGetWebsitesEcommerceProducts'
import { GetWebsitesEcommerceProductsQueryResponse } from '@/server/ecommerce/types/GetWebsitesEcommerceProducts'

interface HomeProps {
  products: GetWebsitesEcommerceProductsQueryResponse
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <Fragment>
      <Head>
        <title>Complete Comercio de Peças Usadas</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <ProductGrid products={products} />
    </Fragment>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const token = process.env.NEXT_PUBLIC_TOKEN

  if (!token) {
    return {
      props: {
        products: [],
      },
    }
  }

  try {
    const products = await getWebsitesEcommerceProducts({
      authorization: `Bearer ${token}`,
    })

    if (products && Array.isArray(products) && products.length > 0) {
      return {
        props: { products },
      }
    } else {
      console.warn('Nenhum produto encontrado.')
      return {
        props: { products: [] },
      }
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return {
      props: { products: [] },
    }
  }
}
