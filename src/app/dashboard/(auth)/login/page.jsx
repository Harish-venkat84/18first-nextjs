"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import createGoogleUser from "@/utils/createGoogleUsers";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userSession, setUserSession] = useState(true);

  const { data: session, status } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    if (status === "authenticated") {
      if (!JSON.parse(sessionStorage.getItem("userStatus"))) {
        createGoogleUser(session, status);
      }

      sessionStorage.setItem("userStatus", "true");
      setUserSession(JSON.parse(sessionStorage.getItem("userStatus")));
      router.push("/dashboard");
    }

    if (status === "unauthenticated") {
      sessionStorage.setItem("userStatus", "false");
      setUserSession(JSON.parse(sessionStorage.getItem("userStatus")));
      setLoading(false);
    }
  }, [status, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("google", {});
      sessionStorage.setItem("userStatus", "false");
      setUserSession(JSON.parse(sessionStorage.getItem("userStatus")));
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  if (status === "loading" || userSession) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button className={styles.google} onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? "Connecting..." : "Login with Google"}
      </button>
      <p className={styles.reister}>
        Click here to
        <span onClick={() => router.push("/dashboard/register")} style={{ color: "#53c28b", cursor: "pointer" }}>
          {" Register"}
        </span>
      </p>
    </div>
  );
}

export default Login;
