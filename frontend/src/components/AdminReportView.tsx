import { FC } from "react";
import { useParams } from "react-router-dom";
import Field from "./Field";

const AdminReportView: FC = () => {
  const { id } = useParams();

  return (
    <div className="px-10 py-3 bg-white w-[65%] rounded-md font-montserrat">
      <h3 className="text-3xl my-4 text-center text-slate-600 font-bold font-comfortaa">
        Employee Claimed <span className="text-red-500">Details</span>
      </h3>
      <div>
        <label className="text-slate-600 font-semibold">Report ID:</label>
        <br />
        <span className="text-green-600 font-semibold">{id}</span>
      </div>
      <div className="my-4 grid grid-cols-3">
        <div className="grid grid-cols-2 col-span-2">
          <Field heading="Expenditure" label="Cab" />
          <Field heading="Employee ID" label="wasim33@gmail.com" />
          <Field heading="Submitted On" label="06/23/2024" />
          <Field heading="Amount Claimed" label="$30.00" />
          {/* <Field heading="Approved On" label="$25/04/2024" /> */}
          <Field heading="Status" label="Approved" />
        </div>

        <div>
          <h4 className="text-center my-1 text-lg text-slate-600">Receipt</h4>
          <img
            src="/travel-exp-receipt.jpg"
            alt="exp-receipt"
            className="h-52 mx-auto cursor-pointer border"
          />
        </div>
      </div>
      <div className="flex items-center justify-center my-6 space-x-5">
        <button className="bg-green-600 text-white py-1 px-4 rounded-md">
          Approv
        </button>
        <button className="bg-red-500 text-white py-1 px-4 rounded-md">
          Reject
        </button>
      </div>
    </div>
  );
};

export default AdminReportView;
