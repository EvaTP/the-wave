"use client";

import Image from "next/image";
import ButtonLink from "../components/ButtonLink";
import useLikedSpots from "../utils/useLikedSpots";
import useComments from "../utils/useComments";
import useHashtags from "../utils/useHashtags";
import { useAuth } from "../utils/useAuth";

const SpotCard = ({
  id,
  name,
  country_spot,
  lat,
  lng,
  url_spotpicture,
  description,
  best_season,
  wave_type,
  tide,
  water_temperature,
  crowd,
  dangers,
  facilities,
  spot_levels,
}) => {
  const { toggleLike, isLiked } = useLikedSpots();
  const { isAuthenticated } = useAuth();

  // destructuring avec nommage pour récupérer le loading
  const { loading: likesLoading } = useLikedSpots();
  const { error: likesError } = useLikedSpots();

  // les hooks comments, hashtags suivent le même pattern
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useComments(id, isAuthenticated);

  const {
    hashtags,
    loading: hashtagsLoading,
    error: hashtagsError,
  } = useHashtags(id, isAuthenticated);

  // ancienne version à supprimer
  // const [comments, setComments] = useState([]);
  // const [commentsLoading, setCommentsLoading] = useState(true);
  // const [hashtags, setHashtags] = useState([]);
  // const [hashtagsLoading, setHashtagsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetchComments = async () => {
  //   try {
  //     setCommentsLoading(true);
  //     setError(null);

  //     const res = await fetch(`http://localhost:3001/spots/${id}/comments`);
  //     if (!res.ok) {
  //       throw new Error(`Failed to fetch comments for spot ${id}`);
  //     }

  //     const data = await res.json();
  //     setComments(data);
  //   } catch (err) {
  //     console.error("Error fetching comments:", err);
  //     setError(err.message || "Failed to fetch comments");
  //   } finally {
  //     setCommentsLoading(false);
  //   }
  // };

  // useEffect pour charger les commentaires
  // useEffect(() => {
  //   if (!isAuthenticated) return; // on ne charge pas si pas connecté

  //   fetchComments();
  // }, [isAuthenticated]);

  return (
    <article className="flex flex-col h-full text-left bg-white shadow-md rounded-lg p-4 max-w-xl w-full mx-auto mb-6 border border-gray-200">
      {/* Image */}
      <div className="relative w-full h-56 mb-4">
        <Image
          src={url_spotpicture}
          alt={name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Infos principales */}
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-2xl text-gray-900">{country_spot}</p>
      <p className="mt-2 text-sm text-gray-800">{description}</p>
      <p className="mt-4 text-sm text-gray-800">
        <strong>Level:</strong> {""}
        {spot_levels?.map((sl) => sl.level.label).join(", ")}
      </p>

      {/* Détails visibles seulement si connecté */}
      {isAuthenticated && (
        <div className="mt-4 space-y-1 text-sm">
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Coordinates:</strong> {lat}, {lng}
            </li>
            <li>
              <strong>Wave type:</strong> {wave_type}
            </li>
            <li>
              <strong>Best season:</strong> {best_season}
            </li>
            <li>
              <strong>Tide:</strong> {tide}
            </li>
            <li>
              <strong>Water temperature:</strong> {water_temperature}
            </li>
            <li>
              <strong>Crowd:</strong> {crowd}
            </li>
            <li>
              <strong>Dangers:</strong> {dangers?.join(", ")}
            </li>
            <li>
              <strong>Facilities:</strong> {facilities?.join(", ")}
            </li>
          </ul>
        </div>
      )}

      {/* Bloc "comments/hashtags/boutons/likes" aligné en bas */}
      <div className="mt-auto ">
        {/* Comments */}
        {isAuthenticated && (
          <div className="mt-2 text-sm text-gray-800 bg-green-50 p-2 rounded">
            {commentsLoading && <p className="italic">Loading comments...</p>}
            {commentsError && (
              <p className="text-red-500">❌ {commentsError}</p>
            )}
            {!commentsLoading && !commentsError && comments.length === 0 && (
              <p>No comments yet.</p>
            )}
            {!commentsLoading && !commentsError && comments.length > 0 && (
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li key={c.id}>
                    💬 <strong>{c.user.username || "Anonymous"}:</strong>{" "}
                    {c.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Hashtags */}
        {isAuthenticated && (
          <div className="flex gap-8 mt-2 text-sm text-gray-800 p-2 rounded">
            {hashtagsLoading && <p className="italic">Loading hashtags...</p>}
            {hashtagsError && (
              <p className="text-red-500">❌ {hashtagsError}</p>
            )}
            {!hashtagsLoading && !hashtagsError && hashtags.length === 0 && (
              <p>No hashtags yet.</p>
            )}
            {!hashtagsLoading && !hashtagsError && hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {hashtags.map((h) => (
                  <span
                    key={h.id}
                    className="inline-block bg-blue-100 px-2 py-1 rounded-full text-xs"
                  >
                    #{h.tagname}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Boutons */}
        <div className="mt-4 flex items-center justify-between">
          {isAuthenticated ? (
            <>
              <ButtonLink
                className="text-xs px-3 py-1 rounded bg-blue-200 text-blue-900 hover:bg-blue-300 transition"
                href={`/spots/${id}`}
              >
                See more
              </ButtonLink>

              {/* Cœur like uniquement pour les users connectés */}
              <div className="ml-4 flex items-center gap-2">
                <button
                  onClick={() => toggleLike(id)}
                  disabled={likesLoading}
                  className="text-lg disabled:opacity-50 hover:scale-110 transition-transform"
                  title={
                    likesLoading
                      ? "Loading..."
                      : isLiked(id)
                      ? "Unlike"
                      : "Like"
                  }
                >
                  {likesLoading ? "⏳" : isLiked(id) ? "❤️" : "🤍"}
                </button>
                {likesError && (
                  <span className="text-xs text-red-500" title={likesError}>
                    ⚠️
                  </span>
                )}
              </div>
            </>
          ) : (
            <ButtonLink
              className="text-xs px-3 py-1 rounded bg-blue-200 text-blue-900 hover:bg-blue-300 transition"
              href="/login"
            >
              Login to see more
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
};

export default SpotCard;
