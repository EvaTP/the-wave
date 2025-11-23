// components/DemoBanner.jsx
"use client";

import { useIsDemo } from "@/utils/usePermissions";

export default function DemoBanner() {
  const isDemo = useIsDemo();

  if (!isDemo) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-4 mb-6 rounded-lg shadow-lg border-2 border-yellow-500">
      <div className="flex items-center gap-3">
        <span className="text-3xl" role="img" aria-label="loupe">
          🔍
        </span>
        <div>
          <h3 className="font-bold text-lg mb-1">
            Mode Démo - Interface en lecture seule
          </h3>
          <p className="text-sm">
            Vous pouvez explorer toutes les fonctionnalités d'administration,
            mais les actions de modification, création et likes sont désactivées
            pour préserver l'intégrité des données.
          </p>
        </div>
      </div>
    </div>
  );
}
