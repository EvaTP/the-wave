"use client";

import Link from "next/link";

export default function ButtonLink({ href, children, className = "" }) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        // style={{ backgroundColor: "var(--lagoon)" }}
        className={`${className} text-xl font-bold px-6 py-3 rounded-2xl shadow-sm transition`}
      >
        {children}
      </Link>
    </div>
  );
}
