import React, { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import ProductGrid from '@/components/products/productGrid'
import { Product } from '@/types/types'
import { getAllProducts } from './api/products'
import Head from 'next/head'

interface HomeProps {
  products: Product[]
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
  const token = process.env.WEBSITE_KEY

  if (!token) {
    return {
      props: {
        products: [],
      },
    }
  }

  const getProducts = await getAllProducts(token)

  if (getProducts && getProducts.ok) {
    const products = await getProducts.json()
    return {
      props: { products },
    }
  } else {
    return {
      props: { products: [] },
    }
  }
}
