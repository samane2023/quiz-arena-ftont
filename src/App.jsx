// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import PrivateRoute from "./components/Layout/PrivateRoute";

import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import CategorySelectPage from "./pages/Game/CategorySelectPage";
import GamePage from "./pages/Game/GamePage";
import ResultPage from "./pages/Game/ResultPage";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";

import AdminLayout from "./pages/Admin/AdminLayout";
import AdminQuestionsPage from "./pages/Admin/AdminQuestionsPage";
import AdminCategoriesPage from "./pages/Admin/AdminCategoriesPage";
import AdminUsersPage from "./pages/Admin/AdminUsersPage";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategorySelectPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/game/:categoryId"
          element={
            <PrivateRoute>
              <GamePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/result"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <LeaderboardPage />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requireAdmin>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="questions" element={<AdminQuestionsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export default App;
