import React, { FC, useState } from "react";
import { AppContext } from "./AppContext";

interface ContextProps {
  children: React.ReactNode;
}

const AppContextProvider: FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    role: "",
    avater: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn } as any}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
