import React from 'react'
import { FiLock, FiInfo } from 'react-icons/fi'

const CookiesPolicy: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
        <FiLock size={28} className="text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-100">
          Política de Cookies
        </h1>
      </div>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiInfo className="text-gray-400" /> O que são cookies?
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Cookies são pequenos ficheiros de texto armazenados no seu dispositivo
          quando visita um website. Estes ficheiros permitem reconhecer o seu
          dispositivo e melhorar a sua experiência de navegação.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiInfo className="text-gray-400" /> Para que usamos cookies?
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Utilizamos cookies para:
          <ul className="ml-4 mt-2 list-disc">
            <li>Garantir o funcionamento correto do site</li>
            <li>Guardar preferências do utilizador</li>
            <li>Recolher estatísticas de navegação (ex: Google Analytics)</li>
            <li>Melhorar a experiência do utilizador</li>
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiLock className="text-gray-400" /> Gestão de cookies
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Pode gerir ou desativar cookies nas definições do seu navegador. No
          entanto, a desativação de cookies essenciais pode afetar o
          funcionamento do site.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiInfo className="text-gray-400" /> Consentimento
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Ao continuar a navegar no nosso site, está a consentir a utilização de
          cookies, exceto se os desativar nas definições do seu navegador.
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-gray-500">
        Última atualização: Junho 2025
      </p>
    </>
  )
}

export default CookiesPolicy
