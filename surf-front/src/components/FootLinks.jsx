"use client";

import Image from "next/image";
import Link from "next/link";

export default function FootLinks() {
  return (
    <div className="w-full bg-[#C2DFED] py-4">
      <div className="max-w-[960px] mx-auto flex justify-end gap-20 text-black font-normal mr-4">
        <div className="flex flex-col items-center">
          <Link href="/">Map</Link>
          <Image
            src="/map.svg"
            alt="map icon"
            width={18}
            height={18}
            priority
          />
        </div>

        <div className="flex flex-col items-center">
          <Link href="/login">Login</Link>
          <Image
            src="/log-in.svg"
            alt="login icon"
            width={18}
            height={18}
            priority
          />
        </div>

        <div className="flex flex-col items-center">
          <Link href="/dashboard">My account</Link>
          <Image
            src="/circle-user-round.svg"
            alt="account icon"
            width={18}
            height={18}
            priority
          />
        </div>
      </div>
    </div>
  );
}
