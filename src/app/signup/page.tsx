import { signup, loginWithGoogle } from '@/app/login/actions'
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
        className="absolute left-8 top-24 py-2 px-4 rounded-md no-underline text-gray-300 bg-gray-900 border border-gray-800 hover:bg-gray-800 flex items-center group text-sm font-medium transition-all"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Login
      </Link>

      <div className="flex flex-col space-y-2 text-center mb-8">
        <div className="mx-auto bg-orange-100/10 p-3 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl text-white">Create Account</h1>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          Sign up to start ordering your favorite meals in seconds.
        </p>
      </div>

      <form className="flex-1 flex flex-col w-full justify-center gap-5 text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <label className="text-sm font-semibold leading-none text-gray-200" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              className="flex h-11 w-full rounded-lg border border-gray-700 bg-gray-900/50 px-3 py-2 pl-10 text-sm text-white shadow-sm transition-colors placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold leading-none text-gray-200" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              className="flex h-11 w-full rounded-lg border border-gray-700 bg-gray-900/50 px-3 py-2 pl-10 text-sm text-white shadow-sm transition-colors placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
          <div className="mt-4 p-4 bg-orange-500/10 text-orange-500 text-center rounded-lg text-sm border border-orange-500/20 animate-in fade-in">
            {searchParams.message}
          </div>
        )}
      </form>

      <div className="flex flex-col gap-3 w-full mt-4">
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a0a0a] px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <form>
          <button
            formAction={loginWithGoogle}
            className="w-full inline-flex items-center justify-center rounded-lg text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 border border-gray-700 bg-white text-gray-900 hover:bg-gray-100 h-11 px-4 py-2 hover:shadow-md gap-2"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"
              />
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"
              />
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"
              />
              <path
                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26537 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                fill="#34A853"
              />
            </svg>
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  )
}
