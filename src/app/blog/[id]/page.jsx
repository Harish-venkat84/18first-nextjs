import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

async function getData(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`);

    if (!res.ok) {
      return notFound();
    }

    return res.json();
  } catch (error) {
    return undefined;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getData(id);

  return {
    title: data.title,
    description: data.desc,
  };
}

async function BolgPost({ params }) {
  const { id } = await params;
  const data = await getData(id);

  if (data === undefined) {
    return <h1>Data not notFound</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.desc}</p>
          <div className={styles.author}>
            <Image src={data.img} alt="" width={40} height={40} className={styles.avatar} />
            <span className={styles.username}>{"User Name"}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={data.img} alt="" fill={true} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data.desc}</p>
      </div>
    </div>
  );
}

export default BolgPost;
