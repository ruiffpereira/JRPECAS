import Link from 'next/link'
import React from 'react'
import {
  FiFileText,
  FiCheckCircle,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiAlertCircle,
} from 'react-icons/fi'

export default function TermosCondicoes() {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
        <FiFileText size={28} className="text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-100">
          Termos &amp; Condições
        </h1>
      </div>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiCheckCircle className="text-gray-400" /> 1. Identificação
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm text-gray-100 shadow">
          <strong>JR-PECASCOMPLETE</strong>
          <br />
          NIF: 123456789
          <br />
          Rua das Peças, 123, 1000-000 Lisboa, Portugal
          <br />
          Email:{' '}
          <a href="mailto:info@jrpecas.com" className="text-red-400 underline">
            info@jrpecas.com
          </a>{' '}
          | Tel:{' '}
          <a href="tel:+351912345678" className="text-red-400 underline">
            +351 912 345 678
          </a>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiCheckCircle className="text-gray-400" /> 2. Produtos e Preços
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm text-gray-100 shadow">
          Todos os preços incluem IVA à taxa legal em vigor. As descrições dos
          produtos são as mais precisas possíveis. Reservamo-nos o direito de
          corrigir erros ou omissões.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiCheckCircle className="text-gray-400" /> 3. Encomendas e Pagamento
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm text-gray-100 shadow">
          O cliente pode encomendar online, escolhendo os produtos e seguindo o
          processo de checkout. Aceitamos pagamentos por cartão, MB WAY e
          transferência bancária.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiTruck className="text-gray-400" /> 4. Entregas
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm text-gray-100 shadow">
          As encomendas são enviadas para todo o país, normalmente em 1-3 dias
          úteis. O custo de envio é apresentado no checkout.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiRefreshCw className="text-gray-400" /> 5. Devoluções e Reembolsos
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm text-gray-100 shadow">
          O cliente tem direito a devolver os produtos no prazo de 14 dias após
          a receção, sem necessidade de justificação. Para mais informações,
          contacte-nos.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiShield className="text-gray-400" /> 6. Garantias
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm text-gray-100 shadow">
          Todos os produtos têm garantia legal de 3 anos, salvo indicação em
          contrário.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiAlertCircle className="text-gray-400" /> 7. Resolução de Litígios
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm text-gray-100 shadow">
          Em caso de litígio, o consumidor pode recorrer à entidade de Resolução
          Alternativa de Litígios (RAL). Consulte a nossa página de{' '}
          <Link href="/ral" className="text-red-400 underline">
            RAL
          </Link>
          .
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-gray-500">
        Última atualização: Junho 2025
      </p>
    </>
  )
}
