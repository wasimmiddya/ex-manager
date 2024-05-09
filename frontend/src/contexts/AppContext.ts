import { createContext } from "react";

export const AppContext = createContext({
  user: { fullName: "", email: "", role: "", avater: "" },
  isLoggedIn: false
});
