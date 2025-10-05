"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSubmit from "../../components/ButtonSubmit";
import Button from "../../components/Button";
import ConfirmationModal from "../../components/ConfirmationModal";
import { API_BASE_URL } from "@/lib/api";

const RegisterForm = () => {
  const initialFormData = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    country_user: "",
    url_userpicture: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // texte à afficher
  const [modalType, setModalType] = useState("success"); // "success" ou "error"
  const [showModal, setShowModal] = useState(false); // contrôle l'affichage

  const router = useRouter();

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
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription");
      }

      // alert("Utilisateur créé avec succès 🎉");

      // afficher la modale
      setModalType("success");
      setModalMessage("Utilisateur créé avec succès 🎉");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        router.push("/login"); // après inscription, redirige vers login
      }, 3000);
    } catch (err) {
      //setError(err.message);
      setModalType("error");
      setModalMessage(err.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-4 md:mx-auto space-y-6 p-6 bg-white rounded-2xl shadow-md"
      >
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
            value={formData.firstname || ""}
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
            value={formData.lastname || ""}
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
            value={formData.username || ""}
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
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="example@email.com"
            required
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Password<span className="text-red-700"> *</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
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
            value={formData.country_user || ""}
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
            value={formData.url_userpicture || ""}
            onChange={handleChange}
            placeholder="https://exemple.com/photo.jpg"
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>
        <p>
          <span className="text-red-700"> *</span>
          <em> Required</em>
        </p>

        <div className="flex space-x-4">
          <ButtonSubmit className="flex-[3]" disabled={isLoading}>
            🏄‍♂️ Send
          </ButtonSubmit>
          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-400"
            disabled={isLoading}
          >
            ❌ Cancel
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

export default RegisterForm;
