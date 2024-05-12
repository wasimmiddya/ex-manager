import { ChangeEventHandler, FC, useState } from "react";
import { searchReportOption } from "../constants";
import { MdOpenInNew } from "react-icons/md";
import { NavLink, Navigate } from "react-router-dom";
import { verifyAdmin } from "../utils/auth";
import { useFetch } from "../hooks/useFetch";

const AdminDashboard: FC = () => {
  const [searchOprion, setSearchOption] = useState(searchReportOption[0]);
  const isAuthorized = verifyAdmin();
  const data = useFetch("/api/v1/bills/get_admin_bills")

  const handleSelectInputChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    setSearchOption(value);
  };

  if (!isAuthorized) {
    return <Navigate to={"/auth/signin"} replace />;
  }

  return (
    <div className="bg-white  px-10 py-7 mx-auto rounded-2xl">
      <div className=" flex justify-between items-center">
        <div className="space-x-4">
          <select
            name="searchBy"
            onChange={handleSelectInputChange}
            className="bg-red-500 text-white font-semibold rounded focus:outline-2 focus:outline-red-400 py-0.5"
          >
            {searchReportOption.map((elem, id) => (
              <option key={id} value={elem} className="bg-white text-black">
                {elem}
              </option>
            ))}
          </select>
          <input
            type="search"
            placeholder={`🔍Search by ${searchOprion}`}
            className="border-2 border-slate-400 rounded focus:border-red-500 focus:outline-none p-0.5"
          />
        </div>
        <div>
          <div>
            <label>Search by : </label>
            <input type="date" className="border p-1 text-slate-600" />
          </div>
        </div>
      </div>
      <div>
        <table className="w-full">
          <caption className="font-comfortaa mb-4 text-4xl text-slate-600 font-bold">
            Admin <span className="text-red-500 ">Table</span>{" "}
          </caption>
          <thead className="text-slate-600 font-montserrat bg-white ">
            <tr>
              <th className="text-left py-2 border-b-2 border-red-500">
                Avater
              </th>
              <th className="text-left py-2 border-b-2 border-red-500">
                Employee <br /> Name
              </th>
              <th className="text-left py-2 border-b-2 border-red-500">
                Employee <br /> Email ID
              </th>
              <th className="text-left py-2 border-b-2 border-red-500">
                Expenditure
              </th>
              <th className="text-left py-2 border-b-2 border-red-500">
                Submitted On
              </th>

              <th className="text-left py-2 border-b-2 border-red-500">
                Amount Claimed
              </th>

              <th className="text-left py-2 border-b-2 border-red-500">
                Status
              </th>
              <th className="text-center py-2 border-b-2 border-red-500">
                Open
              </th>
            </tr>
          </thead>
          <tbody className="mt-4 h-12 text-slate-500 font-montserrat">
            {data ? data.map((elem: any) => (
              <tr key={elem.id} className="odd:bg-slate-100">
                <td className="py-2">
                  <img src={elem.user.avater} alt="logo" className="w-7 h-7 ml-4 rounded-full border border-blue-500" />
                </td>
                <td className="py-2">{elem.user.full_name}</td>
                <td className="py-2 text-sm">{elem.user.email}</td>
                <td className="py-2 text-sm">{elem.expenditure}</td>
                <td className="py-2">{elem.submitted_on}</td>
                <td className="py-2">${elem.amount_claimed}</td>
                <td className="py-2">{elem.status}</td>
                <td className="flex justify-center">
                  <button>
                    {
                      <NavLink to={`/dashboard/view-admin-rep/${elem.id}`}>
                        <MdOpenInNew className="w-7 mt-2 bg-red-500 rounded p-1 text-white text-xl" />
                      </NavLink>
                    }
                  </button>
                </td>
              </tr>
            )): <tr><td className="text-2xl text-slate-500">Loading contents...</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
