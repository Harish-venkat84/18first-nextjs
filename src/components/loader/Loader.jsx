import React from "react";
import { BeatLoader, PacmanLoader } from "react-spinners";
import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles.container}>
      <BeatLoader color="#53c28b" size={20} />
    </div>
  );
}

export default Loader;
