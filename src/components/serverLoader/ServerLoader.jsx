"use client";

import React, { useState } from "react";

function ServerLoader() {
  const [loading, setLaoding] = useState(false);

  return <div onClick={() => setLaoding(true)}></div>;
}

export default ServerLoader;
export { loading, setLaoding };
