"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import DarkModeToogle from "../darkModeToggle/DarkModeToogle";
import { ThemeContext } from "@/context/ThemeContext";
import { signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Bolg",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

function Navbar() {
  const { routePath, setRoutePath } = useContext(ThemeContext);
  const session = useSession();

  useEffect(() => {
    setRoutePath(localStorage.getItem("routePath") || "/");
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Lamamia
      </Link>
      <div className={styles.links}>
        <DarkModeToogle />
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className={styles.link}
            style={routePath === link.url ? { color: "#53c28b", opacity: "1" } : { opacity: "0.7" }}
            onClick={() => {
              setRoutePath(link.url);
              localStorage.setItem("routePath", link.url);
            }}
          >
            {link.title}
          </Link>
        ))}

        {session.status === "authenticated" && (
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
