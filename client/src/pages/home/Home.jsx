import React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import "./home.scss";

const Home = () => {
  return (
    <Container fixed className="container">
      <div className="home">
        <div className="enter-text">
          <p className="text">Telefon orqali bog'lanishni istaysizmi ?</p>
        </div>

        <div className="phone">
          <p className="text">aloqa orqali bog'laning</p>
          <p className="phone-number">+7 (906) 061-96-53</p>
        </div>

        <div className="link-btn">
          <button>
            <Link to="/uz/barbershop">recording</Link>
          </button>
          <button>
            <Link to="/uz/barbershop">cancell</Link>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
