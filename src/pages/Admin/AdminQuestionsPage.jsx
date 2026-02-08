// src/pages/Admin/AdminQuestionsPage.jsx
import React, { useState, useMemo } from "react";
import { useData } from "../../contexts/DataContext";

const AdminQuestionsPage = () => {
  const {
    questions,
    categories,
    addQuestion,
    updateQuestion,
    toggleQuestionActive,
    deleteQuestion,
  } = useData();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    text: "",
    categoryId: "",
    options: ["", "", "", ""],
    correctIndex: 0,
  });

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const inText = q.text.toLowerCase().includes(search.toLowerCase());
      const cat = categories.find((c) => c.id === q.categoryId);
      const inCat = cat?.name.toLowerCase().includes(search.toLowerCase());
      return inText || inCat;
    });
  }, [questions, search, categories]);

  const resetForm = () => {
    setForm({
      text: "",
      categoryId: "",
      options: ["", "", "", ""],
      correctIndex: 0,
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { text, categoryId, options, correctIndex } = form;
    if (!text.trim() || !categoryId) return;
    if (options.some((o) => !o.trim())) return;

    const formattedOptions = options.map((text, idx) => ({
      id: String.fromCharCode(97 + idx), // a,b,c,d
      text,
      isCorrect: idx === Number(correctIndex),
    }));

    if (editingId) {
      updateQuestion(editingId, {
        text: text.trim(),
        categoryId: Number(categoryId),
        options: formattedOptions,
      });
    } else {
      addQuestion({
        text: text.trim(),
        categoryId: Number(categoryId),
        options: formattedOptions,
      });
    }

    resetForm();
  };

  const handleEdit = (q) => {
    setEditingId(q.id);
    setForm({
      text: q.text,
      categoryId: String(q.categoryId),
      options: q.options.map((o) => o.text),
      correctIndex: q.options.findIndex((o) => o.isCorrect),
    });
  };

  return (
    <div>
      <h2>مدیریت سؤالات</h2>

      <div className="admin-filters">
        <input
          placeholder="جستجو بر اساس متن سؤال یا دسته‌بندی..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editingId ? "ویرایش سؤال" : "افزودن سؤال جدید"}</h3>
        <div>
          <label>متن سؤال</label>
          <textarea
            value={form.text}
            onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
            required
          />
        </div>
        <div>
          <label>دسته‌بندی</label>
          <select
            value={form.categoryId}
            onChange={(e) =>
              setForm((f) => ({ ...f, categoryId: e.target.value }))
            }
            required
          >
            <option value="">انتخاب کنید</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="options-form">
          <label>گزینه‌ها (یکی باید صحیح باشد)</label>
          {form.options.map((opt, idx) => (
            <div key={idx} className="option-row">
              <input
                value={opt}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm((f) => {
                    const options = [...f.options];
                    options[idx] = value;
                    return { ...f, options };
                  });
                }}
                placeholder={`گزینه ${idx + 1}`}
                required
              />
              <label>
                <input
                  type="radio"
                  name="correctOption"
                  checked={Number(form.correctIndex) === idx}
                  onChange={() => setForm((f) => ({ ...f, correctIndex: idx }))}
                />
                صحیح
              </label>
            </div>
          ))}
        </div>

        <button type="submit">
          {editingId ? "ذخیره ویرایش" : "افزودن سؤال"}
        </button>
        {editingId && <button onClick={resetForm}>انصراف از ویرایش</button>}
      </form>

      <h3>لیست سؤالات</h3>
      <table>
        <thead>
          <tr>
            <th>متن سؤال</th>
            <th>دسته‌بندی</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q) => {
            const cat = categories.find((c) => c.id === q.categoryId);
            return (
              <tr key={q.id}>
                <td>{q.text}</td>
                <td>{cat ? cat.name : "نامشخص"} </td>
                <td>{q.active ? "فعال" : "غیرفعال"}</td>
                <td>
                  <button onClick={() => handleEdit(q)}>ویرایش</button>
                  <button onClick={() => toggleQuestionActive(q.id)}>
                    {q.active ? "غیرفعال‌سازی" : "فعال‌سازی"}
                  </button>
                  <button onClick={() => deleteQuestion(q.id)}>نرم‌حذف</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuestionsPage;
