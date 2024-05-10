import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import NavButtons from "./NavButtons";
import ProfileCard from "./ProfileCard";

const Navbar: FC = () => {
  const {isLoggedIn} = useContext(AppContext)
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
        {
          isLoggedIn ?  <ProfileCard />: <NavButtons />
        }
      </div>
    </nav>
  );
};

export default Navbar;
