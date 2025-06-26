import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { IoSunnyOutline } from "react-icons/io5";
import { AiOutlineMoon } from "react-icons/ai";

const MainLayout = () => {
  const [theme, setTheme] = useState("light"); // Default to light

  // Apply theme to the <html> element for Tailwind
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-zinc-800 dark:text-gray-400 text-black  flex flex-col min-h-screen">
      {/* Theme Toggle Section */}
      <div className="w-full flex justify-end p-4">
        <div className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-xl flex items-center gap-2">
          {/* Dark Mode Button */}
          <button
            className="bg-transparent p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-100/10 text-black dark:text-white"
            aria-label="Dark Mode"
            onClick={() => setTheme("dark")}
          >
            <AiOutlineMoon size={20} />
          </button>
          {/* Light Mode Button */}
          <button
            className="bg-transparent p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-100/10 text-black dark:text-white"
            aria-label="Light Mode"
            onClick={() => setTheme("light")}
          >
            <IoSunnyOutline size={20} />
          </button>
        </div>
      </div>

      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default MainLayout;
