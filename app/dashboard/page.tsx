"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="border-b border-zinc-800 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-blue-500">
              WSL
            </span>

            <span className="hidden sm:block text-sm text-gray-400">
              World Sponsor Link
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition">
              Notifications
            </button>

            <button className="border border-zinc-700 rounded-lg px-4 py-2 hover:border-blue-500 transition">
              Profile
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
            Welcome to your dashboard.
          </h1>

          <p className="text-gray-400 mt-4 text-lg max-w-2xl">
            Find sponsorship opportunities, connect with brands,
            and build partnerships that matter.
          </p>

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


          {/* CREATE */}
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
          <div className="group bg-zinc-950 border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 transition">

            <div className="text-3xl mb-5">
              🤝
            </div>

            <h2 className="text-xl font-bold">
              My Partnerships
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Track sponsorship applications, negotiations,
              and partnerships in one place.
            </p>

            <div className="text-gray-600 mt-5 font-medium">
              Coming soon
            </div>

          </div>

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
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition">

              <span className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                College Event
              </span>

              <h3 className="text-xl font-bold mt-5">
                Annual Tech Fest
              </h3>

              <p className="text-gray-400 mt-3">
                Looking for brands interested in reaching
                thousands of college students.
              </p>

              <div className="border-t border-zinc-800 mt-6 pt-5 text-sm text-gray-500">
                Audience: 5,000+
              </div>

            </div>


            {/* CARD 2 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition">

              <span className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                Sports
              </span>

              <h3 className="text-xl font-bold mt-5">
                University Football Team
              </h3>

              <p className="text-gray-400 mt-3">
                Seeking a long-term brand partner for
                the upcoming season.
              </p>

              <div className="border-t border-zinc-800 mt-6 pt-5 text-sm text-gray-500">
                Audience: 10,000+
              </div>

            </div>


            {/* CARD 3 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition">

              <span className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                Creator
              </span>

              <h3 className="text-xl font-bold mt-5">
                Gaming Creator
              </h3>

              <p className="text-gray-400 mt-3">
                Looking for a technology or gaming brand
                partnership.
              </p>

              <div className="border-t border-zinc-800 mt-6 pt-5 text-sm text-gray-500">
                Audience: 100,000+
              </div>

            </div>

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