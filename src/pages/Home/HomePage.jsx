// src/pages/Home/HomePage.jsx  (or wherever your HomePage lives)
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import vector from "../../images/Vector.svg";
import vector2 from "../../images/Vector (2).svg";
import vector3 from "../../images/Vector (3).svg";
import vector4 from "../../images/Vector (4).svg";
import vector5 from "../../images/Vector (5).svg";
import vector6 from "../../images/Vector (6).svg";
import vector7 from "../../images/Vector (7).svg";


const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const startLink = isAuthenticated ? "/categories" : "/login";

  return (
    <section dir="ltr" className="py-10">
      <div className="mx-auto w-full max-w-5xl px-4">
        {/* Main Panel (matches your layout colors) */}
        <div className="overflow-hidden rounded-3xl border border-[#2C565D]/40 bg-[#223946] shadow-sm">
          {/* HERO */}
          <div className="px-6 py-10 text-center sm:px-10">
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
              TEST YOUR KNOWLEDGE.
              <br className="hidden sm:block" />
              CHALLENGE THE WORLD
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Take quick quizes, climb the leaderboards, and become the
              champion of QuizArena.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Primary */}
              <Link
                to={startLink}
                className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/70 sm:w-auto"
              >
                Browse Categories
              </Link>

              {/* Secondary */}
              <Link
                to="/leaderboard"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-[#1C2D38] px-6 py-3 text-sm font-extrabold text-white/90 shadow-sm transition hover:border-[#2C565D]/60 hover:bg-[#182833] focus:outline-none focus:ring-2 focus:ring-[#2C565D]/60 sm:w-auto"
              >
                See Today&apos;s Top Players
              </Link>
            </div>

            {!isAuthenticated && (
              <p className="mt-4 text-xs text-white/60">
                Sign in to start playing and save your score.
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10" />

          {/* HOW IT WORKS */}
          <div className="px-6 py-8 sm:px-10">
            <h2 className="text-left text-sm font-extrabold tracking-wide text-white/90">
              How It Works
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Choose a Category", n: 1 , icon: vector5},
                { title: "Answer Questions", n: 2 , icon: vector6},
                { title: "Climb the Leaderboard", n: 3, icon: vector7 },
              ].map((item) => (
                <div
                  key={item.n}
                  className="rounded-2xl border border-white/10 bg-[#1C2D38] p-5"
                >
                  {/* Icon Placeholder */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                     <img src={item.icon} alt={item.name} className="h-10 w-10" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2C565D] text-xs font-extrabold text-white">
                          {item.n}
                        </span>
                        <p className="text-sm font-extrabold text-white">
                          {item.title}
                        </p>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-white/60">
                        {/* Small helper text (optional) */}
                        {item.n === 1 &&
                          "Pick a topic you love and start the challenge."}
                        {item.n === 2 &&
                          "Answer multiple-choice questions to earn points."}
                        {item.n === 3 &&
                          "Compete with others and reach the top ranks."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10" />

          {/* FEATURED CATEGORIES */}
          <div className="px-6 py-8 sm:px-10">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-left text-sm font-extrabold tracking-wide text-white/90">
                Featured Categories
              </h2>

              <Link
                to="/categories"
                className="text-xs font-bold text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Technology", icon: vector},
                { name: "Computer" , icon: vector2},
                { name: "Language" , icon: vector3 },
                { name: "Science", icon: vector4 },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  to="/categories" // TODO: replace with your real link per category
                  className="group rounded-2xl border border-white/10 bg-[#1C2D38] p-5 transition hover:border-[#2C565D]/60 hover:bg-[#182833]"
                >
                  {/* Icon Placeholder */}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <img src={cat.icon} alt={cat.name} className="h-10 w-10" />

                  </div>

                  <p className="mt-4 text-center text-sm font-extrabold text-white">
                    {cat.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* NOTE: Footer links (About/FAQ/Contact) are already in MainLayout */}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
