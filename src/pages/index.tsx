import React, { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import ProductGrid from '@/components/products/productGrid'
import { getAllProducts, getCartProducts } from './api/products'
import { Cart, Product } from '@/types/types'
import { getSession } from 'next-auth/react'
import { useProducts } from '@/context/ProductsContext'

interface HomeProps {
  products: Product[]
  cartProducts: Cart[]
}

const Home: React.FC<HomeProps> = ({ products, cartProducts }) => {
  const { setCart } = useProducts()

  if (cartProducts && cartProducts.length > 0) {
    setCart(cartProducts)
  }

  return (
    <Fragment>
      <ProductGrid products={products} />
    </Fragment>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = process.env.WEBSITE_KEY
  const session = await getSession(context)

  if (!token) {
    return {
      props: {
        products: [],
      },
    }
  }

  const products = await getAllProducts(token)

  if (!session) {
    return {
      props: { products },
    }
  }

  const cartProducts = await getCartProducts(session.user.token)

  return {
    props: { products, cartProducts },
  }
}
