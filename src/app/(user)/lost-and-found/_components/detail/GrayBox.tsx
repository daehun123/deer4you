"use client";

import React from "react";

export default function GrayBox({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 rounded ">{children}</div>;
}
