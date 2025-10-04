"use client";

import React from "react";

export default function Button({
  children,
  className = "",
  isLoading = false,
  type = "button",
  onClick,
}) {
  return (
    <div className="flex justify-center">
      <button
        type={type}
        onClick={onClick}
        style={{ backgroundColor: "var(--theme)" }}
        className={`hover:bg-blue-700 text-white text-xl font-bold px-6 py-3 rounded-2xl shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : children}
      </button>
    </div>
  );
}
