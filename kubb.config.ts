import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import 'dotenv/config'

const configs = [
  defineConfig({
    name: 'Customers',
    root: '.',
    input: {
      path: `${process.env.NEXT_PUBLIC_API_BASE_URL}-docs/websites/customers.json`, // URL do Swagger ou OpenAPI
    },
    output: {
      path: './src/server/customers',
      extension: {
        '.ts': '.ts',
      },
    },
    plugins: [
      pluginOas(), // Processa o OpenAPI/Swagger
      pluginTs(), // Gera tipos TypeScript
      pluginReactQuery({
        client: {
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        },
        // Removed namingConvention as it is not supported by Options
      }), // Gera hooks para React Query
    ],
  }),
  defineConfig({
    name: 'Ecommerce',
    root: '.',
    input: {
      path: `${process.env.NEXT_PUBLIC_API_BASE_URL}-docs/websites/ecommerce.json`, // URL do Swagger ou OpenAPI
    },
    output: {
      path: './src/server/ecommerce',
      extension: {
        '.ts': '.ts',
      },
    },
    plugins: [
      pluginOas(), // Processa o OpenAPI/Swagger
      pluginTs(), // Gera tipos TypeScript
      pluginReactQuery({
        client: {
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        },
      }), // Gera hooks para React Query
    ],
  }),
]

export default configs
