import React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import "./home.scss";
import video from "../../assets/EPIC_B_roll___Cinematic_BarberShop_mr_Bond___sony_a6500_16_50_mm.mp4";
const Home = () => {
  return (
    <>
      <div className="home-bg-enterance">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <Container fixed className="container">
        <div className="home">
          <div className="home-entrance-text">
            <p className="home-text">Telefon o'rqali bog'lanishni istaysizmi ?</p>
            <p className="phone-number">+998 (91) 523-60-03</p>
          </div>
          <div className="home-link-btns">
            <Link to="/uz/barbershop">
              <button className="button home-btn cancel">ishchilar</button>
            </Link>
            <Link to="/uz/barbershop">
              <button className="button home-btn continue">hizmatlar</button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
