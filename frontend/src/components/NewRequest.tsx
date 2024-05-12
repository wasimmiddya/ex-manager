import axios, { AxiosRequestConfig } from "axios";
import { nanoid } from "nanoid";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { BiSolidReceipt } from "react-icons/bi";

const NewRequest: FC = () => {
  // state for handling input changes for request record (i.e input for a single request record)
  const [input, setInput] = useState({
    expenditure: "",
    amountClaimed: Number(0.0),
  });

  // this state contains the data of the request table
  const [table, setTable] = useState<
    { id?: string; expenditure: string; amountClaimed: number }[] | null
  >([]);

  // state for handling changes in request receipt images uploading(for a single image)
  const [image, setImage] = useState<File>();

  // state for storing receipts file(i.e array of images)
  const [receiptFiles, setReceiptFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  /*
   * =======================================================================
   * -------------// All the handling logics are written here //------------
   * =======================================================================
   */
  // handle when user input changes
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    if (name === "amountClaimed") {
      setInput({ ...input, [name]: Number(value) });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  // handle when user clicks add button to add new request record to the table
  const handleClick = () => {
    // storing input data in table state
    setTable([
      ...(table as any),
      {
        id: nanoid(),
        ...input,
      },
    ]);

    // storing receipts file or images of receipts in state
    setReceiptFiles([...(receiptFiles as any), image]);

    // clear the input
    setInput({ expenditure: "", amountClaimed: Number(0.0) });
  };

  // handle changes when user  select an image from file input
  const handleUploadFileChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files) {
      setImage(event.target.files[0] as File);
    }
  };

  // handling the form submission with bulk data
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("data", JSON.stringify(table));

    setTable(null);

    receiptFiles.map((elem) => {
      formData.append("receiptFiles", elem);
    });

    const config: AxiosRequestConfig<FormData> = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const apiResponse = await axios
      .post("/api/v1/bills/create", formData, config)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return null;
      });

    if (!apiResponse) {
      alert("Upload failed!");
    }

    alert("Upload successfull!");

    setLoading(false);
  };

  return (
    <div className="w-full mx-auto font-montserrat, grid grid-cols-11 place-items-center">
      {/*
       * ===========================================================================================
       * <---------// Left section for listing the prepared requests by the employee //------------>
       * ===========================================================================================
       */}
      <div className="px-7 bg-white font-montserrat w-full max-h-[424px] min-h-[220px] rounded-md overflow-scroll relative col-span-6">
        <div className="py-5 sticky top-0 bg-white">
          <h3 className="text-2xl font-comfortaa text-slate-600 font-bold text-center">
            <span className="text-red-500">New</span> Request
          </h3>
        </div>
        <form
          className="overflow-hidden rounded-lg border px-5 pt-2"
          onSubmit={handleSubmit}
        >
          <table className="w-full">
            <thead>
              <tr className="text-left border-b-2 border-red-500 text-slate-600">
                <th className="py-2">Expenditure</th>
                <th className="py-2">Receipt</th>
                <th className="py-2">Amount Claimed</th>
                <th className="py-2">Date</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {table ? (
                table.map((elem) => (
                  <tr key={elem.id} className="text-slate-500 border-b">
                    <td className="py-2">{elem.expenditure}</td>
                    <td className="py-2">
                      <button>
                        <BiSolidReceipt className="ml-5 hover:text-red-500 text-lg" />
                      </button>
                    </td>
                    <td className="py-2">${elem.amountClaimed.toFixed(2)}</td>
                    <td className="py-2">{new Date().toLocaleDateString()}</td>
                    <td className="py-2 text-center">
                      <button
                        className="py-1 px-3 rounded bg-red-500 text-white font-semibold text-xs"
                        onClick={() => {
                          setTable(table.filter((e) => e.id !== elem.id));
                        }}
                      >
                        remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-slate-500">{loading ? "Uploading..." : "Empty table"}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center py-4">
            <button
              className="py-1 px-3 rounded bg-red-500 text-white"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {/*
       * ===========================================================================================
       * <---------// right section contains input fields for adding data to the table //---------->
       * ===========================================================================================
       */}
      <div className="py-3 px-10 bg-white rounded-lg w-[70%] text-slate-500 col-span-5">
        <h3 className="text-2xl text-slate-600 font-bold font-comfortaa text-center my-4">
          Employee <span className="text-red-500">Details</span>
        </h3>
        <div className="space-y-6">
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
          </div>
          {/* -----------------Input section--------------- */}
          <div className="grid grid-cols-2 ">
            <div className="space-y-2">
              <label htmlFor="exp" className="font-semibold">
                Expenditure:
              </label>
              <br />
              <input
                type="text"
                name="expenditure"
                className="p-0.5 border-2 border-slate-400 focus:outline-none focus:border-red-500 rounded"
                onChange={handleInputChange}
                value={input.expenditure}
              />
            </div>
            <div className="space-y-2 ml-5">
              <label htmlFor="exp" className="font-semibold">
                Amount Claimed:
              </label>
              <br />
              <div className="relative">
                <span className="font-bold absolute left-2 top-1">$</span>
                <input
                  type="number"
                  name="amountClaimed"
                  className="p-0.5 border-2 border-slate-400 focus:outline-none focus:border-red-500 rounded pl-5 w-36"
                  onChange={handleInputChange}
                  value={input.amountClaimed}
                />
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <label htmlFor="receipts" className="font-semibold">
                Upload Receipt:
              </label>
              <br />
              <div className="relative">
                <input
                  type="file"
                  name="receipt-image"
                  className="file:bg-red-500 file:border-none file:rounded-md file:text-white file:w-32  text-sm file:hover:cursor-pointer"
                  onChange={handleUploadFileChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-7 flex justify-center">
          <button
            className="py-1 px-5 text-lg text-white bg-red-500 rounded mt-3"
            onClick={handleClick}
          >
            Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;
