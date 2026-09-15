"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function CreateOpportunityPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("College Event");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [audience, setAudience] = useState("");
  const [benefits, setBenefits] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !eventDate ||
      !deadline ||
      !audience ||
      !benefits
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Get currently logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to create an opportunity.");
      setLoading(false);
      return;
    }

    // Find the organization owned by this user
    const { data: organization, error: organizationError } =
      await supabase
        .from("organizations")
        .select("id")
        .eq("owner_id", user.id)
        .single();

    if (organizationError || !organization) {
      setError(
        "You need to create your organization profile before posting an opportunity."
      );
      setLoading(false);
      return;
    }

    // Create opportunity
    const { error: opportunityError } = await supabase
      .from("opportunities")
      .insert({
        organization_id: organization.id,
        title,
        description,
        category,
        location,
        event_date: eventDate,
        deadline,
        sponsorship_min: minAmount
          ? Number(minAmount)
          : null,
        sponsorship_max: maxAmount
          ? Number(maxAmount)
          : null,
        expected_audience: Number(audience),
        benefits,
        status: "active",
      });

    if (opportunityError) {
      setError(opportunityError.message);
      setLoading(false);
      return;
    }

    setSuccess("Your opportunity has been published!");

    setTitle("");
    setDescription("");
    setLocation("");
    setEventDate("");
    setDeadline("");
    setMinAmount("");
    setMaxAmount("");
    setAudience("");
    setBenefits("");

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="border-b border-zinc-800 bg-black">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-blue-500">
              WSL
            </span>

            <span className="hidden sm:block text-sm text-gray-400">
              World Sponsor Link
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition"
          >
            Dashboard
          </Link>

        </div>
      </nav>


      {/* PAGE */}
      <section className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-10">

          <p className="text-blue-500 font-semibold tracking-wide mb-3">
            ORGANIZATION
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Create an opportunity
          </h1>

          <p className="text-gray-400 text-lg mt-4">
            Tell brands why they should partner with you.
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8"
        >

          {/* BASIC INFORMATION */}
          <h2 className="text-xl font-bold mb-6">
            Basic Information
          </h2>


          {/* TITLE */}
          <label className="block text-sm font-medium mb-2">
            Opportunity title *
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Annual College Tech Fest"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-6 outline-none focus:border-blue-500"
          />


          {/* DESCRIPTION */}
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your event, organization, audience and what you are looking for..."
            rows={5}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-6 outline-none focus:border-blue-500 resize-none"
          />


          {/* CATEGORY */}
          <label className="block text-sm font-medium mb-2">
            Category *
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-6 outline-none focus:border-blue-500"
          >
            <option>College Event</option>
            <option>Sports</option>
            <option>Creator</option>
            <option>Community</option>
            <option>NGO</option>
            <option>Startup</option>
            <option>Conference</option>
            <option>Festival</option>
            <option>Other</option>
          </select>


          {/* LOCATION */}
          <label className="block text-sm font-medium mb-2">
            Location *
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Bangalore, Karnataka"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-8 outline-none focus:border-blue-500"
          />


          {/* EVENT INFORMATION */}
          <h2 className="text-xl font-bold mb-6">
            Event Information
          </h2>


          <div className="grid md:grid-cols-2 gap-5 mb-8">

            {/* EVENT DATE */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Event date *
              </label>

              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>


            {/* DEADLINE */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Application deadline *
              </label>

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>


          {/* AUDIENCE */}
          <label className="block text-sm font-medium mb-2">
            Expected audience *
          </label>

          <input
            type="number"
            min="1"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-8 outline-none focus:border-blue-500"
          />


          {/* SPONSORSHIP */}
          <h2 className="text-xl font-bold mb-2">
            Sponsorship
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Give brands an idea of the sponsorship budget.
          </p>


          <div className="grid md:grid-cols-2 gap-5 mb-6">

            <div>
              <label className="block text-sm font-medium mb-2">
                Minimum sponsorship
              </label>

              <div className="relative">

                <span className="absolute left-4 top-3 text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="25000"
                  className="w-full bg-black border border-zinc-700 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-blue-500"
                />

              </div>
            </div>


            <div>
              <label className="block text-sm font-medium mb-2">
                Maximum sponsorship
              </label>

              <div className="relative">

                <span className="absolute left-4 top-3 text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="100000"
                  className="w-full bg-black border border-zinc-700 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-blue-500"
                />

              </div>
            </div>

          </div>


          {/* BENEFITS */}
          <label className="block text-sm font-medium mb-2">
            Sponsorship benefits *
          </label>

          <textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            placeholder="e.g. Logo placement, social media promotion, event stall, stage mentions..."
            rows={4}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-8 outline-none focus:border-blue-500 resize-none"
          />


          {/* ERROR */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-5">
              {error}
            </div>
          )}


          {/* SUCCESS */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-4 mb-5">
              {success}
            </div>
          )}


          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 py-4 rounded-xl font-semibold text-lg transition"
          >
            {loading
              ? "Publishing..."
              : "🚀 Publish Opportunity"}
          </button>

        </form>

      </section>

    </main>
  );
}