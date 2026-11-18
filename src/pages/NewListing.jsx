import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createListing } from "../services/listingsService";
import ListingForm from "../components/ListingForm";

export default function NewListing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">Sell an item</h1>
      <ListingForm
        submitLabel="Post item"
        onSubmit={async (data) => {
          await createListing(data, user);
          navigate("/my-listings");
        }}
      />
    </div>
  );
}
