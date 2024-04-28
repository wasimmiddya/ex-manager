import { FC } from "react";

const SignIn: FC = () => {
  return (
    <div className="w-[55%] bg-white rounded-md px-5 py-2 font-montserrat">
      <div>
        <h3 className="text-3xl text-center font-comfortaa font-bold my-5">
          Sign<span className="text-red-500">In</span>
        </h3>
      </div>
      <form action="" className="space-y-5 px-6">
        <div>
          <input
            type="email"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="Enter Email"
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full border-b-2 border-slate-400 text-slate-500 py-[2px] focus:border-b-red-500 focus:outline-none placeholder:text-slate-500"
            required
            placeholder="Enter Password"
          />
        </div>
        <div className="mt-2 space-x-5">
          <label htmlFor="role" className="text-slate-500">SignIn as : </label>
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
        <div className="flex justify-center">
          <button className="px-8 py-[2px] font-comfortaa bg-red-500 rounded-md text-white font-semibold my-5">
            SignIn
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
