import { FC } from "react";

interface FieldProps {
  heading: string;
  label: string;
}

const Field: FC<FieldProps> = ({ heading, label }) => {
  return (
    <div className="my-3">
      <h5 className="text-slate-600 font-semibold">{heading}:</h5>
      <label className="text-slate-500">{label}</label>
    </div>
  );
};

export default Field;
