"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Application = {
  id: string;
  opportunity_id: string;
  message: string | null;
  proposed_amount: number | null;
  status: string;
  created_at: string;
};

type Opportunity = {
  id: string;
  title: string;
};

export default function PartnershipsPage() {
  const router = useRouter();

  const [applications, setApplications] = useState<Application[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [accountType, setAccountType] = useState<
    "brand" | "organization" | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    loadPartnerships();
  }, []);

  async function loadPartnerships() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("account_type")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error(profileError);
      setLoading(false);
      return;
    }

    setAccountType(profile.account_type);

    // =========================
    // BRAND
    // =========================
    if (profile.account_type === "brand") {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("brand_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
      }

      setApplications(data || []);
    }

    // =========================
    // ORGANIZATION
    // =========================
    if (profile.account_type === "organization") {
      const { data: orgs, error: orgError } = await supabase
        .from("organizations")
        .select("id")
        .eq("owner_id", user.id);

      if (orgError) {
        console.error(orgError);
        setLoading(false);
        return;
      }

      const organizationIds = (orgs || []).map(
        (org) => org.id
      );

      if (organizationIds.length > 0) {
        const { data: opps, error: oppError } = await supabase
          .from("opportunities")
          .select("id, title")
          .in("organization_id", organizationIds);

        if (oppError) {
          console.error(oppError);
        }

        setOpportunities(opps || []);

        const opportunityIds = (opps || []).map(
          (opp) => opp.id
        );

        if (opportunityIds.length > 0) {
          const { data: incoming, error: applicationError } =
            await supabase
              .from("applications")
              .select("*")
              .in("opportunity_id", opportunityIds)
              .order("created_at", {
                ascending: false,
              });

          if (applicationError) {
            console.error(applicationError);
          }

          setApplications(incoming || []);
        }
      }
    }

    setLoading(false);
  }

  async function updateApplication(
    applicationId: string,
    status: "accepted" | "rejected"
  ) {
    setUpdating(applicationId);

    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", applicationId);

    if (error) {
      alert(error.message);
      setUpdating("");
      return;
    }

    setApplications((current) =>
      current.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              status,
            }
          : application
      )
    );

    setUpdating("");
  }

  function getOpportunityTitle(id: string) {
    return (
      opportunities.find(
        (opportunity) => opportunity.id === id
      )?.title || "Sponsorship Opportunity"
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-blue-500"
          >
            WSL
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition"
          >
            ← Dashboard
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-blue-500 font-semibold mb-3">
          PARTNERSHIPS
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          My Partnerships
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          {accountType === "organization"
            ? "Review sponsorship applications for your opportunities."
            : "Track your sponsorship applications and their status."}
        </p>

        {/* LOADING */}
        {loading && (
          <div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-2xl p-10 text-center">
            <div className="text-3xl mb-4">⏳</div>

            <h2 className="text-xl font-bold">
              Loading partnerships...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait while we load your sponsorship activity.
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && applications.length === 0 && (
          <div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-2xl p-10 md:p-14 text-center">
            <div className="text-5xl mb-5">
              🤝
            </div>

            <h2 className="text-2xl font-bold">
              No partnerships yet
            </h2>

            <p className="text-gray-400 mt-3 max-w-md mx-auto">
              {accountType === "organization"
                ? "Applications from brands will appear here when they apply to your sponsorship opportunities."
                : "Your sponsorship applications will appear here after you apply to an opportunity."}
            </p>

            {accountType === "brand" && (
              <Link
                href="/opportunities"
                className="inline-block mt-7 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition"
              >
                Find Opportunities →
              </Link>
            )}

            {accountType === "organization" && (
              <Link
                href="/create-opportunity"
                className="inline-block mt-7 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition"
              >
                Create Opportunity →
              </Link>
            )}
          </div>
        )}

        {/* APPLICATIONS */}
        {!loading && applications.length > 0 && (
          <div className="mt-10 space-y-5">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    {/* TITLE */}
                    <h2 className="text-xl font-bold">
                      {accountType === "organization"
                        ? getOpportunityTitle(
                            application.opportunity_id
                          )
                        : "Sponsorship Application"}
                    </h2>

                    {/* DATE */}
                    <p className="text-gray-500 text-sm mt-2">
                      Submitted{" "}
                      {new Date(
                        application.created_at
                      ).toLocaleDateString("en-IN")}
                    </p>

                    {/* AMOUNT */}
                    {application.proposed_amount !== null && (
                      <p className="text-blue-400 mt-4 font-semibold text-lg">
                        Proposed: ₹
                        {application.proposed_amount.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    )}

                    {/* MESSAGE */}
                    {application.message && (
                      <div className="mt-4 bg-black border border-zinc-800 rounded-xl p-4">
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {application.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize h-fit whitespace-nowrap ${
                      application.status === "accepted"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : application.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>

                {/* ORGANIZATION ACTIONS */}
                {accountType === "organization" &&
                  application.status === "pending" && (
                    <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-zinc-800">
                      <button
                        onClick={() =>
                          updateApplication(
                            application.id,
                            "accepted"
                          )
                        }
                        disabled={
                          updating === application.id
                        }
                        className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-xl font-semibold transition"
                      >
                        {updating === application.id
                          ? "Updating..."
                          : "✓ Accept"}
                      </button>

                      <button
                        onClick={() =>
                          updateApplication(
                            application.id,
                            "rejected"
                          )
                        }
                        disabled={
                          updating === application.id
                        }
                        className="border border-red-900 text-red-400 hover:border-red-500 hover:bg-red-500/5 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-xl font-semibold transition"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}