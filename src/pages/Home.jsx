import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllListings } from "../services/listingsService";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";

export default function Home() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllListings()
      .then(setListings)
      .catch((e) => { console.error(e); setError("Could not load listings."); })
      .finally(() => setLoading(false));
  }, []);

  const shown = listings.filter((l) =>
    (l.title + " " + l.description).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader text="Loading listings..." />;
  if (error) return <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>;

  return (
    <div>
      <input
        value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search items..."
        className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      {shown.length === 0 ? (
        <p className="py-10 text-center text-gray-500">No items for sale yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l) => (
            <ListingCard key={l.id} listing={l} isOwner={l.ownerId === user.uid} />
          ))}
        </div>
      )}
    </div>
  );
}