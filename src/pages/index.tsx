import React, { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import ProductGrid from '@/components/products/productGrid'
import { Product } from '@/types/types'
import { getAllProducts } from './api/products'

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

  return {
    props: { products },
  }
}
