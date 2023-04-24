import React, { useEffect, useState } from "react";
import axios from "axios";
const Api = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get-users")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {data?.map((user, index) => {
        return (
          <div key={index}>
            <h3>
              {user.id}. {user.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Api;
