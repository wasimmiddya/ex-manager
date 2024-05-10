"use-client";

import axios from "axios";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useContext,
  useState,
} from "react";
import { useErrorBoundary } from "react-error-boundary";
import Cookies from "js-cookie";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignIn: FC = () => {
  const [inputFields, setInputFields] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const { setUser, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value, name },
  }) => {
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);

    setInputFields({ email: "", password: "" });

    const response = await axios
      .post("/api/v1/user/signin", inputFields)
      .then((res) => res.data)
      .catch((err) => {
        const statusCode = err.response.status;
        // explicitly throwing errors
        if (statusCode >= 400 && statusCode < 500)
          showBoundary(new Error("Invalid credentials"));
        else if (statusCode >= 500)
          showBoundary(
            new Error(
              "Internal Error, we are trying to fix as soon as possible"
            )
          );
      });

    // set the cookie for client side authentication
    Cookies.set("user", JSON.stringify(response.data), {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60), // expires in 1 hour
    });

    // to avoid any kindy of accidental flow
    if (response >= 400) return;
    

    setUser(response.data);
    setIsLoggedIn(true);
    setLoading(false);

    if(response.data.role === "USER")
      navigate("/dashboard/user");
    if(response.data.role === "ADMIN")
      navigate("/dashboard/admin");

  };

  return (
    <div className="w-[55%] bg-white rounded-md px-5 py-2 font-montserrat">
      <div>
        <h3 className="text-3xl text-center font-comfortaa font-bold my-5">
          Sign<span className="text-red-500">In</span>
        </h3>
      </div>
      <form className="space-y-5 px-6" onSubmit={handleFormSubmit}>
        <div>
          <input
            type="email"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="Enter Email"
            name="email"
            onChange={handleInputChange}
            value={inputFields.email}
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="Enter Password"
            name="password"
            onChange={handleInputChange}
            value={inputFields.password}
          />
        </div>
        <div className="flex justify-center">
          <button className="px-8 py-[2px] font-comfortaa bg-red-500 rounded-md text-white font-semibold my-5">
            {loading ? "Loading..." : "SignIn"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
