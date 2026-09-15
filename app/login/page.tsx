"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    alert("Login system will be connected to the database soon.");
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a href="/" className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold">
              W
            </div>

            <div>
              <div className="font-bold">
                World Sponsor Link
              </div>

              <div className="text-xs text-gray-500">
                WSL
              </div>
            </div>

          </a>

          <a
            href="/"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to home
          </a>

        </div>
      </nav>


      {/* LOGIN */}

      <section className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-16">

        <div className="w-full max-w-md">

          {/* TITLE */}

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold">
              W
            </div>

            <h1 className="mt-7 text-3xl font-bold">
              Welcome back
            </h1>

            <p className="mt-3 text-gray-400">
              Sign in to your World Sponsor Link account.
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7"
          >

            {/* EMAIL */}

            <div>

              <label className="text-sm font-medium text-gray-300">
                Email address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
              />

            </div>


            {/* PASSWORD */}

            <div className="mt-5">

              <div className="flex justify-between">

                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 font-semibold transition hover:bg-blue-500"
            >
              Sign in →
            </button>


            {/* DIVIDER */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-gray-500">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>


            {/* SIGNUP */}

            <p className="text-center text-sm text-gray-400">

              Don't have an account?{" "}

              <a
                href="/signup"
                className="font-semibold text-blue-500 hover:text-blue-400"
              >
                Create one
              </a>

            </p>

          </form>


          <p className="mt-6 text-center text-xs leading-5 text-gray-600">
            By continuing, you agree to the WSL Terms of Service
            and Privacy Policy.
          </p>

        </div>

      </section>

    </main>
  );
}