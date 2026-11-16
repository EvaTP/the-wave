"use client";
import Image from "next/image";
import { useAuth } from "../../utils/useAuth";
import { fetchUsers } from "../../lib/fetchUsers";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/components/UserCard";
import UserForm from "@/components/UserForm";
import SpotForm from "@/components/SpotForm";
import DemoBanner from "@/components/DemoBanner";
import Button from "@/components/Button";
import CreateUserModal from "@/components/CreateUserModal";

export default function AdminDashboard() {
  const { user, username, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const formRef = useRef(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateSpotModalOpen, setIsCreateSpotModalOpen] = useState(false);

  // état pour l’édition de l'utilisateur
  const [editingUser, setEditingUser] = useState(null);

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

  // effet pour scroller vers le formulaire d'édition quand editingUser change
  useEffect(() => {
    if (editingUser && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [editingUser]);

  // ✅ Effet pour marquer le composant comme prêt après l'hydratation Next.js
  useEffect(() => {
    setIsReady(true);
  }, []);

  // 🔴 évite un rendu prématuré (corrige les erreurs d'hydratation Next.js)
  if (!isReady) return null;

  // supprimer un user
  const handleDelete = async (userId) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        alert("Erreur lors de la suppression");
        return;
      }
      // Mettre à jour la liste des users dans l'état local
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
      alert("Erreur, impossible de supprimer l'utilisateur");
    }
  };

  // activer le mode édition
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Callback après succès dans UserForm
  const handleFormSuccess = async (updatedUser) => {
    try {
      // Récupérer le user complet depuis l'API (avec role)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${updatedUser.id}`,
      );
      if (!res.ok) throw new Error("Impossible de récupérer le user");

      const fullUser = await res.json();

      // Mettre à jour la liste locale
      setUsers((prev) =>
        prev.map((u) => (u.id === fullUser.id ? fullUser : u)),
      );
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour de l'utilisateur");
    } finally {
      setEditingUser(null); // fermer le formulaire
      setIsCreateUserModalOpen(false); // fermer la modale si création
    }
  };

  return (
    <div className="p-8 text-center">
      <div className="flex text-center">
        <h1 className="font-lobster text-2xl text-center font-bold mt-8 mb-10">
          🏄‍♀️ 🏄‍♂️ Welcome to the Admin Dashboard
        </h1>
        <DemoBanner />
      </div>
      <div className="flex flex-col px-10">
        {/* BLOC Hello User */}
        {/* photo user + texte */}
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
                priority
              />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold italic">
              Hello {user?.firstname ? `${user.firstname}!` : ""}
            </h2>
          </div>
        </div>
      </div>

      {/* === LAYOUT EN 2 COLONNES === */}
      {/* BLOC Boutons + affichage UserCards */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        {/* ────────────── COLONNE GAUCHE ────────────── */}
        <div className="w-full md:w-60 flex flex-col gap-4 mt-16 ml-8">
          <div className="w-50 mb-8">
            {/* Bouton pour ouvrir la modale de création */}
            <Button onClick={() => setIsCreateUserModalOpen(true)}>
              Create a new member
            </Button>
          </div>
          <br />

          <div className="w-50">
            <Button onClick={() => setIsCreateSpotModalOpen(true)}>
              Create a new spot
            </Button>
          </div>
        </div>

        {/* ────────────── COLONNE DROITE (LARGE) ────────────── */}
        <div className="flex-1">
          {/* État de chargement / erreur */}
          {usersLoading && <p>Chargement des utilisateurs...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* DISPLAY USERS : sections affichées uniquement si pas d'erreur et pas de chargement */}
          {!usersLoading && !error && (
            <div className="flex flex-col md:flex-col gap-12 items-center">
              {/* Section Admins & Modérateurs */}
              <section className="flex-1">
                <h2 className="font-bold mb-4">Staff members</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users
                    .filter((user) =>
                      ["admin", "moderator"].includes(user.role?.role),
                    )
                    .map((user) => (
                      <UserCard
                        key={user.id}
                        {...user}
                        onEdit={() => setEditingUser(user)}
                        onDelete={() => handleDelete(user.id)}
                      />
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
                      <UserCard
                        key={user.id}
                        {...user}
                        // nouveau pour page admin avec callbacks :
                        onEdit={() => handleEdit(user)}
                        onDelete={() => handleDelete(user.id)}
                      />
                    ))}
                </div>
              </section>

              {/* FORMULAIRE (édition uniquement) */}
              {editingUser && (
                <div className="max-w-xl mx-auto my-10">
                  <h2 className="text-xl font-semibold mb-4">
                    Modifier {editingUser.firstname}
                  </h2>
                  <UserForm
                    mode="edit"
                    initialData={editingUser}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setEditingUser(null)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* fin container deux colonnes */}

      {/* ⭐️ MODALE CREATION USER */}
      {isCreateUserModalOpen && (
        <CreateUserModal onClose={() => setIsCreateUserModalOpen(false)}>
          <UserForm
            mode="create"
            onSuccess={handleFormSuccess}
            onCancel={() => setIsCreateUserModalOpen(false)}
          />
        </CreateUserModal>
      )}

      {/* ⭐️ MODALE CREATION SPOT */}
      {isCreateSpotModalOpen && (
        <CreateUserModal onClose={() => setIsCreateSpotModalOpen(false)}>
          <SpotForm
            mode="create"
            onSuccess={() => setIsCreateSpotModalOpen(false)}
            onCancel={() => setIsCreateSpotModalOpen(false)}
          />
        </CreateUserModal>
      )}
      <br />
      <br />
    </div> // fin du container principal
  );
}
