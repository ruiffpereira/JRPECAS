import { LoginAndAddToCart } from '@/components/auth'
import { signOut, useSession, getSession } from 'next-auth/react'
import { Address } from '@/server/customers'
import { GetServerSidePropsContext } from 'next'
import { getWebsitesCustomersAddresses } from '@/server/customers/hooks/useGetWebsitesCustomersAddresses'
import AdressContainer from '@/components/adress/adressContainer'

const User = ({ adresss }: { adresss: Address[] }) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return 'Loading...'
  }

  if (!session) {
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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-5 items-center">
        <h1 className="text-3xl font-bold text-white">
          Olá, {session?.user?.name}
        </h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <AdressContainer adresss={adresss} session={session}></AdressContainer>
    </div>
  )
}

export default User

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
    }
  }

  const adresss = await getWebsitesCustomersAddresses({
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  })

  return {
    props: { adresss },
  }
}
