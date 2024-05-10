import { FC } from "react";
import { NavLink } from "react-router-dom";

const NavButtons: FC = () => {
  return (
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
  );
};

export default NavButtons;
