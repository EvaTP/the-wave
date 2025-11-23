"use client"; // Si App Router

import { useAuth } from "@/utils/useAuth";
import { useIsDemo } from "@/utils/usePermissions";

export default function DebugSession() {
  const { user, isAuthenticated, loading } = useAuth();
  const isDemo = useIsDemo();

  if (loading) {
    return <p>⏳ Vérification en cours...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Debug Auth</h1>
      <p>Loading: {loading ? "true" : "false"}</p>
      <p>
        <strong>isDemo:</strong> {isDemo ? "✅ true" : "❌ false"}
      </p>
      <p>isAuthenticated: {isAuthenticated ? "true" : "false"}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

// claude
// export default function DebugSession() {
//   const { data: session, status } = useSession();

//   return (
//     <div className="p-8 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">🔍 Debug Session</h1>

//       <div className="bg-gray-800 p-6 rounded-lg mb-4">
//         <h2 className="text-xl font-semibold mb-4">Status: {status}</h2>

//         {status === "loading" && <p>Chargement de la session...</p>}

//         {status === "unauthenticated" && (
//           <p className="text-red-400">❌ Non connecté</p>
//         )}

//         {status === "authenticated" && session && (
//           <div>
//             <p className="text-green-400 mb-4">✅ Connecté</p>

//             <h3 className="text-lg font-semibold mt-4 mb-2">
//               Session complète :
//             </h3>
//             <pre className="bg-black p-4 rounded overflow-auto text-sm">
//               {JSON.stringify(session, null, 2)}
//             </pre>

//             <h3 className="text-lg font-semibold mt-6 mb-2">
//               Informations importantes :
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 👤 <strong>Username:</strong>{" "}
//                 {session.user?.username || "❌ Non défini"}
//               </li>
//               <li>
//                 📧 <strong>Email:</strong>{" "}
//                 {session.user?.email || "❌ Non défini"}
//               </li>
//               <li>
//                 🎭 <strong>Role:</strong>{" "}
//                 {session.user?.role || "❌ NON DÉFINI - PROBLÈME ICI !"}
//               </li>
//               <li>
//                 🆔 <strong>User ID:</strong>{" "}
//                 {session.user?.id || "❌ Non défini"}
//               </li>
//               <li>
//                 🔢 <strong>Role ID:</strong>{" "}
//                 {session.user?.roleId || "❌ Non défini"}
//               </li>
//             </ul>

//             {!session.user?.role && (
//               <div className="mt-6 p-4 bg-red-900 border border-red-500 rounded">
//                 <h3 className="text-xl font-bold mb-2">⚠️ PROBLÈME DÉTECTÉ</h3>
//                 <p>Le rôle n'est pas présent dans la session.</p>
//                 <p className="mt-2">
//                   Il faut mettre à jour votre configuration NextAuth.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="mt-6">
//         <a
//           href="/dashboard"
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded mr-4"
//         >
//           Retour au Dashboard
//         </a>
//         <a
//           href="/api/auth/signout"
//           className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
//         >
//           Se déconnecter
//         </a>
//       </div>
//     </div>
//   );
// }
