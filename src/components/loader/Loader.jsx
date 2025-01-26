import React from "react";
import { BeatLoader, ClipLoader, PacmanLoader } from "react-spinners";
import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles.container}>
      <BeatLoader color="#dc5656" size={20} />
    </div>
  );
}

function Spinner() {
  return (
    <div className={styles.container}>
      <ClipLoader color="white" size={20} />
    </div>
  );
}

export default Loader;

export { Spinner };
