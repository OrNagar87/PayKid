import React, { useContext, useState } from "react";
import "./home.css";
import Header from "../Header/Header";
import Poketcontainer from "../Poketcontainer/Poketcontainer";

function Home(props) {
  return (
    <div className="home">
      <Header />

      <Poketcontainer />
    </div>
  );
}

export default Home;
