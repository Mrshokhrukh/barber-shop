import React from "react";
import { Link } from "react-router-dom";
import Api from "../../components/api/Api";

const Home = () => {
  return (
    <div className="home">
      <Api />
      {/* <button>
    <Link to='/main'>main</Link>
  </button> */}
    </div>
  );
};

export default Home;
