import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getListing, updateListing } from "../services/listingsService";
import ListingForm from "../components/ListingForm";
import Loader from "../components/Loader";

export default function EditListing() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListing(id).then(setListing).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!listing || listing.ownerId !== user.uid)
    return <p className="text-center text-red-600">Listing not found or not yours.</p>;

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">Edit item</h1>
      <ListingForm
        initial={listing}
        submitLabel="Save changes"
        onSubmit={async (data) => {
          await updateListing(id, data);
          navigate("/my-listings");
        }}
      />
    </div>
  );
}