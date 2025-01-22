"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Loader, { Spinner } from "@/components/loader/Loader";

function Register() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target[0].value.trim();
    const email = e.target[1].value.trim();
    const password = e.target[2].value.trim();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      // res.status === 201 && router.push("/dashboard");
    } catch (error) {
      setError(true);
      console.log(error);
    }

    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="username" className={styles.input} required />
        <input type="email" placeholder="email" className={styles.input} required />
        <input type="password" placeholder="password" className={styles.input} required />
        <button className={styles.button}>{loading ? <Spinner /> : "Register"}</button>
      </form>
      {error && "something went wrong!"}
      <Link href="/dashboard/login">
        <span style={{ color: "#53c28b", textDecorationLine: "underline" }}>Login</span>
        {" with an existing account"}
      </Link>
    </div>
  );
}

export default Register;
