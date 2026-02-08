// src/contexts/DataContext.jsx
import React, { createContext, useContext, useState } from "react";
import { initialCategories } from "../data/categories";
import { initialQuestions } from "../data/questions";
import { initialUsers } from "../data/users";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [questions, setQuestions] = useState(initialQuestions);
  const [users, setUsers] = useState(initialUsers);

  // ---------- User operations ----------
  const addUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const updateUser = (userId, updates) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
  };

  const updateUserStatus = (userId, status) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );
  };

  const updateUserRole = (userId, role) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
  };

  // ثبت نتیجه بازی – تاریخچه + امتیاز کلی
  const recordGameResult = (userId, categoryId, score) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const newGame = {
          id: Date.now(),
          date: new Date().toISOString(),
          categoryId,
          score,
        };
        return {
          ...u,
          games: [...(u.games || []), newGame],
          totalScore: (u.totalScore || 0) + score,
        };
      })
    );
  };

  // ---------- Category operations ----------
  const addCategory = (name, description) => {
    const exists = categories.some(
      (c) => c.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (exists) {
      throw new Error("نام دسته‌بندی تکراری است");
    }
    const newCategory = {
      id: categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      name,
      description,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id, updates) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id) => {
    // ساده: فقط اگر سوال فعال متصل ندارد حذف کن
    const hasActiveQuestions = questions.some(
      (q) => q.categoryId === id && q.active
    );
    if (hasActiveQuestions) {
      throw new Error(
        "برای حذف دسته‌بندی ابتدا سوالات فعال مرتبط را غیرفعال کنید."
      );
    }
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // ---------- Question operations ----------
  const addQuestion = (question) => {
    const newQuestion = {
      ...question,
      id: questions.length ? Math.max(...questions.map((q) => q.id)) + 1 : 1,
      active: question.active ?? true,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const updateQuestion = (id, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const toggleQuestionActive = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, active: !q.active } : q))
    );
  };

  const deleteQuestion = (id) => {
    // نرم‌حذف: active = false
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, active: false } : q))
    );
  };

  const value = {
    categories,
    questions,
    users,
    addUser,
    updateUser,
    updateUserStatus,
    updateUserRole,
    recordGameResult,
    addCategory,
    updateCategory,
    deleteCategory,
    addQuestion,
    updateQuestion,
    toggleQuestionActive,
    deleteQuestion,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData باید داخل DataProvider استفاده شود");
  return ctx;
};
