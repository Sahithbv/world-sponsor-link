"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setError(
          "This password reset link is invalid or has expired. Please request a new one."
        );
      }

      setCheckingSession(false);
    }

    checkSession();
  }, []);

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Your password has been successfully updated!");

    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  if (checkingSession) {
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
        Checking reset link...
      </main>
    );
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
            Reset your password
          </h1>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            Choose a new password for your World Sponsor Link account.
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
          {error && (
            <div
              style={{
                background: "#2b0808",
                border: "1px solid #8b1e1e",
                color: "#ff4d4d",
                padding: "14px",
                borderRadius: "12px",
                marginBottom: "20px",
                lineHeight: "1.5",
              }}
            >
              {error}
            </div>
          )}

          {message ? (
            <div>
              <div
                style={{
                  background: "#071f12",
                  border: "1px solid #166534",
                  color: "#4ade80",
                  padding: "14px",
                  borderRadius: "12px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                {message}
              </div>

              <p
                style={{
                  textAlign: "center",
                  color: "#9ca3af",
                }}
              >
                Redirecting you to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              {/* NEW PASSWORD */}
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                New password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                minLength={6}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid #333",
                  background: "#000",
                  color: "white",
                  fontSize: "16px",
                  marginBottom: "22px",
                }}
              />

              {/* CONFIRM PASSWORD */}
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                Confirm new password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter your new password again"
                required
                minLength={6}
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
                {loading ? "Updating..." : "Update Password →"}
              </button>
            </form>
          )}

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