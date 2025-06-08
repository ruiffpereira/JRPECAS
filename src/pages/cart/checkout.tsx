import { getWebsitesCustomersAddresses } from '@/servers/customers/hooks/useGetWebsitesCustomersAddresses'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Checkout from '@/components/checkoutinner'
import type { Address } from '@/servers/customers/types/Address'
import { Session } from 'next-auth'
import routes from '@/routes'
import Link from 'next/link'
import { postWebsitesEcommerceOrdersPaymentIntent } from '@/servers/ecommerce'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
)

type CheckoutPageProps = {
  sessionNext: Session
  address: Address[]
  paymentIntent?: {
    clientSecret?: string
  }
}

export default function CheckoutPage({
  address,
  sessionNext,
  paymentIntent,
  ...props
}: CheckoutPageProps) {
  if (!sessionNext) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold">Minhas Encomendas</h1>
        <Link href={routes.user} className="text-blue-500 hover:underline">
          Faça login para continuar
        </Link>
      </div>
    )
  }

  // Garante que só renderiza o Elements se houver clientSecret
  if (!paymentIntent?.clientSecret) {
    return <div>Carregando pagamento...</div>
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentIntent.clientSecret }}
    >
      <Checkout address={address} sessionNext={sessionNext} {...props} />
    </Elements>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
    }
  }

  const address = await getWebsitesCustomersAddresses({
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  })

  let paymentIntent = null
  try {
    paymentIntent = await postWebsitesEcommerceOrdersPaymentIntent(
      {
        customerId: session.user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    )
  } catch (error) {
    console.error('Erro ao processar o pagamento:', error)
  }

  return {
    props: { paymentIntent, address, sessionNext: session },
  }
}
