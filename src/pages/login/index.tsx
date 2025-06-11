import { signIn } from 'next-auth/react'
import { FiUser, FiLock, FiMail, FiPhone } from 'react-icons/fi'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
  phone: z.string().min(6, { message: 'Phone is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
type RegisterForm = z.infer<typeof registerSchema>

export default function LoginPage() {
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
  }

  const onRegisterSubmit = async (data: RegisterForm) => {
    setError('')
    setSuccess('')
    // Simulação de registo (substitua por chamada real à API)
    setSuccess('Account created! You can now log in.')
    setIsRegister(false)
    resetRegister()
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
              placeholder="Phone"
              className="w-full bg-transparent text-white outline-none"
              {...registerRegister('phone')}
            />
          </div>
          {registerErrors.phone && (
            <div className="px-1 text-xs text-red-400">
              {registerErrors.phone.message as string}
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
            Create Account
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
        <span className="text-xs">or continue with</span>
        <span className="h-px w-10 bg-gray-600" />
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-2 rounded bg-white/90 py-2 font-semibold text-gray-900 shadow transition hover:bg-white"
        >
          <FaGoogle className="text-lg" /> Login with Google
        </button>
        <button
          onClick={() => signIn('facebook')}
          className="flex items-center justify-center gap-2 rounded bg-blue-600 py-2 font-semibold text-white shadow transition hover:bg-blue-700"
        >
          <FaFacebook className="text-lg" /> Login with Facebook
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
