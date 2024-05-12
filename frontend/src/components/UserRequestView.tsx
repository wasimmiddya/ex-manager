import { FC } from "react";
import { useParams } from "react-router-dom";
import Field from "./Field";
import { useFetch } from "../hooks/useFetch";

const UserRequestView: FC = () => {
  const { id } = useParams();
  const data = useFetch(`/api/v1/bills/user/single_bill/${id}`);

  return (
    <div className="px-10 py-3 bg-white w-[65%] rounded-md font-montserrat">
      <h3 className="text-3xl my-4 text-center text-slate-600 font-bold font-comfortaa">
        Request <span className="text-red-500">Details</span>
      </h3>
      <div>
        <label className="text-slate-600 font-semibold">Request ID:</label>
        <br />
        <span className="text-green-600 font-semibold">{id}</span>
      </div>
      <div className="my-4 grid grid-cols-3">
        <div className="grid grid-cols-2 col-span-2">
          <Field heading="Expenditure" label={data?.expenditure} />
          <Field heading="Sumtted On" label={data?.submitted_on} />
          <Field heading="Amount Claimed" label={"$" + data?.amount_claimed.toFixed(2)} />
          <Field heading="Amount Approved" label={"$" + data?.amount_approved} />
          <Field heading="Approved On" label={data?.approval_date} />
          <Field heading="Status" label={data?.status} />
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
      <div className="flex justify-center">
        <button className="bg-red-500 text-white py-1 px-4 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserRequestView;
