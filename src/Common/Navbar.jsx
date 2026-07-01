import React from 'react'
import { Bell, Menu, Search, Moon, Sun, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";


const Navbar = ( { onMenu }) => {

 const location = useLocation();
  const pathname = location.pathname;

  const [dark, setDark] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);

const labels = {
  "/": "Dashboard",
  "/doctors": "Doctors",
  "/staff": "Staff",
  "/patients": "Patients",
  "/bookings": "Bookings",
  "/services": "Services",
  "/testimonials": "Testimonials",
  "/blogs": "Blogs",
  "/settings": "Settings",
};


  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const title = labels[pathname] || "Admin";
  



  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">

        {/* Mobile Menu */}
        <button
          onClick={onMenu}
          className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-card text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page Title */}
        <div className="hidden md:block">
         
          <h1 className="text-3xl font-semibold text-foreground">
            {title}
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">

         

          {/* Dark Mode */}
          <button
            onClick={() => setDark(!dark)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-card text-foreground hover:bg-muted transition"
          >
            {dark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Notification */}
          <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-card text-foreground hover:bg-muted transition">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
  <button
    onClick={() => setShowDropdown(!showDropdown)}
    className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white pl-1 pr-3 py-1 hover:bg-gray-100 transition"
  >
    <img
      src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
      alt="Admin"
      className="h-8 w-8 rounded-lg"
    />

    <div className="hidden sm:block text-left leading-tight">
      <p className="text-xs font-semibold">
        Dr. Admin
      </p>
      <p className="text-[10px] text-gray-500">
        Administrator
      </p>
    </div>

    <ChevronDown className="h-4 w-4" />
  </button>

  {showDropdown && (
    <div className="absolute right-0 text-sm text-gray-600 mt-2 w-44 bg-white overflow-hidden     rounded-lg shadow-lg border border-gray-200 z-50">

    <p className="px-4 py-3  font-semibold text-gray-800">
      My Account
    </p>

      <button className="w-full text-left">
      <div className="px-3 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition">
        Profile
      </div>
    </button>

    <button className="w-full text-left">
      <div className="px-3 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition">
        Settings
      </div>
    </button>

    <button className="w-full text-left">
      <div className="px-3 py-2 rounded-lg text-red-500 hover:bg-blue-400 hover:text-white transition">
        Logout
      </div>
    </button>
    </div>
  )}
</div>
        </div>
      </div>
    </header>
  )
}

export default Navbar