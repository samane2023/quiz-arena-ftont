// src/pages/Admin/AdminUsersPage.jsx
import React, { useState, useMemo } from "react";
import { useData } from "../../contexts/DataContext";

const AdminUsersPage = () => {
  const { users, updateUserStatus, updateUserRole } = useData();
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const t = search.toLowerCase();
      return (
        u.email.toLowerCase().includes(t) ||
        u.username.toLowerCase().includes(t) ||
        (u.status || "").toLowerCase().includes(t)
      );
    });
  }, [users, search]);

  return (
    <div>
      <h2>مدیریت کاربران</h2>
      <div className="admin-filters">
        <input
          placeholder="جستجو بر اساس ایمیل، نام یا وضعیت..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ایمیل</th>
            <th>نام نمایشی</th>
            <th>وضعیت</th>
            <th>نقش</th>
            <th>امتیاز کلی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{u.status}</td>
              <td>{u.role}</td>
              <td>{u.totalScore || 0}</td>
              <td>
                <button
                  onClick={() =>
                    updateUserStatus(
                      u.id,
                      u.status === "active" ? "blocked" : "active"
                    )
                  }
                >
                  {u.status === "active" ? "مسدود کردن" : "فعال کردن"}
                </button>
                <button
                  onClick={() =>
                    updateUserRole(u.id, u.role === "admin" ? "user" : "admin")
                  }
                >
                  تغییر نقش به {u.role === "admin" ? "کاربر" : "ادمین"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
