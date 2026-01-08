// "use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#C2DFED] to-[#1f406e]">
      {/* Section liens de navigation */}
      <div className="bg-[#C2DFED] py-6 min-h-[100px] flex items-center">
        <div className="max-w-[960px] mx-auto w-full px-4">
          <div className="flex justify-center md:justify-end gap-12 md:gap-20 text-black font-normal">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span>Map</span>
              {/* <Image
                src="/map.svg"
                alt="map icon"
                width={18}
                height={18}
                priority
              /> */}
              <img
                src="/map.svg"
                alt="map icon"
                width="18"
                height="18"
                loading="eager"
              />
            </Link>
            <Link
              href="/login"
              className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span>Login</span>
              {/* <Image
                src="/log-in.svg"
                alt="login icon"
                width={18}
                height={18}
                priority
              /> */}
              <img
                src="/log-in.svg"
                alt="login icon"
                width="18"
                height="18"
                loading="eager"
              />
            </Link>
            <Link
              href="/dashboard"
              className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span>My account</span>
              {/* <Image
                src="/circle-user-round.svg"
                alt="account icon"
                width={18}
                height={18}
                priority
              /> */}
              <img
                src="/circle-user-round.svg"
                alt="account icon"
                width="18"
                height="18"
                loading="eager"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Section informations et réseaux sociaux */}
      <div className="bg-[#1f406e] border-t border-[#C2DFED] py-6 min-h-[120px] flex items-center">
        <div className="max-w-4xl mx-auto w-full px-4">
          {/* Navigation et logos */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-4 text-[#C2DFED] font-semibold">
            {/* Logo The Wave */}
            <div className="w-6 h-6 relative flex-shrink-0">
              {/* <Image
                src="/logo-the-wave-white-bg-192.png"
                alt="The Wave logo"
                fill
                sizes="30px"
                className="object-contain"
                priority
              /> */}
              <img
                src="/logo-the-wave-white-bg-192.png"
                alt="The Wave logo"
                width="24"
                height="24"
                className="object-contain"
                loading="eager"
              />
            </div>

            {/* Lien About */}
            <Link
              href="/about"
              className="hover:text-white transition-colors duration-200 text-base md:text-lg"
            >
              About
            </Link>

            {/* Réseaux sociaux */}
            <div className="flex gap-4 items-center">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[18px] h-[18px] relative flex-shrink-0"
              >
                {/* <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  fill
                  sizes="20px"
                  className="object-contain hover:opacity-80 transition-opacity"
                  priority
                /> */}
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  width="18"
                  height="18"
                  className="object-contain hover:opacity-80 transition-opacity"
                  loading="eager"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[18px] h-[18px] relative flex-shrink-0"
              >
                {/* <Image
                  src="/facebook.svg"
                  alt="Facebook"
                  fill
                  sizes="20px"
                  className="object-contain hover:opacity-80 transition-opacity"
                  priority
                /> */}
                <img
                  src="/facebook.svg"
                  alt="Facebook"
                  width="18"
                  height="18"
                  className="object-contain hover:opacity-80 transition-opacity"
                  loading="eager"
                />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-[#C2DFED] text-sm md:text-base text-center">
            © {new Date().getFullYear()} | The Wave
          </p>
        </div>
      </div>
    </footer>
  );
}
