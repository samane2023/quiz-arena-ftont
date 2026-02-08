// src/pages/Admin/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <section>
      <h1>پنل مدیریت</h1>
      <nav className="admin-nav">
        <NavLink to="/admin/questions">سؤالات</NavLink>
        <NavLink to="/admin/categories">دسته‌بندی‌ها</NavLink>
        <NavLink to="/admin/users">کاربران</NavLink>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </section>
  );
};

export default AdminLayout;
