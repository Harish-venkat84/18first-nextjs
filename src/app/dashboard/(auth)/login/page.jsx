"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader, { Spinner } from "@/components/loader/Loader";
import createGoogleUser from "@/utils/createGoogleUsers";
import Image from "next/image";
import googleIcon from "@/../public/googleIcon.png";
import loginImage from "@/../public/loginImage.png";
import image1 from "@/../public/image1.png";
import image2 from "@/../public/image2.png";
import image3 from "@/../public/image3.png";
import image4 from "@/../public/contact1.png";
import image5 from "@/../public/hero1.png";
import image6 from "@/../public/illustration.png";
import { ThemeContext } from "@/context/ThemeContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [userSession, setUserSession] = useState(true);
  const { mode } = useContext(ThemeContext);

  const { data: session, status } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    if (status === "unauthenticated") {
      sessionStorage.setItem("userStatus", "false");
      setUserSession(JSON.parse(sessionStorage.getItem("userStatus")));
      setLoading(false);
    }

    if (status === "authenticated") {
      if (!JSON.parse(sessionStorage.getItem("userStatus"))) {
        createGoogleUser(session, status);
      }

      sessionStorage.setItem("userStatus", "true");
      setUserSession(JSON.parse(sessionStorage.getItem("userStatus")));
      router.push("/dashboard");
    }
  }, [status, userSession]);

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
    setGoogleLoader(true);
    setError("");
    try {
      await signIn("google", {});
      sessionStorage.setItem("userStatus", "true");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoader(false);
      setUserSession(JSON.parse(sessionStorage.getItem("userStatus")));
    }
  };

  if (status === "loading" || userSession) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageSlider}>
        <div className={styles.imageTrack}>
          <Image src={image1} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
          <Image src={image2} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
          <Image src={image3} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
          <Image src={image4} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
          <Image src={image5} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
          <Image src={image6} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
          <Image src={image1} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
          <Image src={image2} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
          <Image src={image3} alt="loginImage" width={200} height={200} className={styles.image1}></Image>
        </div>
      </div>
      <div className={styles.childContainer}>
        <Image src={loginImage} alt="loginImage" width={430} height={480} className={styles.loginImg}></Image>
        <h2 className={styles.title}>Welcome back</h2>
        <p className={styles.desc}>Please enter your details</p>
        <div className={styles.formBackground} style={{ backgroundColor: mode === "dark" ? "#111" : "#ffebeb", transition: "1.5s all ease" }}>
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
              {loading ? <Spinner /> : "Login"}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <button className={styles.google} onClick={handleGoogleSignIn} disabled={googleLoader}>
            <span>
              <Image src={googleIcon} alt="Contact" width={20} height={20} className={styles.googleIcon}></Image>
            </span>
            <span className={styles.googleText}>{googleLoader ? <Spinner /> : "Login with Google"}</span>
          </button>
          <p className={styles.reister}>
            Click here to
            <span onClick={() => router.push("/dashboard/register")} style={{ color: "#dc5656", cursor: "pointer" }}>
              {" Register"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
