"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonSubmit from "./ButtonSubmit";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import { API_BASE_URL } from "@/lib/api";

/**
 * Formulaire utilisateur réutilisable
 * @param {string} mode - "create" ou "edit"
 * @param {object} initialData - Données existantes si mode="edit"
 * @param {function} onSuccess - Callback appelé après succès
 * @param {function} onCancel - Callback appelé lors de l'annulation
 */
const UserForm = ({
  mode = "create",
  initialData = null,
  onSuccess = () => {},
  onCancel = () => {},
}) => {
  const isEditMode = mode === "edit";
  const router = useRouter();

  const emptyFormData = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    country_user: "",
    url_userpicture: "",
    role_id: 3, // Par défaut "user"
  };

  // Initialiser avec les données existantes en mode edit
  const [formData, setFormData] = useState(() => {
    if (isEditMode && initialData) {
      return {
        firstname: initialData.firstname || "",
        lastname: initialData.lastname || "",
        username: initialData.username || "",
        email: initialData.email || "",
        password: "", // Toujours vide au départ
        country_user: initialData.country_user || "",
        url_userpicture: initialData.url_userpicture || "",
        role_id: initialData.role_id || 3,
      };
    }
    return emptyFormData;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [showModal, setShowModal] = useState(false);

  // Pré-remplir le formulaire en mode édition
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstname: initialData.firstname || "",
        lastname: initialData.lastname || "",
        username: initialData.username || "",
        email: initialData.email || "",
        password: "", // Toujours vide au départ
        country_user: initialData.country_user || "",
        url_userpicture: initialData.url_userpicture || "",
      });
    }
  }, [initialData]);

  // Mettre à jour le formulaire si initialData change
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        firstname: initialData.firstname || "",
        lastname: initialData.lastname || "",
        username: initialData.username || "",
        email: initialData.email || "",
        password: "",
        country_user: initialData.country_user || "",
        url_userpicture: initialData.url_userpicture || "",
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Adapter l'endpoint selon le mode
      const endpoint = isEditMode
        ? `${API_BASE_URL}/users/${initialData.id}`
        : `${API_BASE_URL}/users`;

      const method = isEditMode ? "PATCH" : "POST";

      // En mode edit, ne pas envoyer password si vide
      const dataToSend = { ...formData };
      if (isEditMode && !formData.password) {
        delete dataToSend.password;
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Erreur lors de ${isEditMode ? "la modification" : "l'inscription"}`,
        );
      }

      // Message de succès adapté
      const successMessage = isEditMode
        ? "Utilisateur modifié avec succès 🎉"
        : "Utilisateur créé avec succès 🎉";

      setModalType("success");
      setModalMessage(successMessage);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);

        // Comportement différent selon le mode (redirection vers login)
        // if (isEditMode) {
        //   onSuccess(data);
        // } else {
        //   router.push("/login");
        // }

        // ⭐️ nouveau comportement avec callback onSuccess
        if (onSuccess && typeof onSuccess === "function") {
          // Utilisé par la page admin
          onSuccess(data);
        } else {
          // Si utilisé par la page signup : on redirige vers login
          router.push("/login");
        }
      }, 2000);
    } catch (err) {
      setModalType("error");
      setModalMessage(err.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      onCancel();
    } else {
      setFormData(emptyFormData); // Reset le formulaire
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-4 md:mx-auto space-y-6 p-6 bg-white rounded-2xl shadow-md"
      >
        {/* Titre adapté selon le mode */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          {isEditMode ? "✏️ Modify Member" : "🏄‍♂️ Create an account"}
        </h2>

        <div>
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            First name<span className="text-red-700"> *</span>
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First name"
            required
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Last name<span className="text-red-700"> *</span>
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last name"
            required
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Username<span className="text-red-700"> *</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 my-1"
          >
            Email<span className="text-red-700"> *</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        {/* Password optionnel en mode edit */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Password
            <span className="text-red-700">{isEditMode ? "" : " *"}</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={
              isEditMode ? "Laisser vide pour ne pas changer" : "Password"
            }
            required={!isEditMode}
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
          {isEditMode && (
            <p className="text-xs text-gray-500 mt-1">
              Laissez vide pour conserver le mot de passe actuel
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country_user"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Country
          </label>
          <input
            type="text"
            id="country_user"
            name="country_user"
            value={formData.country_user}
            onChange={handleChange}
            placeholder="Country"
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="url_userpicture"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Your picture
          </label>
          <input
            type="url"
            id="url_userpicture"
            name="url_userpicture"
            value={formData.url_userpicture}
            onChange={handleChange}
            placeholder="https://exemple.com/photo.jpg"
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="role_id"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Role<span className="text-red-700"> *</span>
          </label>

          <select
            id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled={isLoading}
          >
            <option value={1}>Admin</option>
            <option value={2}>Moderator</option>
            <option value={3}>User</option>
          </select>
        </div>

        <p>
          <span className="text-red-700"> *</span>
          <em> Required</em>
        </p>

        {/* Texte du bouton adapté */}
        <div className="flex space-x-4">
          <ButtonSubmit className="flex-[3]" disabled={isLoading}>
            {isEditMode ? "💾 Enregistrer" : "🏄‍♂️ Send"}
          </ButtonSubmit>
          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-400"
            disabled={isLoading}
          >
            ❌ {isEditMode ? "Annuler" : "Cancel"}
          </Button>
        </div>
      </form>

      {/* MODALE DE CONFIRMATION */}
      {showModal && (
        <ConfirmationModal
          type={modalType}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default UserForm;
