import React, { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import ProductGrid from '@/components/products/productGrid'
import { getAllProducts } from './api/products'
import { Product } from '@/types/types'

interface HomeProps {
  products: Product[]
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <Fragment>
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

  const products = await getAllProducts(token)
  // console.log('products1: ', products)
  return {
    props: { products },
  }
}
