import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllListings, deleteListing, setListingSold } from "../services/listingsService";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";

export default function Home() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [hideSold, setHideSold] = useState(false);

  useEffect(() => {
    getAllListings()
      .then(setListings)
      .catch((e) => { console.error(e); setError("Could not load listings."); })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this listing? This cannot be undone.")) return;
    await deleteListing(id);
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleToggleSold(id, sold) {
    try {
      await setListingSold(id, sold);
      setListings((prev) => prev.map((l) => (l.id === id ? { ...l, sold } : l)));
    } catch (e) {
      console.error(e);
      alert("Could not update the item. Please try again.");
    }
  }

  const shown = listings
    .filter((l) => (l.title + " " + l.description).toLowerCase().includes(search.toLowerCase()))
    .filter((l) => !(hideSold && l.sold))
    .sort((a, b) => Number(!!a.sold) - Number(!!b.sold)); // available items first

  if (loading) return <Loader text="Loading listings..." />;
  if (error) return <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>;

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search items..."
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="mb-4 flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={hideSold} onChange={(e) => setHideSold(e.target.checked)} />
        Hide sold items
      </label>

      {shown.length === 0 ? (
        <p className="py-10 text-center text-gray-500">No items to show.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l) => (
            <ListingCard
              key={l.id}
              listing={l}
              isOwner={l.ownerId === user.uid}
              onDelete={handleDelete}
              onToggleSold={handleToggleSold}
            />
          ))}
        </div>
      )}
    </div>
  );
}