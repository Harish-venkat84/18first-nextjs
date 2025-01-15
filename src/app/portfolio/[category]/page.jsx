import React from "react";
import styles from "./page.module.css";
import Button from "@/components/buttons/Button";
import Image from "next/image";
import { items } from "./data.js";
import { notFound } from "next/navigation";

const getData = (category) => {
  const data = items[category];

  if (data) {
    return data;
  }

  return notFound();
};

export async function generateMetadata({ params }) {
  const { category } = await params;
  return {
    title: category,
    description: "category pages",
  };
}

async function Category({ params }) {
  const { category } = await params;
  const data = getData(category);

  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{category}</h1>
      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button url="#" text="See More" />
          </div>
          <div className={styles.imgContainer}>
            <Image className={styles.img} src={item.image} alt="" fill={true} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;
