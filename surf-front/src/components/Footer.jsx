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
              sizes="20px"
              className="object-contain"
              priority
            />
          </div>

          {/* Liens */}
          <Link
            href="/about"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </Link>

          <Link
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>

          {/* Réseaux sociaux */}
          <div className="flex gap-4 items-center">
            <div className="w-[15px] h-[15px] relative flex-shrink-0">
              <Image
                src="/instagram.svg"
                alt="Instagram logo"
                fill
                sizes="15px"
                className="object-contain hover:opacity-80 transition-opacity cursor-pointer"
                priority
              />
            </div>

            <div className="w-[15px] h-[15px] relative flex-shrink-0">
              <Image
                src="/facebook.svg"
                alt="Facebook logo"
                fill
                sizes="15px"
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

// export default function Footer() {
//   return (
//     <footer
//       style={{
//         backgroundColor: "#1f406e", // color theme
//         borderTop: "1px solid #C2DFED", // bleu gris

//         padding: "1.5rem 1rem",
//         textAlign: "center",
//         fontSize: "0.875rem",
//         color: "FFFFF", // blanc
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "960px",
//           margin: "0 auto",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "2rem",
//             marginBottom: "0.5rem",
//             color: "#C2DFED",
//             fontWeight: "600",
//           }}
//         >
//           <Image
//             //className="dark:invert"
//             src="/logo-the-wave-white-bg-192.png"
//             alt="The Wave logo"
//             width={20}
//             height={20}
//             priority
//           />
//           <Link href="about">About</Link>
//           <Link href="#">Contact</Link>
//           <Image
//             src="/instagram.svg"
//             alt="Instagram logo"
//             width={15}
//             height={15}
//             priority
//           />
//           <Image
//             //className="dark:invert"
//             src="/facebook.svg"
//             alt="Facebook logo"
//             width={15}
//             height={15}
//             priority
//           />
//         </div>
//         <p style={{ color: "#C2DFED", fontSize: "1 rem" }}>
//           © {new Date().getFullYear()} | The Wave
//         </p>
//       </div>
//     </footer>
//   );
// }
