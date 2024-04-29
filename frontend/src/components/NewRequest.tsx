import { ChangeEventHandler, FC, useState } from "react";

const NewRequest: FC = () => {
  const [input, setInput] = useState({
    exp: "",
    amtClaimed: "",
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="w-[90%] mx-auto font-montserrat, grid grid-cols-2 place-items-center">
      <div className="py-3 px-10 bg-white rounded-lg w-[60%] text-slate-500">
        <h3 className="text-2xl text-slate-600 font-bold font-comfortaa text-center my-4">
          Employee <span className="text-red-500">Details</span>
        </h3>
        <div className="space-y-2">
          <div>
            <label htmlFor="emp-name">
              Employee Nome: {"Wasim Raja Middya"}
            </label>
          </div>
          <div>
            <label htmlFor="emp-name">
              Employee ID: {"wasim1223@gmail.com"}
            </label>
          </div>
          <div>
            <label htmlFor="emp-name">
              Date: {new Date().toLocaleDateString()}
            </label>
          </div>
          <div className="space-y-2">
            <label htmlFor="exp">Expenditure:</label>
            <br />
            <input
              type="text"
              name="exp"
              className="p-0.5 border-2 border-slate-400 focus:outline-none focus:border-red-500 rounded"
              onChange={handleInputChange}
              value={input.exp}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="exp">Amount Claimed:</label>
            <br />
            <div className="relative">
              <span className="font-bold absolute left-2 top-1">$</span>
              <input
                type="text"
                name="amtClaimed"
                className="p-0.5 border-2 border-slate-400 focus:outline-none focus:border-red-500 rounded pl-5 w-48"
                onChange={handleInputChange}
                value={input.amtClaimed}
              />
            </div>
          </div>
        </div>
        <div className="my-7 flex justify-center">
            <button className="py-1 px-5 text-lg text-white bg-red-500 rounded mt-3">Add New</button>
        </div>
      </div>
      <div>
        <form></form>
      </div>
    </div>
  );
};

export default NewRequest;
