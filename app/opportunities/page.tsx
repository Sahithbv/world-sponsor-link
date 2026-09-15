"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Opportunity = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string | null;
  event_date: string | null;
  sponsorship_min: number | null;
  sponsorship_max: number | null;
  expected_audience: number | null;
  deadline: string | null;
  benefits: string | null;
};

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function fetchOpportunities() {
    setLoading(true);

    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading opportunities:", error);
      setLoading(false);
      return;
    }

    setOpportunities(data || []);
    setLoading(false);
  }

  const categories = [
    "All",
    ...Array.from(
      new Set(opportunities.map((opportunity) => opportunity.category))
    ),
  ];

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchText) ||
      opportunity.description.toLowerCase().includes(searchText) ||
      opportunity.category.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || opportunity.category === category;

    return matchesSearch && matchesCategory;
  });

  function formatMoney(amount: number | null) {
    if (amount === null) return "Negotiable";

    return `₹${amount.toLocaleString("en-IN")}`;
  }

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

          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-white transition"
            >
              Dashboard
            </Link>

            <Link
              href="/login"
              className="border border-zinc-700 rounded-lg px-4 py-2 hover:border-blue-500 transition"
            >
              Account
            </Link>
          </div>

        </div>
      </nav>


      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">

        <p className="text-blue-500 font-semibold tracking-wide mb-3">
          SPONSORSHIP MARKETPLACE
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          Find your next opportunity.
        </h1>

        <p className="text-gray-400 text-lg mt-4 max-w-2xl">
          Discover events, creators, sports teams, communities,
          organizations, and projects looking for sponsors.
        </p>

      </section>


      {/* SEARCH */}
      <section className="max-w-7xl mx-auto px-6 pb-8">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

      </section>


      {/* RESULTS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        {loading ? (

          <div className="text-center py-20">
            <p className="text-blue-500 text-lg">
              Loading opportunities...
            </p>
          </div>

        ) : filteredOpportunities.length === 0 ? (

          <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-12 text-center">

            <div className="text-5xl mb-5">
              🔎
            </div>

            <h2 className="text-2xl font-bold">
              No opportunities yet
            </h2>

            <p className="text-gray-400 mt-3">
              New sponsorship opportunities will appear here.
            </p>

          </div>

        ) : (

          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Available Opportunities
              </h2>

              <p className="text-gray-500 mt-1">
                {filteredOpportunities.length} opportunities found
              </p>
            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredOpportunities.map((opportunity) => (

                <div
                  key={opportunity.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition flex flex-col"
                >

                  {/* CATEGORY + LOCATION */}
                  <div className="flex items-center justify-between gap-3">

                    <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                      {opportunity.category}
                    </span>

                    {opportunity.location && (
                      <span className="text-xs text-gray-500 truncate">
                        📍 {opportunity.location}
                      </span>
                    )}

                  </div>


                  {/* TITLE */}
                  <h3 className="text-xl font-bold mt-5">
                    {opportunity.title}
                  </h3>


                  {/* DESCRIPTION */}
                  <p className="text-gray-400 mt-3 leading-relaxed line-clamp-3">
                    {opportunity.description}
                  </p>


                  {/* DETAILS */}
                  <div className="border-t border-zinc-800 mt-6 pt-5 space-y-3">

                    {opportunity.expected_audience !== null && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Audience
                        </span>

                        <span className="text-gray-300">
                          {opportunity.expected_audience.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </div>
                    )}


                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Sponsorship
                      </span>

                      <span className="text-gray-300">
                        {formatMoney(opportunity.sponsorship_min)}
                        {" - "}
                        {formatMoney(opportunity.sponsorship_max)}
                      </span>
                    </div>


                    {opportunity.event_date && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Event date
                        </span>

                        <span className="text-gray-300">
                          {new Date(
                            opportunity.event_date
                          ).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    )}

                  </div>


                  {/* VIEW BUTTON */}
                  <Link
                    href={`/opportunities/${opportunity.id}`}
                    className="mt-6 block text-center bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-semibold transition"
                  >
                    View Opportunity
                  </Link>

                </div>

              ))}

            </div>
          </>

        )}

      </section>

    </main>
  );
}