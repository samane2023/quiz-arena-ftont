// src/components/Layout/MainLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const MainLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logout } = useAuth();

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-slate-900 text-white flex flex-col"
    >
      <header className="bg-[#2C565D] p-4 flex justify-between items-center">
        <Link to="/" className="mx-32">
          <h1 className="text-xl font-bold">QuizArena</h1>
        </Link>

        <div className="mx-32 font-bold">
          <nav className="flex items-center gap-6">
            {/* Left side links */}
            <div className="flex items-center gap-5">
              <Link to="/" className="hover:underline">
                Home
              </Link>

              {isAuthenticated && (
                <>
                  <Link to="/profile" className="hover:underline">
                    Profile
                  </Link>
                </>
              )}

              {isAuthenticated && currentUser?.role === "admin" && (
                <Link to="/admin/questions" className="hover:underline">
                  Admin
                </Link>
              )}
            </div>

            {/* Right side (auth) */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-white/90">
                    Hello, {currentUser?.username}
                  </span>
                  <button
                    onClick={logout}
                    className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-extrabold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/70"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  <Link to="/register" className="hover:underline">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content bg-[#1C2D38] flex-1">{children}</main>

      <footer className="bg-[#2C565D] py-4 text-center text-white">
        <div className="flex justify-center gap-24">
          <a href="#" className="hover:underline font-bold">
            About
          </a>
          <a href="#" className="hover:underline font-bold">
            FAQ
          </a>
          <a href="#" className="hover:underline font-bold">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
