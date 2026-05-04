"use client";

import React, { useEffect, useState } from "react";

export function TimeDisplay() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-mono text-sm tracking-widest text-neutral-400">
      {time} IST
    </div>
  );
}
