import React from "react";
import style from "./footer.module.css";
import Image from "next/image";

function Footer() {
  return (
    <div className={style.container}>
      <div>&copy; 2025 Lamamia. All right reserved.</div>
      <div className={style.social}>
        <Image src="/1.png" width={15} height={15} className={style.icon} alt=""></Image>
        <Image src="/2.png" width={15} height={15} className={style.icon} alt=""></Image>
        <Image src="/3.png" width={15} height={15} className={style.icon} alt=""></Image>
        <Image src="/4.png" width={15} height={15} className={style.icon} alt=""></Image>
      </div>
    </div>
  );
}

export default Footer;
