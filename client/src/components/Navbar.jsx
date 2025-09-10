import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar({ title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 ...">
      <div className="flex justify-between items-center">
        <h1>{title}</h1>
        <div className="relative">
          <button className="rounded-full bg-gray-200 p-2">
            <User size={20} />
          </button>
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded">
            <button onClick={() => navigate("/profile")} className="block px-4 py-2 w-full text-left">Profile</button>
            <button onClick={handleLogout} className="block px-4 py-2 w-full text-left">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}
