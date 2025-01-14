"use client";
import React from "react";
import style from "./TypingAnimation.module.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypingAnimation = ({ text, min_height = "100px" }) => {
  const [typeEffect] = useTypewriter({
    words: [...text],
    loop: true,
    deleteSpeed: 50,
    typeSpeed: 100,
  });
  return (
    <h1 className={style.container} style={{ minHeight: min_height }}>
      <span className={style.title}>{typeEffect}</span>
      <Cursor cursorStyle="_" cursorColor="inherit" cursorBlinking={false} />
    </h1>
  );
};

export default TypingAnimation;
