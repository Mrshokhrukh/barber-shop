import React, { useEffect, useState } from "react";
import axios from "axios";
const Api = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get-users")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <h1>sdsad</h1>
    </div>
  );
};

export default Api;
