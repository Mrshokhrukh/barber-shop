import React from "react";

const AllMasterServices = (props) => {
  //   console.log(props.services);

  return (
    <div>
      <div>
        {props.services.map((item) => {
          return <p>{item.name}</p>;
        })}
      </div>
    </div>
  );
};

export default AllMasterServices;
