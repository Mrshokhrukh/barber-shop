import React from "react";

const AllMasterServices = (props) => {


  return (
    <div>
      <div>
        {props.serviceDatas.map((item, index) => {
          return (
            <p key={index}>
              {index + 1}. {item.services.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AllMasterServices;
