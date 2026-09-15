"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const [accountType, setAccountType] = useState<"brand" | "organization">(
  "brand"
);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setError("");


    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // Create account in Supabase Auth
   const { data, error: signupError } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: fullName,
      account_type: accountType,
    },
  },
});

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

   
    // Send user to dashboard
    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="block text-center mb-10">
          <div className="text-3xl font-bold">
            <span className="text-blue-500">WSL</span>
          </div>

          <p className="text-gray-500 text-sm mt-1">
            World Sponsor Link
          </p>
        </Link>

        {/* Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl">

          <h1 className="text-3xl font-bold text-center">
            Create your account
          </h1>

          <p className="text-gray-400 text-center mt-2 mb-8">
            Join the sponsorship marketplace
          </p>

          <form onSubmit={handleSignup}>

            {/* Account type */}
            <label className="block text-sm font-medium mb-3">
              I want to...
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">

              <button
                type="button"
                onClick={() => setAccountType("brand")}
                className={`p-4 rounded-xl border text-left transition ${
                  accountType === "brand"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-zinc-700 hover:border-zinc-500"
                }`}
              >
                <div className="font-semibold">
                  🏢 I'm a Brand
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  Find sponsorship opportunities
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAccountType("organization")}
                className={`p-4 rounded-xl border text-left transition ${
                  accountType === "organization"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-zinc-700 hover:border-zinc-500"
                }`}
              >
                <div className="font-semibold">
                  🎯 I Need a Sponsor
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  Find sponsors for my opportunity
                </div>
              </button>

            </div>

            {/* Name */}
            <label className="block text-sm font-medium mb-2">
              Full name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-5 outline-none focus:border-blue-500"
            />

            {/* Email */}
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-5 outline-none focus:border-blue-500"
            />

            {/* Password */}
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-5 outline-none focus:border-blue-500"
            />

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 text-sm mb-5">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400"
            >
              Log in
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}