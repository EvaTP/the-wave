"use client";
import React, { useState } from "react";
import ButtonSubmit from "./ButtonSubmit";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import { API_BASE_URL } from "@/lib/api";

// Liste des niveaux correspondant aux IDs de ta table Prisma "Level"
const AVAILABLE_LEVELS = [
  { id: 2, label: "Beginner" },
  { id: 4, label: "Intermediate" },
  { id: 1, label: "Advanced" },
  { id: 3, label: "Expert" },
];

/**
 * Formulaire de création / édition d'un spot de surf
 * Compatible avec la route POST /spots de surf-back (Prisma)
 */
const SpotForm = ({
  mode = "create",
  initialData = null,
  onSuccess = () => {},
  onCancel = () => {},
}) => {
  const isEditMode = mode === "edit";

  const emptyFormData = {
    name: "",
    country_spot: "",
    lat: "",
    lng: "",
    url_spotpicture: "",
    description: "",
    best_season: "",
    wave_type: "",
    tide: "",
    water_temperature: "",
    crowd: "",
    dangers: "",
    facilities: "",
    levels: [], // Tableau d'IDs attendu par le back-end (ex: [2, 4])
  };

  const [formData, setFormData] = useState(() => {
    if (isEditMode && initialData) {
      return {
        name: initialData.name || "",
        country_spot: initialData.country_spot || "",
        lat: initialData.lat ?? "",
        lng: initialData.lng ?? "",
        url_spotpicture: initialData.url_spotpicture || "",
        description: initialData.description || "",
        best_season: initialData.best_season || "",
        wave_type: initialData.wave_type || "",
        tide: initialData.tide || "",
        water_temperature: initialData.water_temperature || "",
        crowd: initialData.crowd || "",
        dangers: Array.isArray(initialData.dangers)
          ? initialData.dangers.join(", ")
          : "",
        facilities: Array.isArray(initialData.facilities)
          ? initialData.facilities.join(", ")
          : "",
        levels: initialData.spot_levels?.map((sl) => sl.level_id) || [],
      };
    }
    return emptyFormData;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [showModal, setShowModal] = useState(false);

  // Gestion des champs texte / nombre
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion des cases à cocher pour les niveaux (tableau d'IDs)
  const handleLevelToggle = (levelId) => {
    setFormData((prev) => {
      const alreadySelected = prev.levels.includes(levelId);
      return {
        ...prev,
        levels: alreadySelected
          ? prev.levels.filter((id) => id !== levelId)
          : [...prev.levels, levelId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isEditMode
        ? `${API_BASE_URL}/spots/${initialData.id}`
        : `${API_BASE_URL}/spots`;

      const method = isEditMode ? "PATCH" : "POST";

      // Préparation des données au format exact attendu par Prisma / spots.js
      const dataToSend = {
        name: formData.name,
        country_spot: formData.country_spot,
        lat: formData.lat !== "" ? parseFloat(formData.lat) : null,
        lng: formData.lng !== "" ? parseFloat(formData.lng) : null,
        url_spotpicture: formData.url_spotpicture || null,
        description: formData.description || null,
        best_season: formData.best_season || null,
        wave_type: formData.wave_type || null,
        tide: formData.tide || null,
        water_temperature: formData.water_temperature || null,
        crowd: formData.crowd || null,
        // Transformation des chaînes séparées par des virgules en tableaux String[]
        dangers: formData.dangers
          ? formData.dangers
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        facilities: formData.facilities
          ? formData.facilities
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        levels: formData.levels,
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Erreur lors de ${isEditMode ? "la modification" : "la création"} du spot`,
        );
      }

      setModalType("success");
      setModalMessage(
        isEditMode
          ? "Spot modifié avec succès 🌊"
          : "Nouveau spot créé avec succès 🏄‍♂️",
      );
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        onSuccess(data);
      }, 2000);
    } catch (err) {
      setModalType("error");
      setModalMessage(err.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(emptyFormData);
    onCancel();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-4 md:mx-auto space-y-4 p-6 bg-white rounded-2xl shadow-md text-left"
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          {isEditMode ? "✏️ Modift spot" : "🌊 Create a new spot"}
        </h2>

        {/* Nom du spot */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Spot name<span className="text-red-700"> *</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Hossegor - La Gravière"
            required
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        {/* Pays */}
        <div>
          <label
            htmlFor="country_spot"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Country<span className="text-red-700"> *</span>
          </label>
          <input
            type="text"
            id="country_spot"
            name="country_spot"
            value={formData.country_spot}
            onChange={handleChange}
            placeholder="Ex: France"
            required
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        {/* Coordonnées GPS pour Leaflet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="lat"
              className="block text-sm font-medium text-gray-700 my-1"
            >
              Latitude (Leaflet)
            </label>
            <input
              type="number"
              step="any"
              id="lat"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              placeholder="Ex: 43.6667"
              className="w-full border p-2 rounded"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="lng"
              className="block text-sm font-medium text-gray-700 my-1"
            >
              Longitude (Leaflet)
            </label>
            <input
              type="number"
              step="any"
              id="lng"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              placeholder="Ex: -1.4333"
              className="w-full border p-2 rounded"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Niveaux de difficulté (Cases à cocher pour le tableau levels) */}
        <div>
          <span className="block text-sm font-medium text-gray-700 my-1">
            Surf Levels (multiple choice possible)
          </span>
          <div className="grid grid-cols-2 gap-2 p-3 border rounded bg-gray-50">
            {AVAILABLE_LEVELS.map((lvl) => (
              <label
                key={lvl.id}
                className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.levels.includes(lvl.id)}
                  onChange={() => handleLevelToggle(lvl.id)}
                  disabled={isLoading}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>{lvl.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="url_spotpicture"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Spot picture URL
          </label>
          <input
            type="url"
            id="url_spotpicture"
            name="url_spotpicture"
            value={formData.url_spotpicture}
            onChange={handleChange}
            placeholder="https://exemple.com/spot.jpg"
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the waves, the access, the vibe..."
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        {/* Caractéristiques techniques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="wave_type"
              className="block text-sm font-medium text-gray-700 my-1"
            >
              Wave type
            </label>
            <input
              type="text"
              id="wave_type"
              name="wave_type"
              value={formData.wave_type}
              onChange={handleChange}
              placeholder="Ex: Beach break, Reef..."
              className="w-full border p-2 rounded"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="best_season"
              className="block text-sm font-medium text-gray-700 my-1"
            >
              Best season
            </label>
            <input
              type="text"
              id="best_season"
              name="best_season"
              value={formData.best_season}
              onChange={handleChange}
              placeholder="Ex: Autumn / Winter"
              className="w-full border p-2 rounded"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="tide"
              className="block text-sm font-medium text-gray-700 my-1"
            >
              Tide
            </label>
            <input
              type="text"
              id="tide"
              name="tide"
              value={formData.tide}
              onChange={handleChange}
              placeholder="Ex: Mid-rising tide"
              className="w-full border p-2 rounded"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="water_temperature"
              className="block text-sm font-medium text-gray-700 my-1"
            >
              Water temperature
            </label>
            <input
              type="text"
              id="water_temperature"
              name="water_temperature"
              value={formData.water_temperature}
              onChange={handleChange}
              placeholder="Ex: 14°C - 21°C"
              className="w-full border p-2 rounded"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Affluence (Crowd) */}
        <div>
          <label
            htmlFor="crowd"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Crowd
          </label>
          <input
            type="text"
            id="crowd"
            name="crowd"
            value={formData.crowd}
            onChange={handleChange}
            placeholder="Ex: Moderate, Very busy area..."
            className="w-full border p-2 rounded"
            disabled={isLoading}
          />
        </div>

        {/* Dangers & Facilities (tableaux String[]) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dangers"
              className="block text-sm font-medium text-gray-700 my-1"
            >
              Dangers (comma separated)
            </label>
            <input
              type="text"
              id="dangers"
              name="dangers"
              value={formData.dangers}
              onChange={handleChange}
              placeholder="Ex: Currents, Rocks"
              className="w-full border p-2 rounded"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="facilities"
              className="block text-sm font-medium text-gray-700 my-1"
            >
              Facilities (comma separated)
            </label>
            <input
              type="text"
              id="facilities"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              placeholder="Ex: Parking, Showers, Surf school"
              className="w-full border p-2 rounded"
              disabled={isLoading}
            />
          </div>
        </div>

        <p className="text-sm">
          <span className="text-red-700"> *</span>
          <em> Required</em>
        </p>

        {/* Boutons d'action */}
        <div className="flex space-x-4 pt-2">
          <ButtonSubmit className="flex-[3]" disabled={isLoading}>
            {isEditMode ? "💾 Enregistrer" : "🌊 Create Spot"}
          </ButtonSubmit>
          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-400"
            disabled={isLoading}
          >
            ❌ Cancel
          </Button>
        </div>
      </form>

      {/* Modale de confirmation */}
      {showModal && (
        <ConfirmationModal
          type={modalType}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default SpotForm;
