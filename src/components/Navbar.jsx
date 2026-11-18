import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }

  return (
    <nav className="bg-blue-600 text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="text-xl font-bold">🛒 Marketplace</Link>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link to="/my-listings" className="hover:underline">My Listings</Link>
              <Link to="/listings/new" className="rounded bg-white px-3 py-1 font-semibold text-blue-600">+ Sell</Link>
              <span className="hidden sm:inline">{user.displayName || user.email}</span>
              <button onClick={handleLogout} className="rounded bg-blue-800 px-3 py-1 hover:bg-blue-900">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="rounded bg-white px-3 py-1 font-semibold text-blue-600">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}