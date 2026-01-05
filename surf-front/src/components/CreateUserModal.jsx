"use client";

import React from "react";

export default function CreateUserModal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="max-w-xl w-full mx-4 p-6 rounded-2xl shadow-xl border bg-white">
        {/* Bouton fermer */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>

        {/* Contenu dynamique (UserForm) */}
        {children}
      </div>
    </div>
  );
}
