import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyListings, deleteListing, setListingSold } from "../services/listingsService";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";

export default function MyListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyListings(user.uid)
      .then((items) =>
        setListings(items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)))
      )
      .finally(() => setLoading(false));
  }, [user.uid]);

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

  if (loading) return <Loader text="Loading your listings..." />;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">My listings</h1>
      {listings.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          You have no items yet.{" "}
          <Link to="/listings/new" className="text-blue-600 underline">Sell something</Link>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard
              key={l.id}
              listing={l}
              isOwner
              onDelete={handleDelete}
              onToggleSold={handleToggleSold}
            />
          ))}
        </div>
      )}
    </div>
  );
}