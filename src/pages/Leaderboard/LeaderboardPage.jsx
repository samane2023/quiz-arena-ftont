// src/pages/Leaderboard/LeaderboardPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const normalize = (v) =>
  String(v ?? "")
    .trim()
    .toLowerCase();

// ✅ English labels + Persian/English synonyms to match your stored categories
const ALLOWED = [
  {
    key: "technology",
    label: "Technology",
    synonyms: ["technology", "tech", "تکنولوژی", "فناوری"],
  },
  {
    key: "computer",
    label: "Computer",
    synonyms: ["computer", "کامپیوتر", "رایانه"],
  },
  {
    key: "language",
    label: "Language",
    synonyms: ["language", "زبان", "زبان‌ها"],
  },
  {
    key: "science",
    label: "Science",
    synonyms: ["science", "علوم", "علم"],
  },
];

const LeaderboardPage = () => {
  const { users = [], categories = [] } = useData();
  const { currentUser } = useAuth();

  const [mode, setMode] = useState("week"); // "week" | "category"
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // ✅ keep as string

  // ✅ Build dropdown options: always show English labels, but use real ids if found
  const allowedOptions = useMemo(() => {
    const cats = Array.isArray(categories) ? categories : [];

    return ALLOWED.map((item) => {
      const found = cats.find((c) =>
        item.synonyms.some((s) => normalize(c?.name) === normalize(s))
      );

      return {
        key: item.key,
        label: item.label, // ✅ English label
        id: found?.id != null ? String(found.id) : "", // ✅ value for <option>
        exists: !!found,
      };
    }).filter((opt) => opt.id); // only options that actually exist in your data
  }, [categories]);

  // ✅ Default selected category when switching / first load
  useEffect(() => {
    if (!selectedCategoryId && allowedOptions.length) {
      setSelectedCategoryId(allowedOptions[0].id);
    }
  }, [allowedOptions, selectedCategoryId]);

  const getCategoryLabelById = (categoryId) => {
    const idStr = String(categoryId ?? "");
    const opt = allowedOptions.find((o) => o.id === idStr);
    return opt ? opt.label : "Unknown";
  };

  const now = Date.now();
  const weekStart = now - 7 * 24 * 60 * 60 * 1000;

  const getGamesArray = (u) => (Array.isArray(u?.games) ? u.games : []);

  const calcThisWeek = (u) => {
    const games = getGamesArray(u).filter((g) => {
      if (!g?.date) return false;
      const t = new Date(g.date).getTime();
      return t >= weekStart;
    });

    const score = games.reduce((sum, g) => sum + (g?.score || 0), 0);

    const lastGame = games
      .filter((g) => g?.date)
      .map((g) => ({ ...g, t: new Date(g.date).getTime() }))
      .sort((a, b) => b.t - a.t)[0];

    return {
      score: score || 0,
      categoryName: lastGame?.categoryId
        ? getCategoryLabelById(lastGame.categoryId)
        : "-",
    };
  };

  const calcByCategory = (u, categoryIdStr) => {
    if (!categoryIdStr) return { score: 0, categoryName: "-" };

    // ✅ compare as string to avoid number/string mismatch
    const games = getGamesArray(u).filter(
      (g) => String(g?.categoryId) === String(categoryIdStr)
    );

    const score = games.reduce((sum, g) => sum + (g?.score || 0), 0);

    return {
      score: score || 0,
      categoryName: getCategoryLabelById(categoryIdStr),
    };
  };

  const rows = useMemo(() => {
    const activeUsers = [...users].filter((u) => u?.status === "active");

    const mapped = activeUsers.map((u) => {
      const calc =
        mode === "category"
          ? calcByCategory(u, selectedCategoryId)
          : calcThisWeek(u);

      return {
        id: u.id,
        username: u.username || "Unknown",
        score: calc.score,
        categoryName: calc.categoryName,
      };
    });

    return mapped.sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [users, mode, selectedCategoryId]);

  const topRows = rows.slice(0, 10);
  const currentUserRank = currentUser
    ? rows.findIndex((r) => r.id === currentUser.id) + 1
    : 0;

  return (
    <section dir="ltr" className="py-10">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="overflow-hidden rounded-3xl border border-[#2C565D]/40 bg-[#223946] shadow-sm">
          {/* Title */}
          <div className="px-6 pt-8 sm:px-10">
            <h1 className="text-3xl font-extrabold text-white">Leaderboards</h1>
          </div>

          {/* Controls */}
          <div className="px-6 pb-6 pt-6 sm:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMode("week")}
                  className={[
                    "rounded-full px-5 py-2 text-xs font-extrabold shadow-sm transition",
                    mode === "week"
                      ? "bg-teal-400/90 text-slate-900"
                      : "bg-[#2C565D] text-white hover:bg-[#37727b]",
                  ].join(" ")}
                >
                  This Week
                </button>

                <button
                  type="button"
                  onClick={() => setMode("category")}
                  className={[
                    "rounded-full px-5 py-2 text-xs font-extrabold shadow-sm transition",
                    mode === "category"
                      ? "bg-teal-400/90 text-slate-900"
                      : "bg-[#2C565D] text-white hover:bg-[#37727b]",
                  ].join(" ")}
                >
                  By Category
                </button>

                {mode === "category" && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white/70">
                      Category:
                    </span>

                    <select
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      className="rounded-full border border-white/10 bg-[#1C2D38] px-4 py-2 text-xs font-bold text-white/90 outline-none focus:ring-2 focus:ring-teal-300/40"
                      disabled={allowedOptions.length === 0}
                    >
                      {allowedOptions.length === 0 ? (
                        <option value="">No categories</option>
                      ) : (
                        allowedOptions.map((o) => (
                          <option key={o.key} value={o.id}>
                            {o.label}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                )}
              </div>

              <Link
                to="/categories"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/70"
              >
                Tap To Play More!!!
              </Link>
            </div>
          </div>

          {/* Table area */}
          <div className="px-6 py-8 sm:px-10">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1C2D38]">
              <div className="grid grid-cols-12 gap-2 border-b border-white/10 bg-[#1C2D38] px-5 py-4">
                <div className="col-span-2 text-xs font-extrabold text-white/85">
                  Rank
                </div>
                <div className="col-span-5 text-xs font-extrabold text-white/85">
                  Player
                </div>
                <div className="col-span-3 text-xs font-extrabold text-white/85">
                  Category
                </div>
                <div className="col-span-2 text-xs font-extrabold text-white/85">
                  Score
                </div>
              </div>

              {rows.length === 0 ? (
                <div className="px-6 py-10 text-sm font-bold text-white/70">
                  No leaderboard data yet.
                </div>
              ) : (
                <div className="bg-[#4DB6B0]/90 py-4">
                  {topRows.map((r, idx) => (
                    <div
                      key={r.id}
                      className="grid grid-cols-12 gap-2 px-5 py-3 text-sm border-b border-black/40 last:border-b-0"
                    >
                      <div className="col-span-2 font-extrabold text-slate-900">
                        {idx + 1}
                      </div>
                      <div className="col-span-5 font-bold text-slate-900">
                        {r.username}
                      </div>
                      <div className="col-span-3 font-bold text-slate-900">
                        {r.categoryName}
                      </div>
                      <div className="col-span-2 font-extrabold text-slate-900">
                        {r.score || 0}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {currentUser && currentUserRank > 10 && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-[#1C2D38] p-5">
                <p className="text-sm font-extrabold text-white">Your Rank</p>
                <p className="mt-2 text-sm text-white/80">
                  Rank:{" "}
                  <span className="font-extrabold text-white">
                    {currentUserRank}
                  </span>{" "}
                  • Score:{" "}
                  <span className="font-extrabold text-white">
                    {typeof currentUser.totalScore === "number"
                      ? currentUser.totalScore
                      : 0}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPage;
