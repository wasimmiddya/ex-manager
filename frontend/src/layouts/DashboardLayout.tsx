import { FC, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";

const DashboardLayout: FC = () => {
  const { user } = useContext(AppContext);
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      if (user?.role) {
        const res = await axios.get(
          `/api/v1/bills/${user.role.toLowerCase()}/aggregate_bill`
        ).then(res => res.data).catch((err) => {
          console.log(err);
          return null;
        });

        if(res) {
          setData(res.data);
        }
      }
    })();
  });

  return (
    <div className="mx-20">
      <div className="my-10 flex items-center space-x-10">
        <div className="py-4 px-10 bg-white rounded-md text-center text-slate-600 ">
          <span className="pb-2 text-2xl font-bold font-comfortaa">
            Records{" "}
            <span className="text-red-500">{data?._count._all || 0}</span>
          </span>
          <div className="h-1 mt-2 bg-red-500 rounded-3xl w-full" />
        </div>
        <div className="py-4 px-10 bg-white rounded-md text-center text-slate-600 ">
          <span className="pb-2 text-2xl font-bold font-comfortaa">
            Total Claim $
            <span className="text-red-500">
              {data?._sum.amount_claimed.toFixed(2) || 0}
            </span>
          </span>
          <div className="h-1 mt-2 bg-red-500 rounded-3xl w-full" />
        </div>
        <div className="py-4 px-10 bg-white rounded-md text-center text-slate-600 ">
          <span className="pb-2 text-2xl font-bold font-comfortaa">
            Total Approved $
            <span className="text-red-500">
              {data?._sum.amount_approved.toFixed(2) || 0}
            </span>
          </span>
          <div className="h-1 mt-2 bg-red-500 rounded-3xl w-full" />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
