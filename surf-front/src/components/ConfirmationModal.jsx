"use client";
import React from "react";

export default function ConfirmationModal({ message, type, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div
        className={`max-w-md w-full mx-4 p-6 rounded-2xl shadow-xl border ${
          type === "success"
            ? "bg-green-50 border-green-300 text-green-800"
            : "bg-red-50 border-red-300 text-red-800"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">
          {type === "success" ? "Success" : "Error"}
        </h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
