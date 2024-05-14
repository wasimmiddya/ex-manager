import { ChangeEventHandler, FC, useState } from "react";
import { searchByOptions } from "../constants";
import { FaEye } from "react-icons/fa";
import { BiSolidReceipt } from "react-icons/bi";
import { NavLink, Navigate } from "react-router-dom";
import { verifyUser } from "../utils/auth";
import { useFetch } from "../hooks/useFetch";

const UserDashboard: FC = () => {
  const [searchOption, setSearchOption] = useState(searchByOptions[0]);
  const [search, setSearch] = useState("");
  const isAuthorized = verifyUser();
  const data: any = useFetch("/api/v1/bills/get_user_bills");

  const handleSelectInputChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    setSearchOption(value);
  };

  const hadndleSearchInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setSearch(value);
  };

  if (!isAuthorized) {
    return <Navigate to={"/auth/signin"} />;
  }

  return (
    <>
      <div className="bg-white  px-10 py-7 mx-auto rounded-2xl">
        <div className=" flex justify-between items-center">
          <div className="space-x-4">
            <select
              name="searchBy"
              onChange={handleSelectInputChange}
              className="bg-red-500 text-white font-semibold rounded focus:outline-2 focus:outline-red-400 py-0.5"
            >
              {searchByOptions.map((elem, id) => (
                <option key={id} value={elem} className="bg-white text-black">
                  {elem}
                </option>
              ))}
            </select>
            <input
              type="search"
              placeholder={`🔍Search by ${searchOption}`}
              className="border-2 border-slate-400 rounded focus:border-red-500 focus:outline-none p-0.5"
              onChange={hadndleSearchInputChange}
              value={search}
            />
          </div>
          <div>
            <button className="py-1 px-4 rounded bg-red-500 text-white font-semibold font-montserrat">
              <NavLink to={"/dashboard/new-request"}>New Request</NavLink>
            </button>
          </div>
        </div>
        <div>
          <table className="w-full">
            <caption className="font-comfortaa mb-4 text-4xl text-slate-600 font-bold">
              Requests <span className="text-red-500 ">Table</span>{" "}
            </caption>
            <thead className="text-slate-600 font-montserrat bg-white ">
              <tr>
                <th className="text-left py-2 border-b-2 border-red-500">
                  Expenditures
                </th>
                <th className="text-left py-2 border-b-2 border-red-500">
                  Receipts
                </th>
                <th className="text-left py-2 border-b-2 border-red-500">
                  Submitted On
                </th>
                <th className="text-left py-2 border-b-2 border-red-500">
                  Approved On
                </th>
                <th className="text-left py-2 border-b-2 border-red-500">
                  Amount Claimed
                </th>
                <th className="text-left py-2 border-b-2 border-red-500">
                  Amount Approved
                </th>
                <th className="text-left py-2 border-b-2 border-red-500">
                  Status
                </th>
                <th className="text-center py-2 border-b-2 border-red-500">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="mt-4 h-12 text-slate-500 font-montserrat">
              {data !== null ? (
                data
                  ?.filter((elem: any) => {
                    if (search.toLowerCase() === "") {
                      return elem;
                    } else if (searchOption === "EXP") {
                      return elem.expenditure
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    } else if (searchOption === "DATE") {
                      return elem.submitted_on
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    } else if (searchOption === "STATUS") {
                      return elem.status
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    }
                  })
                  .map((elem: any) => (
                    <tr key={elem.id}>
                      <td className="py-2">{elem.expenditure}</td>
                      <td>
                        <button>
                          <BiSolidReceipt className="ml-7 hover:text-red-500 text-lg" />
                        </button>
                      </td>
                      <td className="py-2">{elem.submitted_on}</td>
                      <td className="py-2">{elem.approval_date}</td>
                      <td className="py-2">
                        ${Number(elem.amount_claimed).toFixed(2)}
                      </td>
                      <td className="py-2">
                        ${Number(elem.amount_approved).toFixed(2)}
                      </td>
                      <td className="py-2">{elem.status}</td>
                      <td className="flex justify-center">
                        <button>
                          {
                            <NavLink to={`/dashboard/view-user-req/${elem.id}`}>
                              <FaEye className="w-7 mt-2 bg-red-500 rounded p-1 text-white text-xl" />
                            </NavLink>
                          }
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td className="text-2xl text-slate-500 py-4">
                    Loading contents....
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
