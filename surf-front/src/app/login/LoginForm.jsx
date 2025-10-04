"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSubmit from "../../components/ButtonSubmit";
import { authService } from "../../lib/authService";
import { useAuth } from "../../utils/useAuth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
    setError("");

    try {
      // ✅ Utiliser l'API au lieu des données en dur
      const response = await authService.login(
        formData.username,
        formData.password
      );

      console.log("✅ Connexion réussie:", response.user);

      // Rediriger vers la page d'accueil après connexion
      router.push("/home");
    } catch (err) {
      console.error("❌ Erreur connexion:", err);
      setError(err.message || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-4 md:mx-auto space-y-6 p-6 bg-white rounded-2xl shadow-md"
    >
      <div>
        <label
          htmlFor="username"
          className="bblock text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isLoading}
          placeholder="Enter your username"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isLoading}
          placeholder="Enter your password"
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <ButtonSubmit disabled={isLoading}>
        {isLoading ? "Connecting..." : "🏄‍♂️ Send"}
      </ButtonSubmit>

      {/* Info de test temporaire */}
      {/* <div className="mt-4 text-center text-xs text-gray-500">
        <p>Test avec : bodhi / 1234xz</p>
      </div> */}
    </form>
  );
};

export default LoginForm;
