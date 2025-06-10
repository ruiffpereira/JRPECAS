import routes from '@/routes'
import Link from 'next/link'
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiCreditCard,
  FiPhone,
  FiMail,
  FiMapPin,
  FiFileText,
  FiShield,
  FiAlertCircle,
} from 'react-icons/fi'

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-gray-900 bg-gray-950 pb-4 pt-10 text-white shadow-[0_-4px_24px_0_rgba(0,0,0,0.4)]">
      <div className="container mx-auto grid grid-cols-2 gap-10 px-4 md:grid-cols-4">
        {/* Identificação da Empresa */}
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-red-500">
            <FiFileText /> Complete Peças Usadas
          </h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <span className="font-semibold">NIF:</span> 123456789
            </li>
            <li>
              <span className="font-semibold">Registo Comercial:</span>{' '}
              2023/00001
            </li>
            <li className="flex items-start gap-1">
              <FiMapPin className="mt-0.5 text-red-400" /> Rua das Peças, 123
              <br />
              1000-000 Lisboa, Portugal
            </li>
            <li className="flex items-center gap-1">
              <FiPhone className="text-red-400" />{' '}
              <a href="tel:+351912345678" className="hover:underline">
                +351 912 345 678
              </a>
            </li>
            <li className="flex items-center gap-1">
              <FiMail className="text-red-400" />{' '}
              <a href="mailto:info@jrpecas.com" className="hover:underline">
                info@jrpecas.com
              </a>
            </li>
          </ul>
        </div>

        {/* Informações Legais */}
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-red-500">
            <FiShield /> Legal &amp; Apoio
          </h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link
                href={routes.termsandconditions}
                className="hover:underline"
              >
                Termos &amp; Condições
              </Link>
            </li>
            <li>
              <Link href={routes.privacy} className="hover:underline">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href={routes.cookies} className="hover:underline">
                Política de Cookies
              </Link>
            </li>
            <li>
              <Link href={routes.ral} className="hover:underline">
                Resolução Alternativa de Litígios (RAL)
              </Link>
            </li>
            <li>
              <a
                href="https://www.livroreclamacoes.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
              >
                <FiAlertCircle className="text-red-400" /> Livro de Reclamações
              </a>
            </li>
          </ul>
        </div>

        {/* Compra & Garantias */}
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-red-500">
            <FiCreditCard /> Compra &amp; Garantias
          </h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Preços com IVA incluído</li>
            <li>Envio para todo o país</li>
            <li>Devoluções até 14 dias</li>
            <li>Garantia legal de 3 anos</li>
            <li>
              <span className="font-semibold">Pagamentos:</span>
              <div className="mt-1 flex gap-2">
                <FiCreditCard
                  size={22}
                  className="text-blue-400"
                  title="Cartão"
                />
                <FiCreditCard
                  size={22}
                  className="text-red-400"
                  title="MB WAY"
                />
                <FiCreditCard
                  size={22}
                  className="text-green-400"
                  title="Transferência"
                />
              </div>
            </li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h2 className="mb-3 text-xl font-bold text-red-500">Siga-nos</h2>
          <div className="mb-3 flex gap-4">
            <Link href="https://www.facebook.com" target="_blank">
              <FiFacebook
                className="text-blue-500 transition hover:text-blue-300"
                size={28}
              />
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
              <FiTwitter
                className="text-blue-300 transition hover:text-blue-100"
                size={28}
              />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <FiInstagram
                className="text-pink-500 transition hover:text-pink-300"
                size={28}
              />
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            Novidades, promoções e dicas exclusivas.
          </p>
        </div>
      </div>

      <div className="container mx-auto mt-8 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} JR-PECASCOMPLETE. Todos os direitos
        reservados.
      </div>
    </footer>
  )
}

export default Footer
