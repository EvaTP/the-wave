"use client";
import Image from "next/image";
import { useAuth } from "../../utils/useAuth";
import { fetchUsers } from "../../lib/fetchUsers";
import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import { useRouter } from "next/navigation";
import DemoBanner from "@/components/DemoBanner";

export default function AdminDashboard() {
  const { user, username, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // rediriger vers la page "login" si pas connecté
  useEffect(() => {
    if (loading) return; // Ne rien faire tant que useAuth n’a pas fini

    // Si PAS CONNECTÉ, redirection vers /login
    if (!user) {
      router.push("/login");
      return;
    }
    // rediriger vers la page "dashboard" si connecté mais pas admin, modérateur ou demo
    if (user && user.role?.role) {
      if (!["admin", "moderator", "demo"].includes(user.role.role)) {
        router.push("/dashboard");
      }
    }
  }, [loading, user, router]);
  // récupérer les users depuis le back-end
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError("Erreur lors du chargement des utilisateurs");
      } finally {
        setUsersLoading(false);
      }
    };
    loadUsers();
  }, []);

  // ✅ Effet pour marquer le composant comme prêt après l'hydratation
  useEffect(() => {
    setIsReady(true);
  }, []);

  // 🔴 évite un rendu prématuré (corrige les erreurs d'hydratation Next.js)
  if (!isReady) return null;

  return (
    <div className="p-8 text-center">
      <div className="flex text-center">
        <h1 className="font-lobster text-2xl text-center font-bold mt-8 mb-10">
          🏄‍♀️ 🏄‍♂️ Welcome to the Admin Dashboard
        </h1>
        <DemoBanner />
      </div>

      {/* USER INFO */}
      <div className="flex flex-col px-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-6 p-4">
            {/* USER PICTURE */}
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

            <div className="min-h-[3rem] flex items-center"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold italic">
              Hello {user?.firstname ? `${user.firstname}!` : ""}
            </h2>
          </div>
        </div>
      </div>

      {/* État de chargement / erreur */}
      {usersLoading && <p>Chargement des utilisateurs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Sections affichées uniquement si pas d'erreur et pas de chargement */}
      {!usersLoading && !error && (
        <div className="flex flex-col md:flex-col gap-12 items-center">
          {/* Section Admins & Modérateurs */}
          <section className="flex-1">
            <h2 className="font-bold mb-4">Staff members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users
                .filter((user) =>
                  ["admin", "moderator"].includes(user.role?.role)
                )
                .map((user) => (
                  <UserCard key={user.id} {...user} />
                ))}
            </div>
          </section>

          {/* Section Members */}
          <section className="flex-1">
            <h2 className="font-bold mb-4">Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users
                .filter((user) => user.role?.role === "user")
                .map((user) => (
                  <UserCard key={user.id} {...user} />
                ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
