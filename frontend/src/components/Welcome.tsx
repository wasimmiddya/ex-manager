import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Welcome: FC = () => {
  const {user} = useContext(AppContext)
  const navigate = useNavigate()
  

  return (
    <div>
      <div className="my-16 text-center font-montserrat space-y-6">
        <h1 className="text-6xl font-bold">
          Employee Reimbursement <br />
          <span className="text-red-600">System</span>
        </h1>
        <p className="text-lg w-[65%] mx-auto">
          <b>
            <span className="text-red-600">Ex</span>-Manager
          </b>{" "}
          streamlines the expense reimbursement process, putting you in control.
          Submit reports, attach receipts, and track your reimbursements in
          real-time - all from one convenient platform. Say goodbye to paper
          trails and hello to faster reimbursements! We've included a user guide
          and FAQ section to help you get started. Welcome to a world of
          effortless expense management!
        </p>
      </div>
      <div className="flex justify-center">
        <button
          className="py-[3px] px-12 text-2xl text-white bg-red-500 rounded-md font-semibold font-montserrat"
          onClick={() => {navigate(user ? `/dashboard/${user?.role.toLowerCase()}`:'/auth/signin')}}
        >
          Let's Go
        </button>
      </div>
    </div>
  );
};

export default Welcome;
