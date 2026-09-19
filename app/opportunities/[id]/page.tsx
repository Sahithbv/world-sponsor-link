"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

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
  status: string;
};

export default function OpportunityDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOpportunity() {
      const id = params.id as string;

      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .eq("id", id)
        .eq("status", "active")
        .single();

      if (error) {
        console.error(error);
        setError("Opportunity not found.");
        setLoading(false);
        return;
      }

      setOpportunity(data);
      setLoading(false);
    }

    loadOpportunity();
  }, [params.id]);

  function formatDate(date: string | null) {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatAmount(amount: number | null) {
    if (amount === null) return "Not specified";

    return `₹${amount.toLocaleString("en-IN")}`;
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#050505",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        Loading opportunity...
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
        <h1 style={{ fontSize: "40px", marginBottom: "15px" }}>
          Opportunity Not Found
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: "30px" }}>
          This opportunity may have been removed or closed.
        </p>

        <Link
          href="/opportunities"
          style={{
            display: "inline-block",
            padding: "14px 22px",
            background: "#6d00ff",
            color: "white",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          ← Back to Opportunities
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
      {/* NAVBAR */}
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
            fontSize: "24px",
            fontWeight: "800",
          }}
        >
          WSL
        </Link>

        <Link
          href="/opportunities"
          style={{
            color: "#aaa",
            textDecoration: "none",
          }}
        >
          ← Back to Opportunities
        </Link>
      </nav>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        {/* CATEGORY */}
        <div
          style={{
            display: "inline-block",
            background: "#16002f",
            color: "#a855f7",
            border: "1px solid #6d00ff",
            padding: "8px 14px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          {opportunity.category}
        </div>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "48px",
            lineHeight: "1.1",
            margin: "0 0 20px",
          }}
        >
          {opportunity.title}
        </h1>

        {/* LOCATION */}
        <p
          style={{
            color: "#aaa",
            fontSize: "18px",
            marginBottom: "40px",
          }}
        >
          📍 {opportunity.location || "Location not specified"}
        </p>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "25px",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              background: "#090909",
              border: "1px solid #292929",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>
              About the Opportunity
            </h2>

            <p
              style={{
                color: "#c4c4c4",
                lineHeight: "1.8",
                fontSize: "16px",
                whiteSpace: "pre-wrap",
              }}
            >
              {opportunity.description}
            </p>

            <h2
              style={{
                fontSize: "24px",
                marginTop: "35px",
                marginBottom: "15px",
              }}
            >
              Sponsorship Benefits
            </h2>

            <p
              style={{
                color: "#c4c4c4",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              {opportunity.benefits || "Benefits have not been specified yet."}
            </p>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* SPONSORSHIP */}
            <div
              style={{
                background: "#090909",
                border: "1px solid #292929",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <p style={{ color: "#888", marginBottom: "8px" }}>
                Sponsorship Range
              </p>

              <h2
                style={{
                  fontSize: "25px",
                  margin: 0,
                  color: "#a855f7",
                }}
              >
                {formatAmount(opportunity.sponsorship_min)}
                {" – "}
                {formatAmount(opportunity.sponsorship_max)}
              </h2>
            </div>

            {/* AUDIENCE */}
            <div
              style={{
                background: "#090909",
                border: "1px solid #292929",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <p style={{ color: "#888", marginBottom: "8px" }}>
                Expected Audience
              </p>

              <h2 style={{ fontSize: "25px", margin: 0 }}>
                {opportunity.expected_audience
                  ? opportunity.expected_audience.toLocaleString("en-IN")
                  : "Not specified"}
              </h2>
            </div>

            {/* EVENT DATE */}
            <div
              style={{
                background: "#090909",
                border: "1px solid #292929",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <p style={{ color: "#888", marginBottom: "8px" }}>
                Event Date
              </p>

              <h3 style={{ fontSize: "20px", margin: 0 }}>
                {formatDate(opportunity.event_date)}
              </h3>
            </div>

            {/* DEADLINE */}
            <div
              style={{
                background: "#090909",
                border: "1px solid #292929",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <p style={{ color: "#888", marginBottom: "8px" }}>
                Application Deadline
              </p>

              <h3 style={{ fontSize: "20px", margin: 0 }}>
                {formatDate(opportunity.deadline)}
              </h3>
            </div>

            {/* APPLY */}
            <button
              onClick={() =>
                router.push(`/opportunities/${opportunity.id}/apply`)
              }
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "14px",
                border: "none",
                background: "#6d00ff",
                color: "white",
                fontSize: "18px",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              Apply for Sponsorship →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}