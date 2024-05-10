import { useContext, FC } from "react";
import { AppContext } from "../contexts/AppContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileCard: FC = () => {
  const { user } = useContext(AppContext);
  const { setUser, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    Cookies.remove("user");
    setUser(null as any);
    setIsLoggedIn(false);
    await axios.post("/api/v1/user/signout").then((res) => {
      console.log("Sign out!!!", res.data.message);
    });
    navigate("/");
  };

  return (
    <div className="flex space-x-6 items-center">
      <div className="flex space-x-3 font-montserrat">
        <div>
          <img
            src={user?.avater}
            alt="avater-image"
            className="w-10 h-10 rounded-full  border-2 border-red-500"
          />
        </div>
        <div className="">
          <h5 className="text-slate-600 text-sm font-semibold">
            {user?.fullName}
          </h5>
          <p className="text-slate-500 text-xs">{user?.role}</p>
        </div>
      </div>
      <div>
        <button
          className="py-1 px-2 rounded bg-red-500 text-white font-comfortaa font-bold text-xs"
          onClick={handleSignOut}
        >
          SignOut
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
