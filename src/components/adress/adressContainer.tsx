import { postWebsitesCustomersAddresses } from '@/server/customers/hooks/usePostWebsitesCustomersAddresses'
import { putWebsitesCustomersAddressesAddressid } from '@/server/customers/hooks/usePutWebsitesCustomersAddressesAddressid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Address } from '@/server/customers'

const addressSchema = z.object({
  address: z.string().min(5, 'Morada completa é obrigatória'),
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
    .max(9, 'NIF deve ter 9 dígitos'),
  addTaxpayer: z.boolean(),
})

const AdressContainer = ({
  adresss,
  session,
}: {
  adresss: Address[]
  session: { user: { token: string } }
}) => {
  const [successMessage, setSuccessMessage] = useState<boolean>(false) // Estado para a mensagem de sucesso

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: adresss?.[0] || {},
  })

  const onSubmit = async (data: Address) => {
    console.log('Data:', data)
    try {
      if (adresss?.[0]?.addressId) {
        const response = await putWebsitesCustomersAddressesAddressid(
          adresss[0].addressId,
          data,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.token}`, // Inclua o token de autenticação
            },
          },
        )
        console.log('Response:', response)
        if (!response) {
          setError('root', {
            type: 'server',
            message: 'Erro ao atualizar a morada. Tente novamente.',
          })
          // setSuccessMessage(false)
        } else {
          setSuccessMessage(true)
        }
      } else {
        const response = await postWebsitesCustomersAddresses(data, {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`, // Inclua o token de autenticação
          },
        })
        if (!response) {
          setError('root', {
            type: 'server',
            message: 'Erro ao salvar a morada. Tente novamente.',
          })
          // setSuccessMessage(false)
        } else {
          setSuccessMessage(true)
        }
      }
    } catch (error) {
      setError('root', {
        type: 'server',
        message: 'Erro ao salvar a morada. Tente novamente.',
      })
      return error
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<Address>)}
        className="mt-4 flex flex-col gap-4"
      >
        <div>
          <label htmlFor="postalCode" className="block font-bold">
            Morada Completa
          </label>
          <input
            id="street"
            type="text"
            placeholder="Morada Completa"
            {...register('address')}
            className="border border-gray-300 rounded p-2 w-full bg-transparent"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <div>
            <label htmlFor="postalCode" className="block font-bold">
              Cidade
            </label>
            <input
              id="city"
              type="text"
              placeholder="Cidade"
              {...register('city')}
              className="border border-gray-300 rounded p-2 w-full bg-transparent"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="block font-bold">
              Código Postal:
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="Código Postal"
              {...register('postalCode')}
              className="border border-gray-300 rounded p-2 w-full bg-transparent"
            />
            {errors.postalCode && (
              <p className="text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <label htmlFor="postalCode" className="block font-bold">
              Numero de Telemovel:
            </label>
            <input
              id="phoneNumber"
              type="text"
              placeholder="Telemovel"
              {...register('phoneNumber')}
              className="border border-gray-300 rounded p-2 w-full bg-transparent"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="block font-bold">
              NIF
            </label>
            <input
              id="nif"
              type="text"
              placeholder="NIF"
              {...register('nif')}
              className="border border-gray-300 rounded p-2 w-full bg-transparent"
            />
            {errors.nif && <p className="text-red-500">{errors.nif.message}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="addTaxpayer"
            type="checkbox"
            {...register('addTaxpayer')}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="addTaxpayer"
            className="text-sm font-medium text-gray-700"
          >
            Adicionar contribuinte à fatura
          </label>
        </div>
        <button
          type="submit"
          className={` ${successMessage ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit`}
        >
          {successMessage ? 'Guardado com sucesso!' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}

export default AdressContainer
