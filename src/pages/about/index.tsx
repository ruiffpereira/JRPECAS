import React from 'react'

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Sobre Nós</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Nossa Empresa</h2>
        <p className="text-lg">
          Bem-vindo à JR-PECAS, sua fonte número um para todas as peças
          automotivas. Estamos dedicados a fornecer a você o melhor em peças de
          automóveis, com foco em qualidade, atendimento ao cliente e
          exclusividade.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Missão</h2>
        <p className="text-lg">
          Nossa missão é oferecer peças automotivas de alta qualidade a preços
          competitivos, garantindo a satisfação total dos nossos clientes em
          todo o mundo.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Visão</h2>
        <p className="text-lg">
          Ser a empresa líder no fornecimento de peças automotivas
          internacionalmente, reconhecida pela excelência em qualidade e
          atendimento ao cliente.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Valores</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Qualidade</li>
          <li>Integridade</li>
          <li>Inovação</li>
          <li>Compromisso com o Cliente</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Nossos Produtos</h2>
        <p className="text-lg">
          Oferecemos uma ampla gama de peças automotivas, incluindo motores,
          transmissões, sistemas de freios, componentes elétricos e muito mais.
          Todos os nossos produtos são rigorosamente testados para garantir a
          máxima qualidade e desempenho.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contato</h2>
        <p className="text-lg">
          Se você tiver alguma dúvida ou precisar de mais informações, não
          hesite em nos contatar. Estamos aqui para ajudar!
        </p>
      </section>
    </div>
  )
}

export default About
