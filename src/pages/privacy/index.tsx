import React from 'react'
import { FiShield, FiUser, FiMail, FiLock } from 'react-icons/fi'

const Privacidade: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
        <FiShield size={28} className="text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-100">
          Política de Privacidade
        </h1>
      </div>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiUser className="text-gray-400" /> 1. Responsável pelo Tratamento
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          <strong>JR-PECASCOMPLETE</strong> é responsável pelo tratamento dos
          seus dados pessoais.
          <br />
          NIF: 123456789
          <br />
          Email:{' '}
          <a href="mailto:info@jrpecas.com" className="text-red-400 underline">
            info@jrpecas.com
          </a>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiMail className="text-gray-400" /> 2. Dados Recolhidos
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Recolhemos apenas os dados necessários para processar encomendas,
          prestar apoio ao cliente e melhorar o nosso serviço, nomeadamente:
          <ul className="ml-4 mt-2 list-disc">
            <li>Nome</li>
            <li>Email</li>
            <li>Morada de entrega e faturação</li>
            <li>Contacto telefónico</li>
            <li>Histórico de encomendas</li>
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiLock className="text-gray-400" /> 3. Finalidade e Utilização dos
          Dados
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Os dados são utilizados para:
          <ul className="ml-4 mt-2 list-disc">
            <li>Processar e entregar encomendas</li>
            <li>Comunicações relacionadas com a sua compra</li>
            <li>Responder a pedidos de apoio ao cliente</li>
            <li>Cumprir obrigações legais e fiscais</li>
            <li>Se autorizado, envio de informações promocionais</li>
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiLock className="text-gray-400" /> 4. Partilha de Dados
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Não partilhamos os seus dados com terceiros, exceto quando necessário
          para:
          <ul className="ml-4 mt-2 list-disc">
            <li>Processamento de pagamentos</li>
            <li>Expedição de encomendas (transportadoras)</li>
            <li>Cumprimento de obrigações legais</li>
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiUser className="text-gray-400" /> 5. Direitos do Utilizador
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Tem o direito de aceder, corrigir, eliminar ou limitar o tratamento
          dos seus dados pessoais. Para exercer estes direitos, contacte-nos por
          email.
          <br />
          Tem ainda o direito de apresentar reclamação à autoridade de controlo
          (CNPD).
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiLock className="text-gray-400" /> 6. Segurança
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Adotamos medidas técnicas e organizativas adequadas para proteger os
          seus dados pessoais contra perda, acesso não autorizado ou uso
          indevido.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiLock className="text-gray-400" /> 7. Cookies
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Utilizamos cookies para melhorar a sua experiência de navegação. Pode
          gerir as preferências de cookies no seu navegador. Para mais detalhes,
          consulte a nossa{' '}
          <a href="/cookies" className="text-red-400 underline">
            Política de Cookies
          </a>
          .
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiShield className="text-gray-400" /> 8. Alterações à Política de
          Privacidade
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Reservamo-nos o direito de atualizar esta política a qualquer momento.
          Recomendamos que consulte esta página regularmente.
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-gray-500">
        Última atualização: Junho 2025
      </p>
    </>
  )
}

export default Privacidade
