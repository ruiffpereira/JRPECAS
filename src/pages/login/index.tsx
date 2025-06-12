import { getSession, signIn } from 'next-auth/react'
import { FiUser, FiLock, FiMail, FiPhone } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { postWebsitesCustomersAutenticationRegister } from '@/servers/customers/hooks/usePostWebsitesCustomersAutenticationRegister'
import { GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import router from 'next/router'
import routes from '@/routes'

// Types
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
type LoginForm = z.infer<typeof loginSchema>

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  contact: z.string().min(9, { message: 'Phone is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
type RegisterForm = z.infer<typeof registerSchema>

export default function LoginPage({ sessionNext }: { sessionNext: Session }) {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  // Register form
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onLoginSubmit = async (data: LoginForm) => {
    setError('')
    setSuccess('')
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
    if (res?.error) setError('Invalid credentials')
    else router.push(routes.home)
  }

  const onRegisterSubmit = async (data: RegisterForm) => {
    setError('')
    setSuccess('')
    try {
      await postWebsitesCustomersAutenticationRegister(
        {
          name: data.name,
          contact: data.contact,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        },
      )
    } catch (error) {
      setError('Failed to create account. Please try again.')
      return error
    }
    setSuccess('Account created! You can now log in.')
    setIsRegister(false)
    resetRegister()
  }

  if (sessionNext) {
    router.push(routes.home)
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl px-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-white">
        {isRegister ? 'Create Account' : 'Login'}
      </h1>

      {/* Register Form */}
      {isRegister && (
        <form
          onSubmit={handleRegisterSubmit(onRegisterSubmit)}
          className="space-y-4"
        >
          <div className="flex items-center rounded bg-gray-700 px-3 py-2">
            <FiUser className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent text-white outline-none"
              {...registerRegister('name')}
            />
          </div>
          {registerErrors.name && (
            <div className="px-1 text-xs text-red-400">
              {registerErrors.name.message as string}
            </div>
          )}
          <div className="flex items-center rounded bg-gray-700 px-3 py-2">
            <FiPhone className="mr-2 text-gray-400" />
            <input
              type="tel"
              placeholder="contact"
              className="w-full bg-transparent text-white outline-none"
              {...registerRegister('contact')}
            />
          </div>
          {registerErrors.contact && (
            <div className="px-1 text-xs text-red-400">
              {registerErrors.contact.message as string}
            </div>
          )}
          <div className="flex items-center rounded bg-gray-700 px-3 py-2">
            <FiMail className="mr-2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent text-white outline-none"
              {...registerRegister('email')}
            />
          </div>
          {registerErrors.email && (
            <div className="px-1 text-xs text-red-400">
              {registerErrors.email.message as string}
            </div>
          )}
          <div className="flex items-center rounded bg-gray-700 px-3 py-2">
            <FiLock className="mr-2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent text-white outline-none"
              {...registerRegister('password')}
            />
          </div>
          {registerErrors.password && (
            <div className="px-1 text-xs text-red-400">
              {registerErrors.password.message as string}
            </div>
          )}
          {error && (
            <div className="rounded bg-red-500/80 px-3 py-2 text-center text-sm text-white">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded bg-green-500/80 px-3 py-2 text-center text-sm text-white">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded bg-red-500 py-2 font-bold text-white transition hover:bg-red-600"
          >
            Criar Conta
          </button>
        </form>
      )}

      {/* Login Form */}
      {!isRegister && (
        <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
          <div className="flex items-center rounded bg-gray-700 px-3 py-2">
            <FiMail className="mr-2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent text-white outline-none"
              {...loginRegister('email')}
            />
          </div>
          {loginErrors.email && (
            <div className="px-1 text-xs text-red-400">
              {loginErrors.email.message as string}
            </div>
          )}
          <div className="flex items-center rounded bg-gray-700 px-3 py-2">
            <FiLock className="mr-2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent text-white outline-none"
              {...loginRegister('password')}
            />
          </div>
          {loginErrors.password && (
            <div className="px-1 text-xs text-red-400">
              {loginErrors.password.message as string}
            </div>
          )}
          {error && (
            <div className="rounded bg-red-500/80 px-3 py-2 text-center text-sm text-white">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded bg-green-500/80 px-3 py-2 text-center text-sm text-white">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded bg-red-500 py-2 font-bold text-white transition hover:bg-red-600"
          >
            Login
          </button>
        </form>
      )}

      <div className="my-6 flex items-center justify-center gap-2 text-gray-400">
        <span className="h-px w-10 bg-gray-600" />
        <span className="text-xs">ou continua com</span>
        <span className="h-px w-10 bg-gray-600" />
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-2 rounded bg-white/90 py-2 font-semibold text-gray-900 shadow transition hover:bg-white"
        >
          <FaGoogle className="text-lg" /> Login com Google
        </button>
      </div>
      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-sm text-gray-300 underline hover:text-red-400"
          onClick={() => {
            setIsRegister(!isRegister)
            setError('')
            setSuccess('')
            resetLogin()
            resetRegister()
          }}
        >
          {isRegister
            ? 'Already have an account? Login'
            : "Don't have an account? Create one"}
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
    }
  }

  const { id } = context.params as { id: string }

  return {
    props: { sessionNext: session, id },
  }
}
