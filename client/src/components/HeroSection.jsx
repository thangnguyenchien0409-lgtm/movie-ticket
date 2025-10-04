import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";

import backgroundImage from "../assets/backgroundImage.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-screen flex-col items-start justify-center gap-4 bg-cover bg-center bg-no-repeat px-6 md:px-16 lg:px-36"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <img src={assets.marvelLogo} alt="" className="mt-20 max-h-11 lg:h-11" />
      <h1 className="max-w-110 text-5xl font-semibold md:text-[70px] md:leading-18">
        Guardians <br /> of the Galaxy
      </h1>
      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Adventure | Sci-Fi</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4.5 w-4.5" /> 2018
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="h-4.5 w-4.5" /> 2h 8m
        </div>
      </div>

      <p className="max-w-md text-gray-300">
        In a post-apocalyptic world where cities ride on wheels and consume each
        other to survive, two people meet in London and try to stop a
        conspiracy.
      </p>
      <button
        onClick={() => navigate("/movies")}
        className="btn-primary flex items-center gap-2 px-4 py-3"
      >
        Explore Movies
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default HeroSection;
