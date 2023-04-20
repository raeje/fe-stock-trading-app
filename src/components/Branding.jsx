import React from "react";
import logo from "../stratton-oakmont-logo.svg";

const Branding = () => {
  return (
    <>
      <div className="fixed top-5 left-5 flex place-items-center">
        <img
          src={logo}
          className="h-12 mr-[1px] rounded-xl p-[1px] drop-shadow-lg color-red-500"
          alt="Stratton Oakmont Logo"
        />
        <span className="text-3xl font-bold text-custom-red drop-shadow-lg">
          Stratton Oakmont
        </span>
      </div>
      <div className="fixed -bottom-12 -right-12 z-10 h-screen flex flex-col-reverse">
        <img
          src={logo}
          className="h-1/2 mr-2 rounded-xl p-[1px] drop-shadow-lg color-red-500"
          alt="Stratton Oakmont Logo"
        />
      </div>
    </>
  );
};

export default Branding;
