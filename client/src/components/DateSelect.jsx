import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dataSelect" className="pt-30">
      <div className="bg-primary/10 border-primary/20 relative flex flex-col items-center justify-between gap-10 rounded-lg border p-8 md:flex-row">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="mt-4 flex items-center gap-8">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 flex-wrap gap-4 md:flex md:max-w-lg">
              {Object.keys(dateTime).map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  key={date}
                  className={`flex aspect-square h-14 w-14 cursor-pointer flex-col items-center justify-center rounded py-2 ${
                    selected === date
                      ? "bg-primary text-white"
                      : "border-primary/70 border"
                  }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
        </div>

        <button
          onClick={onBookHandler}
          className="bg-primary hover:bg-primary/90 mt-6 cursor-pointer rounded px-8 py-2 text-white transition-all"
        >
          Book now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
