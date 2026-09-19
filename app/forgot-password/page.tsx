"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "If an account exists with this email, a password reset link has been sent."
    );

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "18px",
              background: "#6d00ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 25px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            W
          </div>

          <h1
            style={{
              fontSize: "42px",
              margin: "0 0 10px",
            }}
          >
            Forgot your password?
          </h1>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {/* CARD */}
        <div
          style={{
            background: "#090909",
            border: "1px solid #292929",
            borderRadius: "24px",
            padding: "35px",
          }}
        >
          <form onSubmit={handleReset}>
            {/* EMAIL */}
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "16px",
                borderRadius: "14px",
                border: "1px solid #333",
                background: "#000",
                color: "white",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            />

            {/* ERROR */}
            {error && (
              <div
                style={{
                  background: "#2b0808",
                  border: "1px solid #8b1e1e",
                  color: "#ff4d4d",
                  padding: "14px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {message && (
              <div
                style={{
                  background: "#071f12",
                  border: "1px solid #166534",
                  color: "#4ade80",
                  padding: "14px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  lineHeight: "1.5",
                }}
              >
                {message}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                border: "none",
                background: loading ? "#4b22a8" : "#6d00ff",
                color: "white",
                fontSize: "18px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending..." : "Send Reset Link →"}
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <Link
              href="/login"
              style={{
                color: "#9ca3af",
                textDecoration: "none",
              }}
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}