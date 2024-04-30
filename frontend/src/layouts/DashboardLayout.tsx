import { FC } from "react";
import { Outlet } from "react-router-dom";
import { data } from "../constants";

const DashboardLayout: FC = () => {
  let total_claimed = 0;
  let total_approved = 0;

  data.map((e) => {
    total_claimed += e.amtClaimed;
  });

  data.map((e) => {
    total_approved += e.amtApproved;
  });

  return (
    <div className="mx-20">
      <div className="my-10 flex items-center space-x-10">
        <div className="py-4 px-10 bg-white rounded-md text-center text-slate-600 ">
          <span className="pb-2 text-2xl font-bold font-comfortaa">
            Reports <span className="text-red-500">{data.length}</span>
          </span>
          <div className="h-1 mt-2 bg-red-500 rounded-3xl w-full" />
        </div>
        <div className="py-4 px-10 bg-white rounded-md text-center text-slate-600 ">
          <span className="pb-2 text-2xl font-bold font-comfortaa">
            Total Claim $<span className="text-red-500">{total_claimed}</span>
          </span>
          <div className="h-1 mt-2 bg-red-500 rounded-3xl w-full" />
        </div>
        <div className="py-4 px-10 bg-white rounded-md text-center text-slate-600 ">
          <span className="pb-2 text-2xl font-bold font-comfortaa">
            Approved $<span className="text-red-500">{total_approved}</span>
          </span>
          <div className="h-1 mt-2 bg-red-500 rounded-3xl w-full" />
        </div>
      </div>
      <div >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
