import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  const { favoriteMovie } = useAppContext();

  const handleClickNavItem = () => {
    scrollTo(0, 0);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-16 lg:px-36">
      <Link to={"/"} className="max-md:flex-1">
        <img src={assets.logo} alt="" className="h-auto w-36" />
      </Link>

      <div
        className={`z-50 flex flex-col items-center gap-8 overflow-hidden border-gray-300/20 bg-black/70 py-3 transition-[width] duration-300 backdrop:blur max-md:absolute max-md:top-0 max-md:left-0 max-md:h-screen max-md:justify-center max-md:text-lg max-md:font-medium md:flex-row min-md:rounded-full md:border md:bg-white/10 min-md:px-8 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-6 right-6 h-6 w-6 cursor-pointer md:hidden"
        />

        <Link
          onClick={() => {
            handleClickNavItem();
          }}
          to={"/"}
        >
          Home
        </Link>
        <Link
          onClick={() => {
            handleClickNavItem();
          }}
          to={"/movies"}
        >
          Movies
        </Link>
        <Link
          onClick={() => {
            handleClickNavItem();
          }}
          to={"/"}
        >
          Theaters
        </Link>
        <Link
          onClick={() => {
            handleClickNavItem();
          }}
          to={"/"}
        >
          Releases
        </Link>
        {favoriteMovie.length > 0 && (
          <Link
            onClick={() => {
              handleClickNavItem();
            }}
            to={"/favorites"}
          >
            Favorites
          </Link>
        )}
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon className="h-6 w-6 cursor-pointer max-md:hidden" />
        {!user ? (
          <button
            onClick={openSignIn}
            className="bg-primary hover:bg-primary-dull cursor-pointer rounded-full px-4 py-1 font-medium transition-all sm:px-7 sm:py-2"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                href="/my-bookings"
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <Menu
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 cursor-pointer max-md:ml-4 md:hidden"
      />
    </div>
  );
};

export default Navbar;
