"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";

type Opportunity = {
  id: string;
  title: string;
  category: string;
  location: string | null;
  sponsorship_min: number | null;
  sponsorship_max: number | null;
};

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        .select(
          "id, title, category, location, sponsorship_min, sponsorship_max"
        )
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    // Check if user is logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please log in before applying.");
      setSubmitting(false);
      return;
    }

    // Check that the user is a brand
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("account_type")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      setError("Your profile could not be found.");
      setSubmitting(false);
      return;
    }

    if (profile.account_type !== "brand") {
      setError(
        "Only brand accounts can apply for sponsorship opportunities."
      );
      setSubmitting(false);
      return;
    }

    if (!opportunity) {
      setError("Opportunity not found.");
      setSubmitting(false);
      return;
    }

    // Check for an existing application
    const { data: existingApplication } = await supabase
      .from("applications")
      .select("id")
      .eq("opportunity_id", opportunity.id)
      .eq("brand_id", user.id)
      .maybeSingle();

    if (existingApplication) {
      setError("You have already applied to this opportunity.");
      setSubmitting(false);
      return;
    }

    // Create application
    const { error: applicationError } = await supabase
      .from("applications")
      .insert({
        opportunity_id: opportunity.id,
        brand_id: user.id,
        message: message.trim(),
        proposed_amount: amount ? Number(amount) : null,
        status: "pending",
      });

    if (applicationError) {
      console.error(applicationError);
      setError(applicationError.message);
      setSubmitting(false);
      return;
    }

    setSuccess("Application submitted successfully! 🎉");
    setMessage("");
    setAmount("");
    setSubmitting(false);
  }

  function formatMoney(amount: number | null) {
    if (amount === null) return "Negotiable";

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
        }}
      >
        <h1>Loading...</h1>
      </main>
    );
  }

  if (error && !opportunity) {
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
        <h1>Opportunity not found</h1>

        <Link
          href="/opportunities"
          style={{
            display: "inline-block",
            marginTop: "25px",
            color: "#60a5fa",
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
          href={`/opportunities/${opportunity?.id}`}
          style={{
            color: "#9ca3af",
            textDecoration: "none",
          }}
        >
          ← Back to Opportunity
        </Link>
      </nav>

      {/* Application */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <p
          style={{
            color: "#3b82f6",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          SPONSORSHIP APPLICATION
        </p>

        <h1
          style={{
            fontSize: "42px",
            lineHeight: "1.1",
            marginBottom: "15px",
          }}
        >
          Apply for Sponsorship
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "17px",
            marginBottom: "35px",
          }}
        >
          Submit your proposal to the organization.
        </p>

        {/* Opportunity summary */}
        <div
          style={{
            background: "#0b0b0b",
            border: "1px solid #292929",
            borderRadius: "18px",
            padding: "24px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              color: "#60a5fa",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            {opportunity?.category}
          </div>

          <h2
            style={{
              fontSize: "24px",
              marginBottom: "12px",
            }}
          >
            {opportunity?.title}
          </h2>

          {opportunity?.location && (
            <p
              style={{
                color: "#9ca3af",
                marginBottom: "8px",
              }}
            >
              📍 {opportunity.location}
            </p>
          )}

          <p style={{ color: "#c4c4c4" }}>
            Sponsorship range:{" "}
            <strong>
              {formatMoney(opportunity?.sponsorship_min ?? null)} -{" "}
              {formatMoney(opportunity?.sponsorship_max ?? null)}
            </strong>
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#090909",
            border: "1px solid #292929",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Proposed Sponsorship Amount
          </label>

          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Example: 50000"
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#000",
              color: "white",
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "15px",
              fontSize: "16px",
              marginBottom: "25px",
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Message / Proposal
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell the organization about your brand and why you are interested in sponsoring this opportunity..."
            rows={7}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#000",
              color: "white",
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "15px",
              fontSize: "16px",
              resize: "vertical",
              marginBottom: "20px",
            }}
          />

          {error && (
            <div
              style={{
                background: "#2b0808",
                border: "1px solid #8b1e1e",
                color: "#ff6b6b",
                padding: "14px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                background: "#082b14",
                border: "1px solid #176b35",
                color: "#5ee890",
                padding: "14px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !!success}
            style={{
              width: "100%",
              background:
                submitting || success ? "#3f3f46" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "17px",
              fontWeight: "700",
              cursor:
                submitting || success ? "not-allowed" : "pointer",
            }}
          >
            {submitting
              ? "Submitting..."
              : success
              ? "Application Submitted ✓"
              : "Submit Application →"}
          </button>
        </form>
      </div>
    </main>
  );
}