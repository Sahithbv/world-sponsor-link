"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Profile = {
  full_name: string;
  account_type: "brand" | "organization";
};

export default function ProfilePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, account_type")
        .eq("id", user.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProfile(data);
        setFullName(data.full_name);
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
      })
      .eq("id", user.id);

    if (error) {
      setError(error.message);
    } else {
      setProfile((current) =>
        current
          ? {
              ...current,
              full_name: fullName,
            }
          : current
      );

      setMessage("Profile updated successfully.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-blue-500"
          >
            WSL
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white"
          >
            ← Dashboard
          </Link>
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-blue-500 font-semibold mb-3">
          ACCOUNT
        </p>

        <h1 className="text-4xl font-bold">
          Your Profile
        </h1>

        <p className="text-gray-400 mt-3">
          Manage your World Sponsor Link account information.
        </p>

        <div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-2xl p-7">
          <form onSubmit={handleSave}>
            <label className="block font-semibold mb-2">
              Full name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            <label className="block font-semibold mt-6 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-gray-500"
            />

            <label className="block font-semibold mt-6 mb-2">
              Account type
            </label>

            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-gray-300 capitalize">
              {profile?.account_type}
            </div>

            {error && (
              <div className="mt-5 bg-red-950/40 border border-red-900 text-red-400 rounded-xl p-4">
                {error}
              </div>
            )}

            {message && (
              <div className="mt-5 bg-green-950/40 border border-green-900 text-green-400 rounded-xl p-4">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl py-3 font-semibold transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {profile?.account_type === "organization" && (
          <Link
            href="/organization/setup"
            className="block mt-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <h2 className="font-bold text-lg">
              Organization Settings →
            </h2>

            <p className="text-gray-400 mt-2">
              Manage your organization profile.
            </p>
          </Link>
        )}
      </section>
    </main>
  );
}