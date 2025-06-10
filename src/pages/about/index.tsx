import React from 'react'
import {
  FaHandshake,
  FaBullseye,
  FaEye,
  FaGem,
  FaCogs,
  FaEnvelope,
} from 'react-icons/fa'

const About: React.FC = () => {
  return (
    <div className="bg-gray-900 py-8">
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-red-500 drop-shadow">
        Sobre Nós
      </h1>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="relative rounded-xl border border-gray-700 bg-gray-800/80 p-5 shadow">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gray-700 p-2 shadow">
            <FaHandshake size={22} className="text-gray-200" />
          </div>
          <h2 className="mb-2 mt-4 text-center text-xl font-bold text-gray-100">
            Nossa Empresa
          </h2>
          <p className="text-center text-base text-gray-200">
            Bem-vindo à <span className="font-semibold">JR-PECAS</span>, sua
            fonte número um para todas as peças automotivas. Fundada por
            apaixonados pelo setor automóvel, a nossa empresa nasceu com o
            objetivo de simplificar o acesso a peças de qualidade, tanto para
            profissionais como para entusiastas. Trabalhamos diariamente para
            garantir que cada cliente encontre exatamente o que precisa, com
            atendimento personalizado e suporte técnico especializado.
          </p>
        </div>
        <div className="relative rounded-xl border border-gray-700 bg-gray-800/80 p-5 shadow">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gray-700 p-2 shadow">
            <FaBullseye size={22} className="text-gray-200" />
          </div>
          <h2 className="mb-2 mt-4 text-center text-xl font-bold text-gray-100">
            Missão
          </h2>
          <p className="text-center text-base text-gray-200">
            Oferecer peças automotivas de alta qualidade a preços competitivos,
            garantindo a satisfação total dos nossos clientes. A nossa missão é
            ser referência em confiança e eficiência, proporcionando uma
            experiência de compra simples, rápida e segura. Queremos que cada
            cliente sinta que pode contar connosco em todas as etapas, desde a
            escolha do produto até ao pós-venda.
          </p>
        </div>
        <div className="relative rounded-xl border border-gray-700 bg-gray-800/80 p-5 shadow">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gray-700 p-2 shadow">
            <FaEye size={22} className="text-gray-200" />
          </div>
          <h2 className="mb-2 mt-4 text-center text-xl font-bold text-gray-100">
            Visão
          </h2>
          <p className="text-center text-base text-gray-200">
            Ser referência internacional em peças automotivas, reconhecida pela
            excelência em qualidade e atendimento. Ambicionamos expandir a nossa
            presença para novos mercados, mantendo sempre o compromisso com a
            inovação e a sustentabilidade. Queremos ser lembrados como uma
            empresa que faz a diferença na vida dos nossos clientes e parceiros.
          </p>
        </div>
        <div className="relative rounded-xl border border-gray-700 bg-gray-800/80 p-5 shadow">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gray-700 p-2 shadow">
            <FaGem size={22} className="text-gray-200" />
          </div>
          <h2 className="mb-2 mt-4 text-center text-xl font-bold text-gray-100">
            Valores
          </h2>
          <ul className="list-inside list-disc space-y-0.5 text-base text-gray-200">
            <li>
              <span className="font-semibold">Qualidade:</span> Só trabalhamos
              com marcas e fornecedores reconhecidos, garantindo produtos
              duradouros e seguros.
            </li>
            <li>
              <span className="font-semibold">Integridade:</span> Atuamos com
              honestidade e transparência em todas as relações.
            </li>
            <li>
              <span className="font-semibold">Inovação:</span> Procuramos
              constantemente novas soluções para facilitar a vida dos nossos
              clientes.
            </li>
            <li>
              <span className="font-semibold">Compromisso:</span> Estamos sempre
              disponíveis para ajudar, antes, durante e após a compra.
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-gray-700 bg-gray-800/80 p-5 shadow">
        <div className="mb-2 flex items-center justify-center gap-2 text-gray-200">
          <FaCogs size={20} />
          <h2 className="text-lg font-bold text-gray-100">Nossos Produtos</h2>
        </div>
        <p className="text-center text-base text-gray-200">
          Trabalhamos com uma vasta gama de produtos: motores, transmissões,
          sistemas de freios, componentes elétricos, filtros, baterias,
          acessórios e muito mais. Todos os itens são cuidadosamente
          selecionados e testados para garantir o melhor desempenho e segurança
          para o seu veículo. Se não encontrar o que procura, entre em contacto
          — teremos todo o gosto em ajudar!
        </p>
      </div>

      <div className="rounded-xl border border-gray-700 bg-gray-800/80 p-5 shadow">
        <div className="mb-2 flex items-center justify-center gap-2 text-gray-200">
          <FaEnvelope size={20} />
          <h2 className="text-lg font-bold text-gray-100">Contato</h2>
        </div>
        <p className="text-center text-base text-gray-200">
          Tem dúvidas, sugestões ou precisa de um orçamento personalizado? Fale
          connosco! A nossa equipa está pronta para responder rapidamente e
          oferecer o melhor suporte possível.
        </p>
        <div className="flex justify-center">
          <a
            href="mailto:contato@jrpecas.com"
            className="mt-3 inline-block rounded bg-red-500 px-4 py-1.5 text-sm font-semibold text-white shadow transition hover:bg-red-600"
          >
            Enviar Email
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
