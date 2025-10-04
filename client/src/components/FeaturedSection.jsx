import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const navigate = useNavigate();

  const { shows } = useAppContext();

  return (
    <div className="overflow-hidden px-6 md:px-16 lg:px-24 xl:px-44">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-lg font-medium text-gray-300">Now Showing</p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex cursor-pointer items-center gap-2 text-sm text-gray-300"
        >
          View All{" "}
          <ArrowRight className="h-4.5 w-4.5 cursor-pointer transition group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-8 max-sm:justify-center">
        {shows.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="bg-primary hover:bg-primary-dull cursor-pointer rounded-md px-10 py-3 text-sm font-medium transition"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
