import {
  useGetWebsitesCustomersAddresses,
  getWebsitesCustomersAddressesQueryKey,
} from '@/servers/customers/hooks/useGetWebsitesCustomersAddresses'
import { usePutWebsitesCustomersAddressesAddressid } from '@/servers/customers/hooks/usePutWebsitesCustomersAddressesAddressid'
import { usePostWebsitesCustomersAddresses } from '@/servers/customers/hooks/usePostWebsitesCustomersAddresses'
import { useDeleteWebsitesCustomersAddressesAddressid } from '@/servers/customers/hooks/useDeleteWebsitesCustomersAddressesAddressid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Address } from '@/servers/customers'
import { getQueryClient } from '@/pages/_app'

const addressSchema = z.object({
  address: z.string().min(5, 'Morada completa é obrigatória'),
  defaultAdressFaturation: z.boolean().default(false).optional(),
  defaultAdress: z.boolean().default(false).optional(),
  postalCode: z
    .string()
    .regex(/^\d{4}-\d{3}$/, 'O código postal deve estar no formato 1234-567'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, ' Número de telemóvel inválido'),
  nif: z
    .string()
    .regex(
      /^\d{9}$/,
      'NIF deve ter exatamente 9 dígitos e conter apenas números',
    )
    .min(9, 'NIF deve ter 9 dígitos')
    .max(9, 'NIF deve ter 9 dígitos')
    .optional(),
  addTaxpayer: z.boolean().optional(),
})

