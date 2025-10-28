// Hook personnalisé d'authentification
"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../lib/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initAuth = async () => {
    console.log("🔄 Initialisation de l'auth...");
    setLoading(true);

    // Vérifier s'il y a un utilisateur en local
    const token = authService.getToken();
    const localUser = authService.getUser();

    console.log("📊 État local:", {
      hasToken: !!token,
      hasUser: !!localUser,
      username: localUser?.username,
    });

    if (token && localUser && authService.isAuthenticated()) {
      console.log("✅ Utilisateur trouvé en local, vérification serveur...");

      // Vérifier avec le serveur
      try {
        const serverUser = await authService.checkAuthStatus();
        if (serverUser) {
          console.log("✅ Auth confirmée par le serveur");
          setUser(serverUser);
          setIsAuthenticated(true);
        } else {
          console.log("❌ Auth rejetée par le serveur");
          setUser(null);
          setIsAuthenticated(false);
          authService.logout(); // supprime le token si serveur rejette
        }
      } catch (error) {
        console.log("❌ Erreur vérification serveur:", error);
        setUser(localUser); // Utiliser les données locales en cas d'erreur réseau
        setIsAuthenticated(true);
      }
    } else {
      console.log("❌ Pas d'authentification locale");
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
    console.log("✅ Initialisation auth terminée");
  };

  useEffect(() => {
    initAuth();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      // console.log("🔑 Tentative de connexion...");
      const data = await authService.login(username, password);
      console.log("✅ Connexion réussie:", data.user.username);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      console.log("❌ Erreur connexion:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    console.log("👋 Déconnexion...");
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/"); // Rediriger vers la page d'accueil
  };

  // ✅ Debug final
  // console.log("🎯 useAuth final state:", {
  //   isAuthenticated,
  //   loading,
  //   username: user?.username,
  // });

  return (
    <AuthContext.Provider
      value={{
        user,
        username: user?.username || null,
        isAuthenticated,
        loading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// hook personnalisé à importer dans les composants/pages nécessitant useAuth
export function useAuth() {
  return useContext(AuthContext);
}
