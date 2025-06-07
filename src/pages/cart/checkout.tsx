import { getWebsitesCustomersAddresses } from '@/servers/customers/hooks/useGetWebsitesCustomersAddresses'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Checkout from '@/components/checkoutinner'
import type { Address } from '@/servers/customers/types/Address' // ajuste o caminho conforme o seu projeto
import { Session } from 'next-auth'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
)

type CheckoutPageProps = {
  address: Address[]
  sessionNext: Session
}

export default function CheckoutPage(props: CheckoutPageProps) {
  return (
    <Elements stripe={stripePromise}>
      <Checkout {...props} />
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

  return {
    props: { address, sessionNext: session },
  }
}
