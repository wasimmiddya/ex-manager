import { ChangeEventHandler, FC, useState } from "react";

const SignUp: FC = () => {
  const [code, setCode] = useState("+91");

  const countryCodeNo = [
    { country: "IND", code: "+91" },
    { country: "BNGD", code: "+880" },
    { country: "AUS", code: "+61" },
    { country: "BLG", code: "+32" },
    { country: "CHN", code: "+86" },
    { country: "FRN", code: "+33" },
    { country: "GRM", code: "+49" },
    { country: "UK", code: "+44" },
    { country: "USA", code: "+1" },
    { country: "JPN", code: "+81" },
  ];

  const handleChangeSelect: ChangeEventHandler<HTMLSelectElement> = ({target: {value}}) => {
    setCode(value);
  };

  return (
    <div className="w-[60%] bg-white rounded-md px-5 py-2 font-montserrat">
      <div>
        <h3 className="text-3xl text-center font-comfortaa font-bold my-5">
          Sign<span className="text-red-500">Up</span>
        </h3>
      </div>
      <form action="" className="space-y-5 px-6">
        <div className="flex space-x-2">
          <div>
            <input
              type="text"
              className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
              required
              placeholder="First Name"
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div>
          <input
            type="email"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <div className="flex space-x-4">
            <select
              name="country"
              className="bg-red-500 rounded-md text-white p-[2px] focus:outline-1 focus:outline-red-300"
              onChange={handleChangeSelect}
            >
              {countryCodeNo.map(({ code, country }) => {
                return (
                  <option
                    value={code}
                    className="bg-white text-black border-none w-16"
                  >
                    {country}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
              required
              placeholder={`${code}`}
            />
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
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-8 py-[2px] font-comfortaa bg-red-500 rounded-md text-white font-semibold my-5">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
