// import { useNavigate } from "react-router-dom";
// import { User } from "lucide-react";
// import { clearAuth } from "../utils/auth";
// import Logo from "../assets/logo1.jpg"; // 👈 replace with your institute logo path
// import { useState } from "react";

// export default function Navbar({ title }) {
//   const navigate = useNavigate();


//   const handleLogout = () => {

//     clearAuth()
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };


//   return (
//     <header className="sticky top-0 ...">
//       <div className="flex justify-between items-center px-24 py-3 bg-white ">
//         <img src={Logo} alt="" className="w-40 h-30" />
//         <h1>{title}</h1>
//         <div className="relative">
//           <button className="rounded-full bg-gray-200 p-2">
//             <User  className="group" size={20} />
//           </button>
//           <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded hidden group-hover:block">
//             {/* <button onClick={() => navigate("/profile")} className="block px-4 py-2 w-full text-left">Profile</button> */}
//             <button  onClick={handleLogout} className="block px-4 py-2 w-full text-left">Logout</button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { clearAuth } from "../utils/auth";
import Logo from "../assets/logo1.jpg"; // 👈 replace with your institute logo path
import { useState } from "react";

export default function Navbar({ title }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 ...">
      <div className="flex justify-between items-center px-24 py-3 bg-white ">
        <img src={Logo} alt="" className="w-40 h-30" />
        <h1>{title}</h1>
        <div className="relative">
          <button
            className="rounded-full bg-gray-200 p-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // 👈 toggle on click
          >
            <User size={20} />
          </button>
          {isDropdownOpen && ( // 👈 conditionally render
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded">
              {/* <button onClick={() => navigate("/profile")} className="block px-4 py-2 w-full text-left">Profile</button> */}
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
