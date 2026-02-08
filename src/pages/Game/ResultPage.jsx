// src/pages/Game/ResultPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataContext";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories } = useData();
  const state = location.state;

  if (!state) {
    return (
      <section>
        <h1>نتیجه بازی</h1>
        <p>اطلاعات بازی یافت نشد.</p>
      </section>
    );
  }

  const { totalQuestions, correctCount, score, categoryId } = state;
  const category = categories.find((c) => c.id === categoryId);

  return (
    <section>
      <h1>نتیجه نهایی بازی</h1>
      {category && <h2>دسته‌بندی: {category.name}</h2>}
      <p>تعداد سؤالات: {totalQuestions}</p>
      <p>پاسخ‌های صحیح: {correctCount}</p>
      <p>کل امتیاز این بازی: {score}</p>

      <div className="result-actions">
        <button onClick={() => navigate("/categories")}>شروع بازی جدید</button>
        <button onClick={() => navigate("/profile")}>بازگشت به پروفایل</button>
      </div>
    </section>
  );
};

export default ResultPage;
