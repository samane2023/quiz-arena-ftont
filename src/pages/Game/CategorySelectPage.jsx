// src/pages/Game/CategorySelectPage.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataContext";


const DEFAULT_CATEGORIES = [
  { id: "technology", name: "Technology", description: "Technology questions" },
  { id: "computer", name: "Computer", description: "Computer questions" },
  { id: "language", name: "Language", description: "Language questions" },
  { id: "science", name: "Science", description: "Science questions" },
];

// categories to hide (Persian + English)
const HIDDEN_CATEGORY_NAMES = new Set([
  "سینما",
  "جغرافیا",
  "تاریخ",
  "cinema",
  "geography",
  "history",
]);

const normalize = (v) =>
  String(v ?? "")
    .trim()
    .toLowerCase();

const CategorySelectPage = () => {
  const { categories = [] } = useData();
  const navigate = useNavigate();

  const mergedCategories = useMemo(() => {
    const list = Array.isArray(categories) ? categories : [];

    // 1) remove hidden categories by name (Persian/English)
    const filtered = list.filter((c) => {
      const name = normalize(c?.name);
      return name && !HIDDEN_CATEGORY_NAMES.has(name);
    });

    // 2) merge filtered categories + defaults (no duplicates by NAME first)
    const byKey = new Map();

    const put = (c) => {
      if (!c) return;

      const idKey = c.id != null ? normalize(c.id) : "";
      const nameKey = c.name ? normalize(c.name) : "";

      // ✅ prioritize name to avoid duplicates (id can differ: 1 vs "technology")
      const key = nameKey || idKey;
      if (!key) return;

      if (!byKey.has(key)) {
        byKey.set(key, {
          id: c.id,
          name: c.name,
          description: c.description || "",
        });
      }
    };

    // real categories first
    filtered.forEach(put);

    // add defaults only if name missing
    DEFAULT_CATEGORIES.forEach((d) => {
      const nameKey = normalize(d.name);
      if (!byKey.has(nameKey)) put(d);
    });

    // IMPORTANT: If you ONLY want these 4 and nothing else,
    // uncomment the line below:
    // return DEFAULT_CATEGORIES;

    return Array.from(byKey.values());
  }, [categories]);

  const handleOpen = (categoryId) => {
    if (!categoryId) return;
    navigate(`/game/${categoryId}`);
  };

  return (
    <section dir="ltr" className="py-10">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="overflow-hidden rounded-3xl border border-[#2C565D]/40 bg-[#223946] shadow-sm">
          {/* Header row */}
          <div className="flex items-center justify-between px-8 pt-10">
            <h1 className="text-lg font-extrabold text-white">
              Featured Categories
            </h1>

            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="text-sm font-bold text-white/70 hover:text-white"
            >
              View all
            </button>
          </div>

          {/* Cards */}
          <div className="px-8 pb-10 pt-8">
            {mergedCategories.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-[#1C2D38] p-10 text-sm font-bold text-white/70">
                No categories available.
              </div>
            ) : (
              // ✅ 4 columns from md and up
              <div className="grid gap-6 md:grid-cols-4">
                {mergedCategories.map((cat) => (
                  <button
                    key={String(cat.id)}
                    type="button"
                    onClick={() => handleOpen(cat.id)}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#1C2D38] px-8 py-10 text-left shadow-sm transition hover:border-white/20 hover:bg-[#182833] focus:outline-none focus:ring-2 focus:ring-orange-400/60"
                  >
                    {/* Icon placeholder */}
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
                      {/* TODO: put <img src="..." /> here */}
                    </div>

                    {/* Title */}
                    <div className="mt-10 text-center">
                      <h3 className="text-xl font-extrabold text-white">
                        {cat.name}
                      </h3>
                    </div>

                    {/* subtle inner ring */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Removed bottom strip so the panel is one solid color */}
        </div>
      </div>
    </section>
  );
};

export default CategorySelectPage;
