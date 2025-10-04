"use client";
import Image from "next/image";
import { useAuth } from "../../utils/useAuth";
import LikedSpots from "../../components/LikedSpots";

export default function Dashboard() {
  const { user, username, isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>Please log in</p>;

  return (
    <div className="p-8">
      <div className="flex text-center">
        <h1 className="font-lobster text-2xl font-bold mt-8 mb-10">
          🏄‍♂️ My Dashboard
        </h1>
      </div>

      {/* USER INFO */}
      <div className="flex flex-col px-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-6 p-4">
            {/* <div className="relative w-24 sm:w-32 md:w-40 h-auto rounded-full overflow-hidden border-2 border-sky-600"> */}
            <div className="w-[100px] h-[140px] relative">
              <Image
                className="rounded-[50%] object-cover border-2 border-cyan-700"
                src={user?.url_userpicture || "/thewave.png"}
                alt="User Picture"
                fill
                sizes="100px"
                // width={100}
                // height={140}
                priority
              />
            </div>

            {/* Container avec hauteur minimale pour éviter le shift du texte */}
            <div className="min-h-[3rem] flex items-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold italic">
                Hello {user?.firstname ? `${user.firstname}!` : ""}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ❤️ Spots likés */}
      <div className="max-w-6xl mx-auto p-4">
        <LikedSpots user={user} />
      </div>
    </div>
  );
}
