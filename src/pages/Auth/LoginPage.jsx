import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import BGIMG from "../../assets/backgroundLogin.webp";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div
        className="min-h-screen 
    text-white flex flex-col"
      >
        {/* Content */}
        {/* Content */}
        <div className="flex flex-1 justify-center items-start p-8">
          <div className="flex flex-row w-full max-w-5xl  rounded-lg overflow-hidden">
            {/* Left image section */}
            <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 space-y-6">
              {/* عنوان بالا */}
              <div className="text-white font-bold text-3xl">
                Join the Knowledge Quiz!
              </div>

              {/* باکس تصویر یا آیکن تست */}
              <div className="bg-white w-96 h-64 rounded-lg shadow-md">
                <img
                  className="rounded-lg w-full h-full object-cover"
                  src={BGIMG}
                />
              </div>
            </div>

            {/* Right form section */}
            <div className="flex flex-1 flex-col justify-center p-8">
              <div className="flex justify-center mb-6">
                <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full">
                  Login
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* input‌ها همون قبلی‌ها هستن */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none w-full px-4 py-2 rounded-full bg-[#1D3C41]   text-white placeholder-gray-400 focus:outline-none focus:bg-slate-700"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none w-full px-4 py-2 rounded-full bg-[#1D3C41]   text-white placeholder-gray-400 focus:outline-none focus:bg-slate-700"
                />

                {error && <p className="text-red-400">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-full"
                >
                  Login
                </button>
              </form>

              <p className="text-center mt-4 text-sm text-gray-300">
                Create an account!
                <a href="/register" className="text-orange-400 hover:underline">
                  {" Sign up"}
                </a>
              </p>

              <div className="mt-6 flex space-x-4">
                <button className="flex-1 bg-gray-700 text-white py-2 rounded-full">
                  Log in with Google
                </button>
                <button className="flex-1 bg-gray-700 text-white py-2 rounded-full">
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
