// hooks/usePermissions.js
import { useAuth } from "./useAuth";

export function usePermissions() {
  const { user, isAuthenticated } = useAuth();

  // Récupérer le rôle depuis user.role.role (votre structure)
  const roleObject = user?.role;
  const roleName = roleObject?.role?.toLowerCase(); // "admin", "demo", "user", "moderator"

  // Définir les permissions selon le rôle
  const permissions = {
    // Consultation
    canViewSpots: true, // Tout le monde peut voir les spots
    canViewAdmin: roleName === "admin" || roleName === "demo",
    canViewUsers: roleName === "admin" || roleName === "demo",

    // Création et interactions
    canCreateSpot:
      roleName === "user" || roleName === "admin" || roleName === "moderator",
    canCreateComment:
      roleName === "user" || roleName === "admin" || roleName === "moderator",
    canLikeSpots:
      roleName === "user" || roleName === "admin" || roleName === "moderator", // ⭐ PAS demo

    // Modification
    canEditOwnSpot:
      roleName === "user" || roleName === "admin" || roleName === "moderator",
    canEditAnySpot: roleName === "admin" || roleName === "moderator",
    canEditUsers: roleName === "admin",

    // Suppression
    canDeleteOwnSpot:
      roleName === "user" || roleName === "admin" || roleName === "moderator",
    canDeleteAnySpot: roleName === "admin",
    canDeleteUsers: roleName === "admin",
    canDeleteComments: roleName === "admin" || roleName === "moderator",

    // Admin
    canPromoteUsers: roleName === "admin",
    canBanUsers: roleName === "admin",
    canModerateContent: roleName === "admin" || roleName === "moderator",

    // Indicateurs
    isAdmin: roleName === "admin",
    isDemo: roleName === "demo",
    isModerator: roleName === "moderator",
    isUser: roleName === "user",
    isAuthenticated,
  };

  return {
    ...permissions,
    role: roleName,
    roleId: user?.role_id,
    user,
  };
}

// Hooks simplifiés pour un usage rapide
export function useIsAdmin() {
  const { isAdmin } = usePermissions();
  return isAdmin;
}

export function useIsDemo() {
  const { isDemo } = usePermissions();
  return isDemo;
}

export function useCanEdit() {
  const { canEditAnySpot, canDeleteUsers } = usePermissions();
  return canEditAnySpot || canDeleteUsers;
}

export function useCanLike() {
  const { canLikeSpots } = usePermissions();
  return canLikeSpots;
}
