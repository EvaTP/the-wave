"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useAuth } from "../../utils/useAuth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialisation du routeur et du hook d'authentification
  const router = useRouter();
  const { handleLogin } = useAuth();

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
      // 1. Authentification et mise à jour synchrone de l'état global React
      await handleLogin(formData.username, formData.password);

      console.log("✅ Connexion réussie et état mis à jour");

      // 2. Redirection explicite vers la page d'accueil
      router.push("/");
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
    </form>
  );
};

export default LoginForm;
