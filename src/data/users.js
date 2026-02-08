// src/data/users.js
export const initialUsers = [
  {
    id: 1,
    email: "admin@example.com",
    username: "admin",
    password: "Admin1234", // الان plain text، بعداً می‌ره سمت hash در backend
    bio: "مدیر سیستم",
    avatarUrl: "",
    totalScore: 0,
    games: [], // {id, date, categoryId, score}
    role: "admin", // 'user' | 'admin'
    status: "active", // 'active' | 'blocked'
  },
];
