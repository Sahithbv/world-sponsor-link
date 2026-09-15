"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function OrganizationSetupPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !description || !location) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to create an organization.");
      setLoading(false);
      return;
    }

    // Check if organization already exists
    const { data: existingOrganization } = await supabase
      .from("organizations")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (existingOrganization) {
      setError("You already have an organization profile.");
      setLoading(false);
      return;
    }

    // Create organization
    const { error: organizationError } = await supabase
      .from("organizations")
      .insert({
        owner_id: user.id,
        name,
        description,
        website: website || null,
        location,
      });

    if (organizationError) {
      setError(organizationError.message);
      setLoading(false);
      return;
    }

    setSuccess("Organization profile created successfully!");

    setName("");
    setDescription("");
    setWebsite("");
    setLocation("");

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
      <section className="max-w-3xl mx-auto px-6 py-12">

        <div className="mb-10">

          <p className="text-blue-500 font-semibold tracking-wide mb-3">
            ORGANIZATION PROFILE
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Tell brands about yourself.
          </h1>

          <p className="text-gray-400 text-lg mt-4">
            Create your organization profile before publishing
            sponsorship opportunities.
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8"
        >

          {/* ORGANIZATION NAME */}
          <label className="block text-sm font-medium mb-2">
            Organization name *
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. ABC College Tech Club"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-6 outline-none focus:border-blue-500"
          />


          {/* DESCRIPTION */}
          <label className="block text-sm font-medium mb-2">
            About your organization *
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell potential sponsors about your organization, audience, activities, and what you do..."
            rows={6}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-6 outline-none focus:border-blue-500 resize-none"
          />


          {/* WEBSITE */}
          <label className="block text-sm font-medium mb-2">
            Website
          </label>

          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 mb-6 outline-none focus:border-blue-500"
          />


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
              ? "Creating organization..."
              : "Create Organization"}
          </button>

        </form>

      </section>

    </main>
  );
}