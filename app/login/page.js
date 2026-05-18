'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/Reveal'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/blogs')
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <Reveal>
          <div className="glass-card p-8 text-center">
            <h1 className="text-heading mb-8">Access Portal</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="contact-input"
                required
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="contact-input"
                required
              />
              
              {error && <p className="text-[12px] text-red-500 text-left px-2">{error}</p>}
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full mt-2"
              >
                {isLoading ? 'Authenticating...' : 'Enter'}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
