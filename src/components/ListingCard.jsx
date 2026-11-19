import { Link } from "react-router-dom";

export default function ListingCard({ listing, isOwner, onDelete }) {
  const mailto = `mailto:${listing.ownerEmail}?subject=${encodeURIComponent(
    "Interested in: " + listing.title
  )}`;

  return (
    <div className="flex flex-col rounded-xl bg-white p-4 shadow">
      {listing.imageUrl && (
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="mb-3 h-44 w-full rounded-lg object-cover"
        />
      )}
      <h2 className="text-lg font-bold">{listing.title}</h2>
      <p className="my-1 text-xl font-semibold text-blue-600">${listing.price}</p>
      <p className="mb-3 flex-1 text-sm text-gray-600">{listing.description}</p>
      <p className="mb-3 text-xs text-gray-500">Seller: {listing.ownerName}</p>

      {isOwner ? (
        <div className="flex gap-2">
          <Link to={`/listings/${listing.id}/edit`} className="flex-1 rounded-lg bg-gray-200 py-2 text-center text-sm font-semibold hover:bg-gray-300">
            Edit
          </Link>
          <button onClick={() => onDelete(listing.id)} className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <a href={mailto} className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700">
            Contact seller
          </a>
          {listing.contactPhone && (
            <a href={`tel:${listing.contactPhone}`} className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700">
              Call
            </a>
          )}
        </div>
      )}
    </div>
  );
}