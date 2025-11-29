"use client";
import { useState } from "react";

const UserCard = ({
  id,
  firstname,
  lastname,
  username,
  country_user,
  email,
  url_userpicture,
  role_id,
  role,

  // callbacks à définir dans la page admin
  onEdit,
  onDelete,
  onSave,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Image de fallback par défaut
  const defaultImage = "/user_default.png";

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <article className="text-left bg-white shadow-md rounded-lg p-4 max-w-xl w-full mx-auto mb-6 border border-gray-200">
      {/* Icons actions */}
      <div className="absolute top-3 right-3 flex gap-3">
        {/* Edit */}
        <img
          src="/pencil.svg"
          alt="Modifier"
          className="w-6 h-6 cursor-pointer hover:opacity-70 transition"
          onClick={() => onEdit && onEdit(id)}
        />
        {/* Save */}
        <img
          src="/save.svg"
          alt="Enregistrer"
          className="w-6 h-6 cursor-pointer hover:opacity-70 transition"
          onClick={() => onSave && onSave(id)}
        />
        {/* Delete */}
        <img
          src="/trash-red.svg"
          alt="Supprimer"
          className="w-6 h-6 cursor-pointer hover:opacity-70 transition"
          onClick={() => onDelete && onDelete(id)}
        />
      </div>

      {/* User picture */}
      <div className="relative w-full h-56 mb-4 bg-gray-100 rounded-md overflow-hidden">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-500">Chargement...</span>
          </div>
        )}

        <img
          src={imageError ? defaultImage : url_userpicture || defaultImage}
          alt={`${firstname} ${lastname}` || "User picture"}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageLoading && !imageError ? "none" : "block" }}
        />
      </div>

      {/* Infos principales */}
      <h3 className="text-xl font-bold">
        {firstname} {lastname}
      </h3>
      <p className="text-lg text-gray-700">
        Username: {username} • Role: {role?.role || `Role ${role_id}`}
        {/* Username: {username} • Role: {role?.role} */}
      </p>
      <p className="text-lg text-gray-600">{country_user}</p>
      <p className="mt-2 text-md text-gray-600">email: {email}</p>
    </article>
  );
};

export default UserCard;
