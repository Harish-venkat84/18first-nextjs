import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const res = await fetch("/api/posts");

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

async function Blog() {
  const data = await getData();

  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
        <Link href={`/blog/${item._id}`} className={styles.container} key={item._id}>
          <div className={styles.imgContainer}>
            <Image src={item.img} alt="blog image" width={400} height={250} className={styles.img} />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title.length > 100 ? `${item.title.substring(0, 90)}....` : item.title}</h1>
            <p className={styles.desc}>{item.desc.length > 100 ? `${item.desc.substring(0, 300)}....` : item.desc}</p>
          </div>
        </Link>
      ))}
      {/* src="https://images.pexels.com/photos/53581/bald-eagles-bald-eagle-bird-of-prey-adler-53581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            src="https://images.pexels.com/photos/86596/owl-bird-eyes-eagle-owl-86596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" */}
    </div>
  );
}

export default Blog;
