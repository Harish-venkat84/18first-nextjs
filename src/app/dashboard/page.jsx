"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      setData(await res.json());
    };
  }, []);

  return <div className={styles.container}>Dashboard</div>;
}

export default Dashboard;
