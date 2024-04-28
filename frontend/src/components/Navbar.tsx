import { FC } from "react";
import { NavLink } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <nav className="bg-white px-16 py-3 font-comfortaa grid grid-cols-2">
      <div>
        <div>
          <NavLink to={"/"}>
            <img src="/nav-logo.svg" alt="logo" className="w-40" />
          </NavLink>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div>
          <ul className="flex justify-end space-x-8">
            <li>
              <NavLink
                to={"/auth/signin"}
                className={({ isActive }) => {
                  return `py-[2px] font-bold animated-link text-lg text-neutral-700 ${
                    isActive ? "text-red-500" : ""
                  }`;
                }}
              >
                SignIn
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/auth/signup"}
                className={({ isActive }) => {
                  return `py-[2px] font-bold animated-link text-lg text-neutral-700 ${
                    isActive ? "text-red-500" : ""
                  }`;
                }}
              >
                SignUp
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
