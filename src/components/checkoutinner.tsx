import { useProducts } from '@/context/ProductsContext'
import routes from '@/routes'
import { getWebsitesEcommerceOrdersQueryKey } from '@/servers/ecommerce'
import { useElements, PaymentElement, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AdressContainer from './adress/adressContainer'
import { LoginAndAddToCart } from './auth'
import { Address } from '@/servers/customers/types/Address'

type SessionWithUser = {
  user: {
    token: string
    name: string
    email: string
  }
}

const Checkout = ({
  address,
  sessionNext,
}: {
  address: Address[]
  sessionNext: SessionWithUser
}) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [pendingOrder, setPedingOrder] = useState(false)

  const [step, setStep] = useState(1) // Gerencia as etapas do checkout
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    address.find((a) => a.defaultAdress)?.addressId ?? null,
  )
  const [selectedAddressIdFaturarion, setSelectedAddressIdFaturarion] =
    useState<string | null>(
      address.find((a) => a.defaultAdressFaturation)?.addressId ?? null,
    )
  const { cart, setCart } = useProducts()
  const stripe = useStripe()

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const elements = useElements()

  if (!sessionNext) {
    return (
      <div>
        <button
          onClick={(event) => {
            LoginAndAddToCart(event)
          }}
        >
          Login
        </button>
      </div>
    )
  }

  async function handleCheckout() {
    setPedingOrder(true)
    if (!selectedAddressId || !selectedAddressIdFaturarion) {
      alert('Por favor, selecione as moradas de envio e faturação.')
      return
    }

    if (!stripe || !elements) {
      alert('Stripe não carregado.')
      return
    }

    // Confirma o pagamento com Stripe
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/orders?result=success',
      },
      redirect: 'if_required',
    })

    if (result.error) {
      setPedingOrder(false)
      alert('Erro no pagamento: ' + result.error.message)
      return
    }

    setPedingOrder(false)
    setCart({ products: [], shipPrice: 0, cartId: '', customerId: '' })
    queryClient.invalidateQueries({
      queryKey: getWebsitesEcommerceOrdersQueryKey(),
    })
    router.push(routes.orders)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Finalizar Encomenda</h1>
      {step === 1 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-500">
            Escolha a Morada de Envio
          </h2>
          <AdressContainer
            onSelectAddress={setSelectedAddressId}
            selectedId={selectedAddressId}
            adresss={address}
            session={sessionNext}
          ></AdressContainer>
          <button
            onClick={() => {
              if (selectedAddressId) {
                nextStep()
              } else {
                alert('Por favor, selecione uma morada.')
              }
            }}
            className="ml-auto rounded bg-blue-500 px-4 py-2 text-white"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-orange-500">
            Escolha a Morada de Faturacao
          </h2>
          <AdressContainer
            onSelectAddressFaturarion={setSelectedAddressIdFaturarion}
            selectedIdFatu={selectedAddressIdFaturarion}
            adresss={address}
            session={sessionNext}
          ></AdressContainer>
          <div className="ml-auto flex gap-2">
            <button
              onClick={prevStep}
              className="ml-auto rounded bg-blue-500 px-4 py-2 text-white"
            >
              Retroceder
            </button>
            <button
              onClick={() => {
                if (selectedAddressIdFaturarion) {
                  nextStep()
                } else {
                  alert('Por favor, selecione uma morada.')
                }
              }}
              className="ml-auto rounded bg-blue-500 px-4 py-2 text-white"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-2">
          <h2 className="mb-2 text-xl">
            Resumo do Pedido -{' '}
            <span className="text-2xl font-bold">{cart.shipPrice}€</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {cart.products.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl bg-gray-800 p-4 shadow-lg transition-transform hover:scale-105"
              >
                <div className="relative mb-4 h-32 w-32"></div>
                <h3 className="mb-2 text-center text-lg font-bold text-white">
                  {item.name}
                </h3>
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-xl font-semibold text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="mb-2 text-lg text-gray-300">
                  Preço:{' '}
                  <span className="font-bold text-white">{item.price}€</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4 flex gap-4">
            <PaymentElement className="rounded bg-white p-2" />
          </div>
          <div className="ml-auto flex gap-4">
            <button
              onClick={prevStep}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Retroceder
            </button>
            <button
              onClick={handleCheckout}
              className={`mt-4 rounded bg-green-500 px-4 py-2 text-white ${
                pendingOrder ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
