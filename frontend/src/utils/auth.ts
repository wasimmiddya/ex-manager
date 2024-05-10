import Cookies from "js-cookie";

export const verifyUser = () => {
  const cookieUser = Cookies.get("user");

  if (cookieUser) {
    const user = JSON.parse(cookieUser);
    if (user.role === "USER") {
      return true;
    }
  }

  return false;
};

export const verifyAdmin = () => {
  const cookieUser = Cookies.get("user");

  if (cookieUser) {
    const user = JSON.parse(cookieUser);
    if (user.role === "ADMIN") {
      return true;
    }
  }

  return false;
};
