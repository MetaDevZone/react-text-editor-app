import React from "react";

export default function FindReplaceIcon({ width = 16, height = 16 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="6.5" />
      <path d="M15 15l5.5 5.5" />
      <path d="M7 10h6" />
      <path d="M10 7v6" />
    </svg>
  );
}
