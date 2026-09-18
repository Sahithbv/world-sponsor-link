"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

type Opportunity = {
  id: string;
  organization_id: string;
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
  status: string;
};

export default function OpportunityPage() {
  const params = useParams();
  const router = useRouter();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOpportunity() {
      const id = params.id;

      if (!id || typeof id !== "string") {
        setError("Invalid opportunity.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .eq("id", id)
        .eq("status", "active")
        .single();

      if (error) {
        console.error(error);
        setError("Opportunity not found.");
      } else {
        setOpportunity(data);
      }

      setLoading(false);
    }

    loadOpportunity();
  }, [params.id]);

  function formatMoney(amount: number | null) {
    if (amount === null) return "Not specified";

    return `₹${amount.toLocaleString("en-IN")}`;
  }

  function formatDate(date: string | null) {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#050505",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1>Loading opportunity...</h1>
      </main>
    );
  }

  if (error || !opportunity) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#050505",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "15px" }}>
          Opportunity not found
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: "30px" }}>
          This opportunity may have been removed or closed.
        </p>

        <Link
          href="/opportunities"
          style={{
            display: "inline-block",
            background: "#6d00ff",
            color: "white",
            padding: "14px 24px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          ← Back to opportunities
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          borderBottom: "1px solid #222",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "800",
          }}
        >
          WSL
        </Link>

        <Link
          href="/opportunities"
          style={{
            color: "#9ca3af",
            textDecoration: "none",
          }}
        >
          ← All Opportunities
        </Link>
      </nav>

      {/* Main content */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        {/* Category */}
        <div
          style={{
            display: "inline-block",
            background: "#17112e",
            border: "1px solid #6d00ff",
            color: "#a78bfa",
            padding: "8px 14px",
            borderRadius: "999px",
            marginBottom: "20px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {opportunity.category}
        </div>

        <h1
          style={{
            fontSize: "48px",
            lineHeight: "1.1",
            marginBottom: "20px",
          }}
        >
          {opportunity.title}
        </h1>

        {opportunity.location && (
          <p
            style={{
              color: "#9ca3af",
              fontSize: "18px",
              marginBottom: "40px",
            }}
          >
            📍 {opportunity.location}
          </p>
        )}

        {/* Information cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "45px",
          }}
        >
          <InfoCard
            title="Sponsorship"
            value={`${formatMoney(
              opportunity.sponsorship_min
            )} - ${formatMoney(opportunity.sponsorship_max)}`}
          />

          <InfoCard
            title="Expected Audience"
            value={
              opportunity.expected_audience
                ? `${opportunity.expected_audience.toLocaleString(
                    "en-IN"
                  )} people`
                : "Not specified"
            }
          />

          <InfoCard
            title="Event Date"
            value={formatDate(opportunity.event_date)}
          />

          <InfoCard
            title="Application Deadline"
            value={formatDate(opportunity.deadline)}
          />
        </div>

        {/* Description */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>
            About this opportunity
          </h2>

          <p
            style={{
              color: "#c4c4c4",
              fontSize: "17px",
              lineHeight: "1.8",
              whiteSpace: "pre-wrap",
            }}
          >
            {opportunity.description}
          </p>
        </section>

        {/* Benefits */}
        {opportunity.benefits && (
          <section style={{ marginBottom: "45px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>
              Sponsorship benefits
            </h2>

            <p
              style={{
                color: "#c4c4c4",
                fontSize: "17px",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              {opportunity.benefits}
            </p>
          </section>
        )}

        {/* Apply button */}
        <div
          style={{
            background: "#0d0818",
            border: "1px solid #34205c",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>
            Interested in sponsoring this opportunity?
          </h2>

          <p style={{ color: "#9ca3af", marginBottom: "25px" }}>
            Submit an application and connect with the organization.
          </p>

          <button
            onClick={() => router.push(`/opportunities/${opportunity.id}/apply`)}
            style={{
              background: "#6d00ff",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "16px 30px",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Apply for Sponsorship →
          </button>
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#090909",
        border: "1px solid #292929",
        borderRadius: "16px",
        padding: "22px",
      }}
    >
      <p
        style={{
          color: "#8b8b8b",
          fontSize: "14px",
          marginBottom: "8px",
        }}
      >
        {title}
      </p>

      <p
        style={{
          fontSize: "18px",
          fontWeight: "700",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}