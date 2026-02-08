// src/pages/Profile/ProfilePage.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const { categories = [] } = useData();

  const [username, setUsername] = useState(() => currentUser?.username ?? "");
  const [bio, setBio] = useState(() => currentUser?.bio ?? "");
  const [avatarPreview, setAvatarPreview] = useState(
    () => currentUser?.avatarUrl ?? ""
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!currentUser) return null;

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Display name cannot be empty.");
      setSuccess("");
      return;
    }

    updateProfile({ username: username.trim(), bio: bio.trim() });
    setError("");
    setSuccess("Profile updated successfully.");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      setSuccess("");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be 2MB or less.");
      setSuccess("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      updateProfile({ avatarUrl: reader.result });
      setSuccess("Profile picture updated.");
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Unknown";
  };

  return (
    // Matches MainLayout: dark theme, English, LTR, no page background override
    <section dir="ltr" className="py-10">
      <div className="mx-auto w-full max-w-5xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Update your account details and view your game history.
          </p>
        </div>

        {/* Top Card */}
        <div className="rounded-2xl border border-[#2C565D]/40 bg-[#223946] shadow-sm">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12">
            {/* Avatar + Score */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile avatar"
                      className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/10"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1C2D38] text-sm font-medium text-white/60 ring-2 ring-white/10">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    Profile Picture
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/60">
                    JPG/PNG • Max 2MB
                  </p>

                  <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#1C2D38] px-3 py-2 text-sm font-semibold text-white/80 shadow-sm transition hover:border-[#2C565D]/60 hover:bg-[#182833] focus:outline-none focus:ring-2 focus:ring-[#2C565D]/70">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-[#1C2D38] p-4">
                <p className="text-sm font-semibold text-white">Total Score</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white">
                    {currentUser.totalScore || 0}
                  </span>
                  <span className="text-sm text-white/70">points</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/90">
                      Email (read-only)
                    </label>
                    <input
                      type="email"
                      value={currentUser.email}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/70 shadow-sm outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/90">
                      Display Name
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#1C2D38] px-4 py-3 text-sm text-white shadow-sm outline-none transition focus:border-[#2C565D]/80 focus:ring-2 focus:ring-[#2C565D]/40"
                      placeholder="e.g. Hamid"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/90">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#1C2D38] px-4 py-3 text-sm text-white shadow-sm outline-none transition focus:border-[#2C565D]/80 focus:ring-2 focus:ring-[#2C565D]/40"
                      placeholder="A short description about you..."
                    />
                  </div>
                </div>

                {/* Alerts */}
                <div aria-live="polite" className="space-y-3">
                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                      {success}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:ring-offset-2 focus:ring-offset-[#223946]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="mt-8 rounded-2xl border border-[#2C565D]/40 bg-[#223946] p-5 shadow-sm sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-white">Game History</h2>
            <span className="rounded-full border border-white/10 bg-[#1C2D38] px-3 py-1 text-xs font-semibold text-white/80">
              {currentUser.games?.length || 0} games
            </span>
          </div>

          {!currentUser.games || currentUser.games.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-[#1C2D38] p-6 text-sm text-white/70">
              You haven&apos;t played any games yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="sticky top-0 border-b border-white/10 bg-[#2C565D] px-4 py-3 text-left text-xs font-extrabold text-white">
                      Date
                    </th>
                    <th className="sticky top-0 border-b border-white/10 bg-[#2C565D] px-4 py-3 text-left text-xs font-extrabold text-white">
                      Category
                    </th>
                    <th className="sticky top-0 border-b border-white/10 bg-[#2C565D] px-4 py-3 text-left text-xs font-extrabold text-white">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser.games.map((game, idx) => (
                    <tr
                      key={game.id}
                      className={
                        idx % 2 === 0 ? "bg-[#223946]" : "bg-[#1f3442]"
                      }
                    >
                      <td className="border-b border-white/10 px-4 py-3 text-sm text-white/85">
                        {new Date(game.date).toLocaleString("en-US")}
                      </td>
                      <td className="border-b border-white/10 px-4 py-3 text-sm text-white/75">
                        {getCategoryName(game.categoryId)}
                      </td>
                      <td className="border-b border-white/10 px-4 py-3 text-sm font-extrabold text-white">
                        {game.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
