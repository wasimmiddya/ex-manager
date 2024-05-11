import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const response = await axios
        .get(url)
        .then((res) => res.data)
        .catch((err) => err.response.status);

      if (response >= 400) {
        console.log("Something went wrong can't fetch data");
        return;
      }

      console.log(response.data);
      

      setData(response.data);
    })();
  }, []);

  return data;
};
