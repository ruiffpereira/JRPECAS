import Image from 'next/image'

interface ProductCardProps {
  name: string
  price: string
  category: string
  description: string
  imageUrl: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  category,
  description,
  imageUrl,
}) => {
  return (
    <div className=" rounded-lg p-4 bg-slate-800 shadow-md">
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <p className="text-gray-700">{price}</p>
      <p className="text-gray-500">{category}</p>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  )
}

const products = [
  {
    name: 'Peça 1',
    price: 'R$ 100,00',
    category: 'Categoria 1',
    description: 'Descrição da peça 1',
    imageUrl: '/path/to/image1.jpg',
  },
  {
    name: 'Peça 2',
    price: 'R$ 200,00',
    category: 'Categoria 2',
    description: 'Descrição da peça 2',
    imageUrl: '/path/to/image2.jpg',
  },
  // Adicione mais produtos conforme necessário
]

const ProductGrid: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 uppercase">pecas a venda</h1>
      <div className="flex gap-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-2/3">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              category={product.category}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
        <div className="w-1/3 p-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>
          {/* Adicione seus filtros aqui */}
          <div className="mb-4">
            <label className="block text-gray-700">Categoria</label>
            <select className="w-full p-2 border rounded">
              <option>Categoria 1</option>
              <option>Categoria 2</option>
              {/* Adicione mais opções conforme necessário */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Preço</label>
            <input type="range" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="h-16 flex gap-2 justify-center items-center bg-black text-white text-2xl">
        JRPECASCOMPLETE
      </div>
      <div className="h-96 relative">
        <div className="h-full absolute inset-0 z-0">
          <Image
            src="/3.jpg"
            alt="Banner"
            width={1920}
            height={400}
            className="w-full object-cover h-full"
          />
        </div>
        <div className="px-4 bg-red-700 h-12 max-w-screen-lg mx-auto flex justify-evenly items-center uppercase text-sm text-white relative z-[2]">
          <div>HOME</div>
          <div>CONTACTO</div>
          <div>ONDE ESTAMOS</div>
        </div>
      </div>
      <div className="p-4">
        <ProductGrid />
      </div>
    </div>
  )
}
