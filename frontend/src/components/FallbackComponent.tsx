"use-client";
import { FC } from "react";
import { FallbackProps } from "react-error-boundary";

const FallbackComponent: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="w-[60%] bg-white rounded-md font-montserrat p-3 mx-auto text-center">
      <h1 className="text-4xl text-red-500 font-bold m-3">Failed!</h1>
      <p className="py-2 text-slate-600">{error}</p>
      <div className="flex justify-center">
        <button
          onClick={resetErrorBoundary}
          className="px-8 py-[2px] font-comfortaa bg-red-500 rounded-md text-white font-semibold my-5"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FallbackComponent;
