import { Link } from "react-router-dom";

export default function ListingCard({ listing, isOwner, onDelete, onToggleSold }) {
  const sold = !!listing.sold;
  const mailto = `mailto:${listing.ownerEmail}?subject=${encodeURIComponent(
    "Interested in: " + listing.title
  )}`;

  return (
    <div className="flex flex-col rounded-xl bg-white p-4 shadow">
      <div className="relative">
        {listing.imageUrl && (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className={`mb-3 h-44 w-full rounded-lg object-cover ${sold ? "opacity-60" : ""}`}
          />
        )}
        {sold && (
          <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
            SOLD
          </span>
        )}
      </div>

      <div className="flex items-start justify-between gap-2">
        <h2 className={`text-lg font-bold ${sold ? "text-gray-400 line-through" : ""}`}>
          {listing.title}
        </h2>
        {sold && !listing.imageUrl && (
          <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">SOLD</span>
        )}
      </div>
      <p className="my-1 text-xl font-semibold text-blue-600">${listing.price}</p>
      <p className="mb-3 flex-1 text-sm text-gray-600">{listing.description}</p>
      <p className="mb-3 text-xs text-gray-500">Seller: {listing.ownerName}</p>

      {isOwner ? (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onToggleSold(listing.id, !sold)}
            className={`rounded-lg py-2 text-sm font-semibold text-white ${
              sold ? "bg-gray-600 hover:bg-gray-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {sold ? "Mark as available" : "Mark as sold"}
          </button>
          <div className="flex gap-2">
            <Link
              to={`/listings/${listing.id}/edit`}
              className="flex-1 rounded-lg bg-gray-200 py-2 text-center text-sm font-semibold hover:bg-gray-300"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(listing.id)}
              className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ) : sold ? (
        <p className="rounded-lg bg-gray-100 py-2 text-center text-sm font-semibold text-gray-500">
          This item has been sold
        </p>
      ) : (
        <div className="flex gap-2">
          <a
            href={mailto}
            className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Contact seller
          </a>
          {listing.contactPhone && (
            <a
              href={`tel:${listing.contactPhone}`}
              className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Call
            </a>
          )}
        </div>
      )}
    </div>
  );
}