import { LoginAndAddToCart } from '@/components/auth'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useGetWebsitesCustomersAddresses } from '@/server/customers/hooks/useGetWebsitesCustomersAddresses'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Address } from '@/server/customers'
import { useState } from 'react'

const addressSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  city: z.string().min(1, 'City is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  nif: z.string().min(9, 'NIF must be at least 9 digits'),
  addTaxpayer: z.boolean(),
  customerId: z.string().uuid('Invalid customer ID'),
})

const User = () => {
  const { data: session, status } = useSession()
  const [expandedAddress, setExpandedAddress] = useState<number | null>(null) // Estado para controlar a expansão

  const {
    data: addresses,
    isLoading,
    error,
  } = useGetWebsitesCustomersAddresses({
    client: {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`, // Envia o token de acesso
      },
    },
    query: {
      enabled: !!session?.user?.token, // Executa apenas se o token existir
    },
  })

  if (status === 'loading') {
    return 'Loading...'
  }

  // // Verifica se a sessão está carregando
  // if (status === 'loading') {
  //   return <div>Loading session...</div>
  // }

  // if (status) return <div>Loading..1.</div>

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

  if (error)
    return (
      <div>
        Não foi possível carregar os endereços. Tente novamente mais tarde.
      </div>
    )
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center space-x-4">
        {session.user?.image && (
          <Image
            src={session.user?.image}
            alt={session.user?.name || 'No name provided'}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div className="text-white">
          <p>{session.user?.name || 'No name provided'}</p>
          <p>{session.user?.email || 'No email provided'}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="text-2xl font-bold mb-2">Moradas</div>
      <div
        className="border border-gray-300 rounded p-4 cursor-pointer bg-gray-100 text-black hover:bg-gray-200"
        onClick={() => setExpandedAddress(expandedAddress === 0 ? null : 1)} // Alterna a expansão
      >
        <p className="font-bold">Criar </p>
        {expandedAddress === 1 && ( // Mostra os detalhes se estiver expandido
          <div className="mt-4 text-black">
            <p>Rua:</p>
            <p>Cidade:</p>
            <p>Código Postal:</p>
            <p>Telefone:</p>
            <p>NIF: </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {addresses?.map((address, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
            onClick={() =>
              setExpandedAddress(expandedAddress === index ? null : index)
            } // Alterna a expansão
          >
            <p className="font-bold">{address.street}</p>
            {expandedAddress === index && ( // Mostra os detalhes se estiver expandido
              <div className="mt-4">
                <p>Rua: {address.street}</p>
                <p>Cidade: {address.city}</p>
                <p>Código Postal: {address.postalCode}</p>
                <p>Telefone: {address.phoneNumber}</p>
                <p>NIF: {address.nif}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default User
