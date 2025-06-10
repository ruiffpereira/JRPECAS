import React from 'react'
import { FiAlertCircle, FiShield } from 'react-icons/fi'

const RAL: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
        <FiShield size={28} className="text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-100">
          Resolução Alternativa de Litígios (RAL)
        </h1>
      </div>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiAlertCircle className="text-gray-400" /> O que é a RAL?
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          A Resolução Alternativa de Litígios (RAL) permite aos consumidores e
          empresas resolverem conflitos de consumo fora dos tribunais, de forma
          mais rápida, simples e económica. Em caso de litígio, o consumidor
          pode recorrer a uma entidade RAL para tentar chegar a uma solução
          amigável.
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiShield className="text-gray-400" /> Entidades RAL disponíveis
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          <ul className="ml-4 list-disc">
            <li>
              <strong>
                CNIACC – Centro Nacional de Informação e Arbitragem de Conflitos
                de Consumo
              </strong>
              <br />
              Faculdade de Direito da Universidade Nova de Lisboa
              <br />
              Campus de Campolide, 1099-032 Lisboa
              <br />
              <a
                href="https://www.cniacc.pt"
                className="text-red-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.cniacc.pt
              </a>
            </li>
            <li className="mt-3">
              <strong>Livro de Reclamações Eletrónico:</strong>{' '}
              <a
                href="https://www.livroreclamacoes.pt"
                className="text-red-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.livroreclamacoes.pt
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
          <FiAlertCircle className="text-gray-400" /> Mais informações
        </h2>
        <div className="rounded bg-gray-800/60 p-4 text-sm shadow">
          Para mais informações sobre entidades de resolução alternativa de
          litígios, consulte o Portal do Consumidor em{' '}
          <a
            href="https://www.consumidor.gov.pt"
            className="text-red-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.consumidor.gov.pt
          </a>
          .<br />
          Em caso de dúvida, contacte-nos através do email{' '}
          <a href="mailto:info@jrpecas.com" className="text-red-400 underline">
            info@jrpecas.com
          </a>
          .
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-gray-500">
        Última atualização: Junho 2025
      </p>
    </>
  )
}

export default RAL
