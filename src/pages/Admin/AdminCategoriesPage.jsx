// src/pages/Admin/AdminCategoriesPage.jsx
import React, { useState } from "react";
import { useData } from "../../contexts/DataContext";

const AdminCategoriesPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
    setError("");
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("نام دسته‌بندی الزامی است");
      return;
    }
    try {
      if (editingId) {
        updateCategory(editingId, {
          name: name.trim(),
          description: description.trim(),
        });
      } else {
        addCategory(name.trim(), description.trim());
      }
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    try {
      deleteCategory(id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>مدیریت دسته‌بندی‌ها</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editingId ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}</h3>
        <div>
          <label>نام</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{editingId ? "ذخیره تغییرات" : "افزودن"}</button>
        {editingId && <button onClick={resetForm}>انصراف</button>}
      </form>

      <h3>فهرست دسته‌بندی‌ها</h3>
      <table>
        <thead>
          <tr>
            <th>نام</th>
            <th>توضیح</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button onClick={() => startEdit(cat)}>ویرایش</button>
                <button onClick={() => handleDelete(cat.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoriesPage;
