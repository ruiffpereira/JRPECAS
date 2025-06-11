import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { signIn, useSession } from 'next-auth/react'
import { getWebsitesEcommerceCarts } from '@/servers/ecommerce/hooks/useGetWebsitesEcommerceCarts'
import {
  Cart,
  GetWebsitesEcommerceCarts200,
  PostWebsitesEcommerceCartsMutationRequest,
  Product,
} from '@/servers/ecommerce'
import { postWebsitesEcommerceCarts } from '@/servers/ecommerce/hooks/usePostWebsitesEcommerceCarts'

interface ProductsContextProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  cart: Cart
  setCart: React.Dispatch<React.SetStateAction<Cart>>
  addToCart: (item: PostWebsitesEcommerceCartsMutationRequest) => Promise<void>
  searchProduct: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
)

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Cart>({
    cartId: '',
    customerId: '',
    products: [],
    shipPrice: 0,
  })
  const [searchProduct, setSearchProduct] = useState('')
  const { data: session } = useSession()

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (session?.user?.token) {
        const token = session.user.token
        if (token) {
          try {
            const getCartProducts: GetWebsitesEcommerceCarts200 =
              await getWebsitesEcommerceCarts({
                authorization: `Bearer ${token}`,
              })
            // Transforme os dados, se necessário
            const cartProducts: Cart = {
              cartId: getCartProducts.cartId,
              customerId: getCartProducts.customerId,
              products: getCartProducts.products,
              shipPrice: getCartProducts.shipPrice,
            }
            if (cartProducts && cartProducts.products) {
              setCart(cartProducts)
            } else {
              setCart({
                cartId: '',
                customerId: '',
                products: [],
                shipPrice: 0,
              }) // Valor padrão se a resposta não for válida
            }
          } catch (error) {
            console.error('Erro ao buscar produtos do carrinho:', error)
            setCart({
              cartId: '',
              customerId: '',
              products: [],
              shipPrice: 0,
            }) // Valor padrão em caso de erro
          }
        }
      }
    }
    fetchCartProducts()
  }, [session])

  const addToCart = useCallback(
    async (item: PostWebsitesEcommerceCartsMutationRequest) => {
      if (session) {
        const token = session.user.token
        if (token) {
          try {
            const response = await postWebsitesEcommerceCarts(
              {
                productId: item.productId,
                quantity: item.quantity,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            if (response && response.products) {
              setCart({
                cartId: response.cartId || '',
                customerId: response.customerId || '',
                products: response.products || [],
                shipPrice: response.shipPrice || 0,
              })
            } else {
              console.error('Failed to add product to cart')
            }
          } catch {
            // console.error('Error adding product to cart:', error)
          }
        }
      } else {
        await signIn('google', { redirect: false })
      }
    },
    [session, setCart],
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchProduct(e.target.value)
    },
    [],
  )

  const providerValue = useMemo(
    () => ({
      products,
      setProducts,
      cart,
      setCart,
      addToCart,
      searchProduct,
      handleSearchChange,
    }),
    [
      products,
      setProducts,
      cart,
      setCart,
      addToCart,
      searchProduct,
      handleSearchChange,
    ],
  )

  return (
    <ProductsContext.Provider value={providerValue}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = (): ProductsContextProps => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
