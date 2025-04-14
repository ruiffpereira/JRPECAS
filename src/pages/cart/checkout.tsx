import { useState } from 'react'
import { useRouter } from 'next/router'
import { getWebsitesCustomersAddresses } from '@/server/customers/hooks/useGetWebsitesCustomersAddresses'
import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { Address } from '@/server/customers'
import { LoginAndAddToCart } from '@/components/auth'
import AdressContainer from '@/components/adress/adressContainer'

const Checkout = ({ adress }: { adress: Address[] }) => {
  const router = useRouter()
  const [step, setStep] = useState(1) // Gerencia as etapas do checkout
  const { data: session, status } = useSession()

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Finalizar Encomenda</h1>
      {step === 1 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Confirme a Morada</h2>
          <AdressContainer adresss={adress} session={session}></AdressContainer>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Escolha o Método de Pagamento
          </h2>
          {/* Aqui você pode listar os métodos de pagamento disponíveis */}
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4 mr-2"
          >
            Voltar
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Resumo do Pedido</h2>
          {/* Aqui você pode mostrar um resumo do pedido */}
          <button
            onClick={() => router.push('/orders')}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  )
}

export default Checkout

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
    }
  }

  const adress = await getWebsitesCustomersAddresses({
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  })

  return {
    props: { adress },
  }
}
