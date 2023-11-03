import { UserData } from "@/types/courses.types";
import { create } from "zustand";

interface AuthState {
  user: UserData | null;
  isLoggedIn: boolean;
  logIn: (user: UserData) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  let userFromStorage = null;
  let initialUser = null;

  if (typeof window !== "undefined") {
    userFromStorage =
      localStorage.getItem("user") === "undefined"
        ? null
        : localStorage.getItem("user");
    initialUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  }

  return {
    user: initialUser,
    isLoggedIn: initialUser !== null,
    logIn: (user: UserData) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isLoggedIn: true });
    },
    logOut: () => {
      localStorage.removeItem("user");
      set({ user: null, isLoggedIn: false });
    },
  };
});
