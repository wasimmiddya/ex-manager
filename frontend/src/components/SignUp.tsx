import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { countryCodeNo } from "../constants";
import axios, { AxiosRequestConfig } from "axios";

const SignUp: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInputs, setSelectedInputs] = useState<{
    countryCode: string;
    role: "USER" | "ADMIN";
  }>({
    countryCode: "+91",
    role: "USER",
  });

  const [fieldInputs, setFieldInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [avater, setAvater] = useState<File | null>();

  const handleChangeSelect: ChangeEventHandler<HTMLSelectElement> = ({
    target: { name, value },
  }) => {
    setSelectedInputs({ ...selectedInputs, [name]: value });
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setFieldInputs({
      ...fieldInputs,
      [name]: value,
    });
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setAvater(event.target.files[0]);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const user = { ...fieldInputs, ...selectedInputs };

    const formData = new FormData();

    formData.append("data", JSON.stringify(user));
    formData.append("avater", avater ? avater : "");

    const config: AxiosRequestConfig<FormData> = {
      headers: {
        "Content-Type": "multipart/form",
      },
    };

    const response = await axios
      .post("/user/register", formData, config)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
      });

    console.log(response);

    setIsLoading(false);
  };

  return (
    <div className="w-[60%] bg-white rounded-md px-5 py-2 font-montserrat">
      <div>
        <h3 className="text-3xl text-center font-comfortaa font-bold my-5">
          Sign<span className="text-red-500">Up</span>
        </h3>
      </div>
      <form
        className="space-y-5 px-6"
        onSubmit={handleSubmit}
        encType="multipart/form"
      >
        <div className="flex space-x-2">
          <div>
            <input
              type="text"
              className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
              required
              placeholder="First Name"
              name="fname"
              onChange={handleInputChange}
              value={fieldInputs.fname}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
              placeholder="Last Name"
              name="lname"
              onChange={handleInputChange}
              value={fieldInputs.lname}
            />
          </div>
        </div>
        <div>
          <input
            type="email"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="example@gmail.com"
            name="email"
            onChange={handleInputChange}
            value={fieldInputs.email}
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={fieldInputs.password}
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleInputChange}
            value={fieldInputs.confirmPassword}
          />
        </div>
        <div>
          <div className="flex space-x-4">
            <select
              name="countryCode"
              className="bg-red-500 rounded-md text-white p-[2px] focus:outline-1 focus:outline-red-300"
              onChange={handleChangeSelect}
            >
              {countryCodeNo.map(({ code, country }) => {
                return (
                  <option
                    key={code}
                    value={code}
                    className="bg-white text-black border-none w-16"
                  >
                    {country}
                  </option>
                );
              })}
            </select>
            <div className="flex items-center justify-end space-x-3 w-full text-center">
              <span className="border-b-2 border-red-500 text-red-500">
                {selectedInputs.countryCode}{" "}
              </span>
              <div className="w-full">
                <input
                  type="text"
                  className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
                  required
                  placeholder="Mobile No."
                  name="mobile"
                  onChange={handleInputChange}
                  value={fieldInputs.mobile}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="mt-2 space-x-3">
            <label htmlFor="role" className="text-slate-500">
              Role :
            </label>
            <select
              name="role"
              id="role"
              className="bg-red-500 text-white p-[2px] rounded-md focus:outline-1 focus:outline-red-300"
            >
              <option value="USER" className="bg-white text-black p-1">
                USER
              </option>
              <option value="ADMIN" className="bg-white text-black p-1">
                ADMIN
              </option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="avater" className="text-slate-500">
              Avater :{" "}
            </label>
            <input
              type="file"
              className="file:bg-red-500 file:border-none file:rounded-md file:text-white file:w-32  text-sm file:hover:cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-[2px] font-comfortaa bg-red-500 rounded-md text-white font-semibold my-5"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "SignUp"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
