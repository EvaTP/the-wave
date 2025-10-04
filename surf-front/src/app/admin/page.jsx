"use client";
import Image from "next/image";
import { useAuth } from "../../utils/useAuth";
import { fetchUsers } from "../../lib/fetchUsers";
import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, username } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // rediriger si pas admin ou modérateur
  useEffect(() => {
    if (user && user.role?.role) {
      if (!["admin", "moderator"].includes(user.role.role)) {
        router.push("/dashboard"); // redirection vers dashboard classique
      }
    }
  }, [user, router]);

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
        setLoading(false);
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
          🏄‍♀️ 🏄‍♂️ Welcome to Admin Dashboard
        </h1>
      </div>

      {/* USER INFO */}
      <div className="flex flex-col px-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-6 p-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold italic">
              Hello {user?.firstname ? `${user.firstname}!` : ""}
            </h2>
          </div>
        </div>
      </div>

      {/* État de chargement / erreur */}
      {loading && <p>Chargement des utilisateurs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Sections affichées uniquement si pas d'erreur et pas de chargement */}
      {!loading && !error && (
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
