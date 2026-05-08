import { signup } from '@/app/login/actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ArrowLeft, Mail, Lock, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default async function SignupPage(props: {
  searchParams: Promise<{ message: string }>
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-20 mx-auto min-h-[70vh]">
      <Link
        href="/login"
        className="absolute left-8 top-24 py-2 px-4 rounded-md no-underline text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center group text-sm font-medium transition-all"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Login
      </Link>

      <div className="flex flex-col space-y-2 text-center mb-8">
        <div className="mx-auto bg-orange-100 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl text-gray-900">Create Account</h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Sign up to start ordering your favorite meals in seconds.
        </p>
      </div>

      <form className="flex-1 flex flex-col w-full justify-center gap-5 text-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <label className="text-sm font-semibold leading-none text-gray-700" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold leading-none text-gray-700" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              type="password"
              name="password"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters.</p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button
            formAction={signup}
            className="inline-flex items-center justify-center rounded-lg text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 bg-orange-500 text-white hover:bg-orange-600 h-11 px-4 py-2 hover:shadow-md"
          >
            Sign Up
          </button>
        </div>

        {searchParams?.message && (
          <div className="mt-4 p-4 bg-orange-50 text-orange-800 text-center rounded-lg text-sm border border-orange-200 animate-in fade-in">
            {searchParams.message}
          </div>
        )}
      </form>
    </div>
  )
}
