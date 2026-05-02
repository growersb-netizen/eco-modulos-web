'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Leaf, Lock, Mail, AlertCircle } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (session) router.push('/admin/dashboard')
  }, [session, router])

  async function onSubmit(data: FormData) {
    setError('')
    setLoading(true)
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError('Email o contraseña incorrectos.')
    } else {
      router.push('/admin/dashboard')
    }
  }

  if (status === 'loading') return null

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-eco-green mb-2">
            <Leaf className="w-8 h-8" />
            <span
              className="text-2xl font-bold uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Eco Módulos
            </span>
          </div>
          <p className="text-eco-text-muted text-sm">Panel de Administración</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8">
          <h1
            className="text-2xl font-bold text-eco-text mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Iniciar Sesión
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm text-eco-text-muted mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-eco-text-muted" />
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className="w-full bg-[#222222] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-3 text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green transition-colors"
                  placeholder="admin@ecomodulosypiscinas.com.ar"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-eco-text-muted mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-eco-text-muted" />
                <input
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                  className="w-full bg-[#222222] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-3 text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-900/20 border border-red-800 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-eco-green hover:bg-eco-green-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center text-eco-text-muted text-xs mt-6">
          Panel exclusivo para el equipo de Eco Módulos & Piscinas
        </p>
      </div>
    </div>
  )
}
