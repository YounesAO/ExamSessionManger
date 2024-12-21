import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo.png';
import user from '../img/user.jpg';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    // Perform sign-out logic here, such as clearing user session or making an API call
    // After signing out, navigate to the login page
    navigate('/');
  };

  return (
    <nav className="bg-white border-b-2 border-gray-300 shadow-md dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <a href="" className="flex items-center">
            <img
              src={logo}
              className="h-20 w-22 me-2"
              alt="Logo"
            />
          </a>

          {/* Navigation Links */}
          <ul className="flex flex-wrap space-x-6 rtl:space-x-reverse text-sm font-medium md:text-base">
            <li>
              <a
                href="/dashboard"
                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <i className="fa fa-home"></i> <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/exams"
                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <i className="fa fa-calendar-alt"></i> <span>Exams</span>
              </a>
            </li>
            <li>
              <a
                href="/surveillance"
                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <i className="fa fa-user-check"></i> <span>Surveillance</span>
              </a>
            </li>
            <li>
              <a
                href="/emploi"
                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <i className="fa fa-calendar"></i> <span>Emploi</span>
              </a>
            </li>
            <li>
              <a
                href="/options"
                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <i className="fa fa-book"></i> <span>Options</span>
              </a>
            </li>
            <li>
              <a
                href="/departements"
                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <i className="fa fa-building"></i> <span>Départements</span>
              </a>
            </li>
            <li>
              <a
                href="/locaux"
                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <i className="fa fa-map-marker-alt"></i> <span>Locaux</span>
              </a>
            </li>
          </ul>
        </div>

        {/* User Profile */}
        <div className="relative">
          {/* Image as a Button */}
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <img
              src={user}
              className="h-16 w-16 rounded-full" // Adjust size as needed
              alt="user"
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700">
              {/* Email */}
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                miskaraminaa@gmail.com
                </span>
              </div>

              {/* Dropdown Options */}
              <ul className="py-2">
                {/* Sessions */}
                <li>
                  <a
                    href="/session" // Replace this with your actual sessions page URL
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sessions
                  </a>
                </li>

                {/* Sign Out */}
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
