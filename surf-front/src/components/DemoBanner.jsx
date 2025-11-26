// components/DemoBanner.jsx
"use client";

import { useIsDemo } from "@/utils/usePermissions";

export default function DemoBanner() {
  const isDemo = useIsDemo();

  if (!isDemo) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-4 rounded-lg shadow-lg border-2 border-yellow-500 m-12">
      <div className="flex items-center gap-1">
        <div>
          <h3 className="font-bold text-lg mb-1">
            Mode Démo - Interface en lecture seule
          </h3>
          <p className="text-xl">
            Vous pouvez voir tous les détails des spots et consulter la page
            d'administration, mais
            <br />
            les actions de modification, création et likes sont désactivées pour
            préserver l'intégrité des données.
          </p>
        </div>
      </div>
    </div>
  );
}
