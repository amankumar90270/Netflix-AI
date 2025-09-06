import { HelpCircle, LogOut, Search, Settings } from "lucide-react";
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

function Navbar() {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const avatarUrl = user
    ? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : "";

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <Link to={"/"}>
        <img src={Logo} alt="" className="w-24 cursor-pointer brightness-125" />
      </Link>

      <ul className="hidden md:flex space-x-4">
        <li className="cursor-pointer hover:text-[#e50914]">Home</li>
        <li className="cursor-pointer hover:text-[#e50914]">Tv Shows</li>
        <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
        <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
        <li className="cursor-pointer hover:text-[#e50914]">Games</li>
        <li className="cursor-pointer hover:text-[#e50914]">New & Popular</li>
        <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
      </ul>

      <div className="flex items-center space-x-4 relative">
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
            placeholder="Search..."
          />
          <Search className="absolute h-5 w-5 top-2 right-4" />
        </div>

        <Link to={user ? "ai-recommendation" : "signin"}>
          <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">
            Get AI Movie Picks
          </button>
        </Link>

        {!user ? (
          <Link to={"/Signin"}>
            <button className="border border-[#333333] py-2 px-4 cursor-pointer">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="text-white">
            <img
              src={avatarUrl}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-1 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-white font-semibold text-base">
                    {user.username}
                  </span>
                  <span className="text-sm text-gray-400">{user.email}</span>
                </div>

                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                  <HelpCircle className="w-5 h-5" />
                  Help Centre
                </button>

                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                  <Settings className="w-5 h-5" />
                  Setting
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