const AdressContainer = ({
  adresss,
  onSelectAddress,
  onSelectAddressFaturarion,
  selectedId,
  selectedIdFatu,
  session,
}: {
  adresss: Address[]
  session: { user: { token: string } }
  onSelectAddress?: (addressId: string) => void
  onSelectAddressFaturarion?: (addressId: string) => void
  selectedId?: string | null
  selectedIdFatu?: string | null
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false) // Estado para controlar se o formulário de adição está visível

  const { data: addresses, isError } = useGetWebsitesCustomersAddresses({
    query: {
      initialData: adresss, // Passa os dados iniciais
    },
    client: {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`, // Passa o token de autenticação
      },
    },
  })
  const queryClient = getQueryClient()

  const {
    register: formEditingRegister,
    handleSubmit: handleFormEditingSubmit,
    reset: resetFormEditing,
    formState: { errors: editingErrors },
  } = useForm<Address>({
    resolver: zodResolver(addressSchema),
  })

  const {
    register: formNewRegister,
    handleSubmit: handleFormNewSubmit,
    formState: { isSubmitting: isAddingAddress, errors: errorsAddress },
    reset: resetNewAdress,
  } = useForm<Address>({
    resolver: zodResolver(addressSchema),
  })

  const { mutate: updateAddress } = usePutWebsitesCustomersAddressesAddressid({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getWebsitesCustomersAddressesQueryKey(),
        })
        setEditingIndex(null)
      },
      onError: (err) => {
        console.error('Erro ao atualizar a morada:', err)
      },
    },
    client: {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`, // Adiciona o token de sessão
      },
    },
  })

  const { mutate: newAdress, error } = usePostWebsitesCustomersAddresses({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getWebsitesCustomersAddressesQueryKey(),
        })
        setEditingIndex(null)
        resetNewAdress()
      },
      onError: (err) => {
        console.error('Erro ao atualizar a morada:', err)
      },
    },
    client: {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`, // Adiciona o token de sessão
      },
    },
  })

  const { mutate: deleteAddress } =
    useDeleteWebsitesCustomersAddressesAddressid({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getWebsitesCustomersAddressesQueryKey(),
          })
        },
        onError: (err) => {
          console.error('Erro ao apagar a morada:', err)
        },
      },
      client: {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`, // Adiciona o token de sessão
        },
      },
    })

  const onSubmit: SubmitHandler<Address> = (data) => {
    if (editingIndex !== null) {
      const addressId = addresses && addresses[editingIndex]?.addressId
      if (!addressId) {
        console.error('ID da morada não encontrado.')
        return
      }
      updateAddress({ addressId, data }) // Chama o hook para atualizar a morada
    } else {
      console.log('Adicionando nova morada:', data)
      newAdress({ data }) // Chama o hook para adicionar uma nova morada
    }
  }

  if (isError) {
    return <div>Error loading addresses</div>
  }

  return (
    <div className="flex flex-col gap-8">
      <button
        onClick={() => setIsAdding(!isAdding)} // Alterna o estado do formulário
        className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {isAdding ? 'Cancelar' : 'Adicionar Morada'}
      </button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isAdding && (
          <form
            onSubmit={handleFormNewSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-800 p-4 shadow-md"
          >
            {error && (
              <p className="text-red-500">
                Excedeu o numero de moradas permitidas
              </p>
            )}
            <div>
              <label htmlFor="address" className="block font-bold">
                Morada Completa
              </label>
              <input
                type="text"
                placeholder="Morada Completa"
                {...formNewRegister('address')}
                className="w-full rounded border border-gray-300 bg-transparent p-2"
              />
              {errorsAddress.address && (
                <p className="text-red-500">{errorsAddress.address.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <div>
                <label htmlFor="city" className="block font-bold">
                  Cidade
                </label>
                <input
                  type="text"
                  placeholder="Cidade"
                  {...formNewRegister('city')}
                  className="w-full rounded border border-gray-300 bg-transparent p-2"
                />
                {errorsAddress.city && (
                  <p className="text-red-500">{errorsAddress.city.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="postalCode" className="block font-bold">
                  Código Postal
                </label>
                <input
                  type="text"
                  placeholder="Código Postal"
                  {...formNewRegister('postalCode')}
                  className="w-full rounded border border-gray-300 bg-transparent p-2"
                />
                {errorsAddress.postalCode && (
                  <p className="text-red-500">
                    {errorsAddress.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <label htmlFor="phoneNumber" className="block font-bold">
                  Telemóvel
                </label>
                <input
                  type="text"
                  placeholder="Telemóvel"
                  {...formNewRegister('phoneNumber')}
                  className="w-full rounded border border-gray-300 bg-transparent p-2"
                />
                {errorsAddress.phoneNumber && (
                  <p className="text-red-500">
                    {errorsAddress.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="nif" className="block font-bold">
                  NIF
                </label>
                <input
                  type="text"
                  placeholder="NIF"
                  {...formNewRegister('nif')}
                  className="w-full rounded border border-gray-300 bg-transparent p-2"
                />
                {errorsAddress.nif && (
                  <p className="text-red-500">{errorsAddress.nif.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="addTaxpayer"
                type="checkbox"
                {...formNewRegister('addTaxpayer')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="addTaxpayer"
                className="text-sm font-medium text-gray-700"
              >
                Adicionar contribuinte à fatura
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="defaultAdress"
                type="checkbox"
                {...formNewRegister('defaultAdress')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="defaultAdress"
                className="text-sm font-medium text-gray-700"
              >
                Definir Morada de Envio Como Padrão
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="defaultAdressFaturation"
                type="checkbox"
                {...formNewRegister('defaultAdressFaturation')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="defaultAdressFaturation"
                className="text-sm font-medium text-gray-700"
              >
                Definir Morada de Envio Como Faturação
              </label>
            </div>

            <button
              type="submit"
              disabled={isAddingAddress} // Desativa o botão enquanto a mutação está em andamento
              className={`rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                isAddingAddress ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {isAddingAddress ? 'Adicionando...' : 'Adicionar'}
            </button>
          </form>
        )}
        {addresses && addresses.length > 0
          ? addresses.map((address, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-gray-800 p-4 shadow-md"
              >
                {editingIndex === index ? (
                  // Modo de edição
                  <form
                    onSubmit={handleFormEditingSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label
                        htmlFor={`address-${index}`}
                        className="block font-bold"
                      >
                        Morada Completa
                      </label>
                      <input
                        id={`address-${index}`}
                        type="text"
                        defaultValue={address.address}
                        {...formEditingRegister('address')}
                        className="w-full rounded border border-gray-300 bg-transparent p-2"
                      />
                      {editingErrors.city && (
                        <p className="text-red-500">
                          {editingErrors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div>
                        <label
                          htmlFor={`city-${index}`}
                          className="block font-bold"
                        >
                          Cidade
                        </label>
                        <input
                          id={`city-${index}`}
                          type="text"
                          defaultValue={address.city}
                          {...formEditingRegister('city')}
                          className="w-full rounded border border-gray-300 bg-transparent p-2"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`postalCode-${index}`}
                          className="block font-bold"
                        >
                          Código Postal
                        </label>
                        <input
                          id={`postalCode-${index}`}
                          type="text"
                          defaultValue={address.postalCode}
                          {...formEditingRegister('postalCode')}
                          className="w-full rounded border border-gray-300 bg-transparent p-2"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div>
                        <label
                          htmlFor={`phoneNumber-${index}`}
                          className="block font-bold"
                        >
                          Telemóvel
                        </label>
                        <input
                          id={`phoneNumber-${index}`}
                          type="text"
                          defaultValue={address.phoneNumber}
                          {...formEditingRegister('phoneNumber')}
                          className="w-full rounded border border-gray-300 bg-transparent p-2"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`nif-${index}`}
                          className="block font-bold"
                        >
                          NIF
                        </label>
                        <input
                          id={`nif-${index}`}
                          type="text"
                          defaultValue={address.nif}
                          {...formEditingRegister('nif')}
                          className="w-full rounded border border-gray-300 bg-transparent p-2"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          id="addTaxpayer"
                          type="checkbox"
                          defaultChecked={address.addTaxpayer}
                          {...formEditingRegister('addTaxpayer')}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="addTaxpayer"
                          className="text-sm font-medium text-gray-700"
                        >
                          Adicionar contribuinte à fatura
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id="defaultAdress"
                          type="checkbox"
                          defaultChecked={address.defaultAdress}
                          {...formEditingRegister('defaultAdress')}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="defaultAdress"
                          className="text-sm font-medium text-gray-700"
                        >
                          Definir Morada de Envio Como Padrão
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id="addTaxpayer"
                          type="checkbox"
                          defaultChecked={address.defaultAdressFaturation}
                          {...formEditingRegister('defaultAdressFaturation')}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="defaultAdressFaturation"
                          className="text-sm font-medium text-gray-700"
                        >
                          Definir Morada de Envio Como Faturacao
                        </label>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="submit"
                        className={`rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600`}
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingIndex(null)}
                        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  // Modo normal
                  <div className="flex h-full flex-col gap-1">
                    {onSelectAddress && (
                      <input
                        type="radio"
                        name="addressEnvio"
                        checked={selectedId === address.addressId}
                        onChange={() =>
                          onSelectAddress?.(address.addressId ?? '')
                        }
                      />
                    )}

                    {onSelectAddressFaturarion && (
                      <input
                        type="radio"
                        name="addressFaturation"
                        checked={selectedIdFatu === address.addressId}
                        onChange={() =>
                          onSelectAddressFaturarion?.(address.addressId ?? '')
                        }
                      />
                    )}

                    <h3 className="mb-2 text-xl font-bold">
                      {address.address}
                    </h3>
                    <p className="text-slate-200">
                      <strong>Cidade:</strong> {address.city}
                    </p>
                    <p className="text-slate-200">
                      <strong>Código Postal:</strong> {address.postalCode}
                    </p>
                    <p className="text-slate-200">
                      <strong>Telemóvel:</strong> {address.phoneNumber}
                    </p>
                    {address.nif && (
                      <p className="text-slate-200">
                        <strong>NIF:</strong> {address.nif}
                      </p>
                    )}
                    {address.addTaxpayer && (
                      <p className="text-slate-200">
                        <strong>Contribuinte na Fatura</strong>
                      </p>
                    )}
                    {address.defaultAdress && (
                      <p className="text-slate-200">
                        <strong>Morada predefinida</strong>
                      </p>
                    )}
                    {address.defaultAdressFaturation && (
                      <p className="text-slate-200">
                        <strong>Morada de Faturacao Predefinida</strong>
                      </p>
                    )}
                    <div className="mt-auto flex gap-2">
                      <button
                        onClick={() => {
                          resetFormEditing(address)
                          setEditingIndex(index)
                          setIsAdding(false)
                        }}
                        className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (address.addressId) {
                            deleteAddress({ addressId: address.addressId })
                          } else {
                            console.error('Address ID is undefined.')
                          }
                        }}
                        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        Apagar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default AdressContainer
