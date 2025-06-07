import Link from 'next/link'
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiCreditCard,
} from 'react-icons/fi'

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto flex flex-shrink-0 flex-col gap-4 bg-black p-4 text-white">
      <section className="container mx-auto rounded-lg text-white">
        <h2 className="mb-4 text-2xl font-bold">
          Inscreva-se na nossa Newsletter
        </h2>
        <form className="flex flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Digite seu email"
            className="flex-grow rounded p-2 text-black"
          />
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Inscrever-se
          </button>
        </form>
      </section>
      <section className="container mx-auto">
        <h2 className="text-2xl font-bold text-white">Formas de Pagamento</h2>
        <div className="flex space-x-4">
          <FiCreditCard size={48} className="text-blue-600" />
          <FiCreditCard size={48} className="text-red-600" />
          <FiCreditCard size={48} className="text-blue-800" />
        </div>
      </section>
      <div className="container mx-auto text-center">
        <p>&copy; 2023 JRPECASCOMPLETE. Todos os direitos reservados.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="https://www.facebook.com">
            <FiFacebook className="text-blue-600" size={24} />
          </Link>
          <Link href="https://www.twitter.com">
            <FiTwitter className="text-blue-400" size={24} />
          </Link>
          <Link href="https://www.instagram.com">
            <FiInstagram className="text-pink-600" size={24} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
