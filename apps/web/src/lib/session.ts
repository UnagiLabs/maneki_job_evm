import type { User } from "@/types";

const SESSION_KEY = "maneki_session";

export const session = {
  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  setUser: (user: User): void => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  clear: (): void => {
    localStorage.removeItem(SESSION_KEY);
  },

  isAuthenticated: (): boolean => {
    return session.getUser() !== null;
  },
};

export const mockUser: User = {
  id: "user-1",
  name: "テストユーザー",
  email: "test@example.com",
  avatar: "https://via.placeholder.com/150/6366f1/ffffff?text=TU",
  createdAt: new Date().toISOString(),
};
