"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Profile = {
  full_name: string;
  account_type: "brand" | "organization";
};

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, account_type")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setProfile(data);
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);

    await supabase.auth.signOut();

    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading dashboard...</p>
      </main>
    );
  }

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <nav className="border-b border-zinc-800 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-blue-500">
              WSL
            </span>

            <span className="hidden sm:block text-sm text-gray-400">
              World Sponsor Link
            </span>
          </Link>

          {/* NAV ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/notifications"
              className="text-gray-400 hover:text-white transition px-3 py-2"
            >
              Notifications
            </Link>

            <Link
              href="/profile"
              className="border border-zinc-700 rounded-lg px-4 py-2 hover:border-blue-500 transition"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="border border-red-900/50 text-red-400 rounded-lg px-4 py-2 hover:border-red-500 hover:text-red-300 transition disabled:opacity-50"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* WELCOME */}
        <div className="mb-12">
          <p className="text-blue-500 font-semibold tracking-wide mb-3">
            WORLD SPONSOR LINK
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome, {firstName}.
          </h1>

          <p className="text-gray-400 mt-4 text-lg max-w-2xl">
            Find sponsorship opportunities, connect with brands,
            and build partnerships that matter.
          </p>

          {profile && (
            <div className="mt-5 inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 rounded-full px-4 py-2">
              <span className="text-gray-400 text-sm">
                Account:
              </span>

              <span className="text-blue-400 text-sm font-semibold capitalize">
                {profile.account_type}
              </span>
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {/* FIND OPPORTUNITIES */}
          <Link
            href="/opportunities"
            className="group bg-zinc-950 border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 hover:bg-blue-500/5 transition"
          >
            <div className="text-3xl mb-5">
              🔎
            </div>

            <h2 className="text-xl font-bold group-hover:text-blue-400 transition">
              Find Opportunities
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Discover events, creators, teams, organizations,
              and other opportunities looking for sponsors.
            </p>

            <div className="text-blue-500 mt-5 font-medium">
              Explore opportunities →
            </div>
          </Link>

          {/* CREATE OPPORTUNITY */}
          <Link
            href="/create-opportunity"
            className="group bg-zinc-950 border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 hover:bg-blue-500/5 transition"
          >
            <div className="text-3xl mb-5">
              🚀
            </div>

            <h2 className="text-xl font-bold group-hover:text-blue-400 transition">
              Create Opportunity
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Have an event, community, team, or project?
              Put it in front of potential sponsors.
            </p>

            <div className="text-blue-500 mt-5 font-medium">
              Create an opportunity →
            </div>
          </Link>

          {/* PARTNERSHIPS */}
          <Link
            href="/partnerships"
            className="group bg-zinc-950 border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 hover:bg-blue-500/5 transition"
          >
            <div className="text-3xl mb-5">
              🤝
            </div>

            <h2 className="text-xl font-bold group-hover:text-blue-400 transition">
              My Partnerships
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Track sponsorship applications, negotiations,
              and partnerships in one place.
            </p>

            <div className="text-blue-500 mt-5 font-medium">
              View partnerships →
            </div>
          </Link>
        </div>

        {/* FEATURED OPPORTUNITIES */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Featured Opportunities
              </h2>

              <p className="text-gray-400 mt-2">
                Discover opportunities that could be a great fit.
              </p>
            </div>

            <Link
              href="/opportunities"
              className="hidden sm:block text-blue-500 hover:text-blue-400"
            >
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* CARD 1 */}
            <Link
              href="/opportunities"
              className="group bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition"
            >
              <span className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                College Event
              </span>

              <h3 className="text-xl font-bold mt-5 group-hover:text-blue-400 transition">
                Annual Tech Fest
              </h3>

              <p className="text-gray-400 mt-3">
                Looking for brands interested in reaching
                thousands of college students.
              </p>

              <div className="border-t border-zinc-800 mt-6 pt-5 text-sm text-gray-500">
                Audience: 5,000+
              </div>

              <div className="text-blue-500 mt-4 text-sm font-medium">
                View opportunities →
              </div>
            </Link>

            {/* CARD 2 */}
            <Link
              href="/opportunities"
              className="group bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition"
            >
              <span className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                Sports
              </span>

              <h3 className="text-xl font-bold mt-5 group-hover:text-blue-400 transition">
                University Football Team
              </h3>

              <p className="text-gray-400 mt-3">
                Seeking a long-term brand partner for
                the upcoming season.
              </p>

              <div className="border-t border-zinc-800 mt-6 pt-5 text-sm text-gray-500">
                Audience: 10,000+
              </div>

              <div className="text-blue-500 mt-4 text-sm font-medium">
                View opportunities →
              </div>
            </Link>

            {/* CARD 3 */}
            <Link
              href="/opportunities"
              className="group bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition"
            >
              <span className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                Creator
              </span>

              <h3 className="text-xl font-bold mt-5 group-hover:text-blue-400 transition">
                Gaming Creator
              </h3>

              <p className="text-gray-400 mt-3">
                Looking for a technology or gaming brand
                partnership.
              </p>

              <div className="border-t border-zinc-800 mt-6 pt-5 text-sm text-gray-500">
                Audience: 100,000+
              </div>

              <div className="text-blue-500 mt-4 text-sm font-medium">
                View opportunities →
              </div>
            </Link>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 border border-blue-500/30 bg-blue-500/5 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to find your next partnership?
          </h2>

          <p className="text-gray-400 mt-3 max-w-2xl">
            Explore sponsorship opportunities from organizations,
            events, creators, teams, and communities.
          </p>

          <Link
            href="/opportunities"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition"
          >
            Explore Opportunities
          </Link>
        </div>
      </section>
    </main>
  );
}