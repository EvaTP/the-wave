"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../utils/useAuth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, handleLogin, handleLogout } = useAuth();

  const isAdmin =
    user?.role?.role === "admin" || user?.role?.role === "moderator";

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo & titre */}
          <div className="flex items-center space-x-2">
            <Image
              className="dark:invert"
              src="/logo-the-wave-192.png"
              alt="The Wave logo"
              width={40}
              height={40}
              priority
            />
            <div className="text-xl font-extrabold text-[#1f406e] tracking-tight">
              <Link href="/">The Wave</Link>
            </div>
          </div>

          {/* Burger menu (mobile) */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Image src="/menu.svg" alt="menu icon" width={24} height={24} />
          </button>

          {/* Liens desktop */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium ml-auto">
            {/* condition ternaire */}
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="flex items-center space-x-2">
                  <Image
                    src="/log-in.svg"
                    alt="login icon"
                    width={20}
                    height={20}
                  />
                  <span>Log in</span>
                </Link>
                <Link href="/signup" className="flex items-center space-x-2">
                  <Image
                    src="/user-round-plus.svg"
                    alt="signup icon"
                    width={20}
                    height={20}
                  />
                  <span>Sign up</span>
                </Link>
              </>
            ) : (
              <>
                {/* ✅ Lien Admin visible seulement si admin ou moderator */}
                {isAdmin && (
                  <>
                    <Link href="/admin" className="flex items-center space-x-2">
                      <Image
                        src="/user-star.svg"
                        alt="admin page icon"
                        width={20}
                        height={20}
                      />
                      <span>Admin</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2"
                    >
                      <Image
                        src="/circle-user-round.svg"
                        alt="acccount icon"
                        width={20}
                        height={20}
                      />
                      <span>My account</span>
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <Image
                    src="/log-out.svg"
                    alt="logout icon"
                    width={20}
                    height={20}
                  />
                  <span>Log out</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Liens mobile */}
        {menuOpen && (
          <div className="flex flex-col items-end space-y-4 mt-4 text-gray-700 font-medium md:hidden ml-auto">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="flex justify-end space-x-2">
                  <Image
                    src="/log-in.svg"
                    alt="login icon"
                    width={20}
                    height={20}
                  />
                  <span>Login</span>
                </Link>
                <Link href="/signup" className="flex justify-end space-x-2">
                  <Image
                    src="/user-round-plus.svg"
                    alt="signup icon"
                    width={20}
                    height={20}
                  />
                  <span>Sign up</span>
                </Link>
              </>
            ) : (
              <>
                {/* ✅ Lien Admin visible seulement si admin ou moderator */}
                {isAdmin && (
                  <>
                    <Link href="/admin" className="flex items-center space-x-2">
                      <Image
                        src="/user-star.svg"
                        alt="admin page icon"
                        width={20}
                        height={20}
                      />
                      <span>Admin</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2"
                    >
                      <Image
                        src="/circle-user-round.svg"
                        alt="acccount icon"
                        width={20}
                        height={20}
                      />
                      <span>My account</span>
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <Image
                    src="/log-out.svg"
                    alt="logout icon"
                    width={20}
                    height={20}
                  />
                  <span>Log out</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
