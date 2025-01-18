import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    return undefined;
  }
}

async function Blog() {
  const data = await getData();

  console.log("============>", data);

  if (data === undefined) {
    return <h1>Data not found</h1>;
  }

  return (
    <div className={styles.mainContainer}>
      {data?.map((item) => (
        <Link href={`/blog/${item._id}`} className={styles.container} key={item._id}>
          <div className={styles.imgContainer}>
            <Image src={item.img} alt="blog image" width={400} height={250} className={styles.img} />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Blog;
