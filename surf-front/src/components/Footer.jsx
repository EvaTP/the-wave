"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1f406e] border-t border-[#C2DFED] p-6 text-center text-sm text-white min-h-[120px] flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Navigation et logos */}
        <div className="flex justify-center items-center gap-8 mb-2 text-[#C2DFED] font-semibold">
          {/* Logo The Wave */}
          <div className="w-5 h-5 relative flex-shrink-0">
            <Image
              src="/logo-the-wave-white-bg-192.png"
              alt="The Wave logo"
              fill
              sizes="30px"
              className="object-contain"
              priority
            />
          </div>

          {/* Liens */}
          <Link
            href="/about"
            className="hover:text-white transition-colors duration-200 text-lg"
          >
            About
          </Link>

          {/* <Link
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </Link> */}

          {/* Réseaux sociaux */}
          <div className="flex gap-4 items-center">
            <div className="w-[15px] h-[15px] relative flex-shrink-0">
              <Image
                src="/instagram.svg"
                alt="Instagram logo"
                fill
                sizes="20px"
                className="object-contain hover:opacity-80 transition-opacity cursor-pointer"
                priority
              />
            </div>

            <div className="w-[15px] h-[15px] relative flex-shrink-0">
              <Image
                src="/facebook.svg"
                alt="Facebook logo"
                fill
                sizes="20px"
                className="object-contain hover:opacity-80 transition-opacity cursor-pointer"
                priority
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[#C2DFED] text-base">
          © {new Date().getFullYear()} | The Wave
        </p>
      </div>
    </footer>
  );
}
