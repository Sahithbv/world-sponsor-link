"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
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
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
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

          <h1 style={{ fontSize: "42px", margin: "0 0 10px" }}>
            Welcome back
          </h1>

          <p style={{ color: "#9ca3af", fontSize: "18px" }}>
            Sign in to your World Sponsor Link account.
          </p>
        </div>

        <div
          style={{
            background: "#090909",
            border: "1px solid #292929",
            borderRadius: "24px",
            padding: "35px",
          }}
        >
          <form onSubmit={handleLogin}>
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
                marginBottom: "24px",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
                marginBottom: "24px",
              }}
            />

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
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: "28px",
              color: "#9ca3af",
            }}
          >
            Don't have an account?{" "}
            <Link
              href="/signup"
              style={{
                color: "#7c4dff",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Create one
            </Link>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#9ca3af",
                textDecoration: "none",
              }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}