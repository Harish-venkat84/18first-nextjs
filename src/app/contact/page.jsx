import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import contactImg from "../../../public/contact.png";
import Button from "@/components/buttons/Button";

function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image src={contactImg} alt="Contact" fill={true} className={styles.image}></Image>
        </div>
        <form className={styles.form}>
          <input type="text" placeholder="name" className={styles.input} />
          <input type="text" placeholder="email" className={styles.input} />
          <textarea className={styles.textArea} placeholder="message" cols="30" rows="10"></textarea>
          <Button url={"#"} text={"Send"}></Button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
