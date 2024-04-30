import { FC } from "react";
import { useParams } from "react-router-dom";
import Field from "./Field";

const UserRequestView: FC = () => {
  const { id } = useParams();

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
          <Field heading="Expenditure" label="Buy Accessories" />
          <Field heading="Sumtted On" label="23/04/2024" />
          <Field heading="Amount Claimed" label="$33.99" />
          <Field heading="Amount Approved" label="$30.00" />
          <Field heading="Approved On" label="$25/04/2024" />
          <Field heading="Status" label="Approved" />
        </div>
        <div>
            <h4 className="text-center my-1 text-lg text-slate-600">Receipt</h4>
            <img src="/travel-exp-receipt.jpg" alt="exp-receipt" className="h-52 mx-auto cursor-pointer border" />
        </div>
      </div>
    </div>
  );
};

export default UserRequestView;
