import { SetStateAction, createContext, Dispatch } from "react";

export const AppContext = createContext<{
  user: {
    fullName: string;
    role: "USER" | "ADMIN" | "";
    avater: string;
  } | null;
  setUser: Dispatch<
    SetStateAction<{
      fullName: string;
      role: string;
      avater: string;
    }>
  >;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
