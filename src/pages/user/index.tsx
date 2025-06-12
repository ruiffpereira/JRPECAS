import { signOut, getSession } from 'next-auth/react'
import { Address } from '@/servers/customers'
import { GetServerSidePropsContext } from 'next'
import { getWebsitesCustomersAddresses } from '@/servers/customers/hooks/useGetWebsitesCustomersAddresses'
import AdressContainer from '@/components/adress/adressContainer'
import Link from 'next/link'
import routes from '@/routes'
import { Session } from 'next-auth'

const User = ({
  adresss,
  sessionNext,
}: {
  adresss: Address[]
  sessionNext: Session
}) => {
  if (!sessionNext) {
    return (
      <div>
        <Link href={routes.login}>Login</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">
        Olá, {sessionNext?.user?.name}
      </h1>
      <div className="flex items-center gap-5">
        <Link
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          href={routes.orders}
        >
          As minhas Encomendas
        </Link>
        <button
          onClick={() => signOut()}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <AdressContainer
        adresss={adresss}
        session={sessionNext}
      ></AdressContainer>
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
    props: { adresss, sessionNext: session },
  }
}
