import React from "react";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <img className=" h-50 w-50" src={logo} alt="" />
    </div>
  );
};

export default Logo;
