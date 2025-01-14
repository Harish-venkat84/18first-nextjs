import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import aboutImage from "../../../public/about.jpg";
import Button from "@/components/buttons/Button";

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={aboutImage} fill={true} alt="About" className={styles.img} />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Digital Storytellers</h1>
          <h2 className={styles.imgDesc}>Handcrafting award winning digital experiences</h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h2 className={styles.title}>Who Are We?</h2>
          <p className={styles.desc}>
            We are a team of digital storytellers who are passionate about creating beautiful and engaging digital experiences. We have been crafting
            award winning websites, apps and digital marketing campaigns since 2010.
            <br />
            <br />
            Our team is made up of talented designers, developers, marketers and project managers who work together to create exceptional digital
            experiences for our clients.
          </p>
        </div>
        <div className={styles.item}>
          <h2 className={styles.title}>What We Do?</h2>
          <p className={styles.desc}>
            We offer a range of services to help our clients achieve their digital goals. Our services include website design and development, app
            development, digital marketing, branding and more.
            <br />
            <br />
            We work with clients of all sizes, from startups to large corporations, and we are committed to delivering high quality work that exceeds
            our clients' expectations.
          </p>
          <Button url="/contact" text="Contact" />
        </div>
      </div>
    </div>
  );
}

export default About;
