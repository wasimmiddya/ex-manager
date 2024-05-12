import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import Field from "./Field";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";

const AdminReportView: FC = () => {
  const { id } = useParams();
  const data = useFetch(`/api/v1/bills/admin/single_bill/${id}`);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">(
    "Pending"
  );
  const [approvedAmount, setApprovedAmount] = useState<number>(0);

  useEffect(() => {
    setStatus(data?.status);
  }, [data]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }): void => {
    setApprovedAmount(Number(value));
    console.log(approvedAmount);
  };

  const handleRejectClicked: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setLoading(true);


    const res = await axios
      .put("/api/v1/bills/admin/update_status", {
        id: data?.id,
        status: "Rejected",
        amount_approved: 0,
      })
      .then((res) => res.data)
      .catch(() => null);

    if (!res) {
      alert("Failed to update status!!!");
      setStatus("Pending");
    }

    setStatus(res.data?.status);
    setLoading(false);
  };
  const handleApprovedClicked: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setLoading(true);

    const res = await axios
      .put("/api/v1/bills/admin/update_status", {
        id: data?.id,
        status: "Approved",
        amount_approved: approvedAmount,
      })
      .then((res) => res.data)
      .catch(() => null);

    if (!res) {
      alert("Failed to update status!!!");
      setStatus("Pending");
    }

    setStatus(res.data?.status);
    setLoading(false);
  };

  return (
    <div className="px-10 py-3 bg-white w-[65%] rounded-md font-montserrat">
      <h3 className="text-3xl my-4 text-center text-slate-600 font-bold font-comfortaa">
        Employee Claimed <span className="text-red-500">Details</span>
      </h3>
      <div className="flex">
        <div className="flex items-center space-x-2 bg-slate-200 pl-2 pr-7 py-1 rounded">
          <img
            src={data?.user.avater}
            alt="profile-img"
            className="w-10 h-10 rounded-full border-2 border-blue-500"
          />
          <div>
            <h5 className="font-semibold text-slate-600">
              {data?.user.full_name}
            </h5>
            <p className="text-sm text-slate-500">{data?.user.role}</p>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-3">
        <div className="grid grid-cols-2 col-span-2">
          <Field heading="Expenditure" label={data?.expenditure} />
          <Field heading="Employee ID" label={data?.user.email} />
          <Field heading="Submitted On" label={data?.submitted_on} />
          <Field
            heading="Amount Claimed"
            label={"$" + data?.amount_claimed.toFixed(2)}
          />
          <Field heading="Status" label={loading ? "Loading..." : status} />
          <div className="space-y-2 ml-5">
            <label htmlFor="exp" className="font-semibold text-slate-600">
              Amount Approved:
            </label>
            <br />
            <div className="relative">
              <span className="font-bold absolute left-2 top-1 text-slate-500">
                $
              </span>
              <input
                type="number"
                name="amount_approved"
                className="p-0.5 border-2 border-slate-400 focus:outline-none focus:border-red-500 rounded pl-5 w-36 text-slate-500"
                onChange={handleInputChange}
                value={approvedAmount}
              />
            </div>
          </div>
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
        <button
          className="bg-green-600 text-white py-1 px-4 rounded-md disabled:bg-green-300"
          disabled={loading || status == "Approved" ? true : false}
          onClick={handleApprovedClicked}
        >
          Approv
        </button>
        <button
          className="bg-red-500 text-white py-1 px-4 rounded-md disabled:bg-red-300"
          disabled={loading || status == "Rejected" ? true : false}
          onClick={handleRejectClicked}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default AdminReportView;
