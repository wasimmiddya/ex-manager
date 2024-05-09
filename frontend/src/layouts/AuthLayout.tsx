"use-client";
import { FC, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import FallbackComponent from "../components/FallbackComponent";

const AuthLayout: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <div className="grid grid-cols-2 place-items-center h-full">
      <div className="flex justify-center">
        <div className="w-[58%] px-12 py-3 bg-white rounded-md text-center">
          <h2 className="my-4 font-semibold font-montserrat text-3xl text-red-500">
            <span className="">Ex</span> Manager
          </h2>
          <img
            src="/employee-illust.svg"
            alt="img-emp"
            className="w-72 mx-auto mb-4"
          />
          <p className="mb-7 text-slate-500 font-montserrat text-sm">
            Welcome to Ex-Manager, your one-stop shop for getting reimbursed
            quickly and efficiently! Ex-Manager takes the hassle out of expense
            reports. Submit your reports with ease, attach receipts directly
            within the system, and track the status of your reimbursements in
            real-time.
            {/* No more waiting for paper checks - Ex-Manager puts you in
            control and streamlines the entire process. */}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <ErrorBoundary
          fallback={
            <FallbackComponent error={errorMessage} resetErrorBoundary={() => {window.location.reload()}} />
          }
          onError={(error) => setErrorMessage(error.message)}
        >
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default AuthLayout;
