import Image from "next/image";
import styles from "./page.module.css";
import Hero from "../../public/hero.png";
import TypingAnimation from "@/components/typeAnimation/TypingAnimation";
import Button from "@/components/buttons/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {/* <h1 className={styles.title}>Better design for your digital products.</h1> */}
        <TypingAnimation text={["Better design for your digital products."]} min_height="261px" />
        <p className={styles.desc}>Turning your Idea into Reality. We bring together the teams from the global tech industry.</p>
        <Button url="/portfolio" text="See Our Works" />
      </div>
      <div className={styles.item}>
        <Image src={Hero} alt="" className={styles.img}></Image>
      </div>
    </div>
  );
}
