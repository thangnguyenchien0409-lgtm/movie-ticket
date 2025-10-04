import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-40 w-full px-6 pt-8 text-gray-300 md:px-16 lg:px-36">
      <div className="flex w-full flex-col justify-between gap-10 border-b border-gray-500 pb-14 md:flex-row">
        <div className="md:max-w-96">
          <img alt="" className="h-11" src={assets.logo} />
          <p className="mt-6 text-sm">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <img
              src={assets.googlePlay}
              alt="google play"
              className="h-10 w-auto rounded border border-white"
            />
            <img
              src={assets.appStore}
              alt="app store"
              className="h-10 w-auto rounded border border-white"
            />
          </div>
        </div>
        <div className="flex flex-1 items-start gap-20 md:justify-end md:gap-40">
          <div>
            <h2 className="mb-5 font-semibold">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-5 font-semibold">Get in touch</h2>
            <div className="space-y-2 text-sm">
              <p>+1-234-567-890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 pb-5 text-center text-sm">
        Copyright {new Date().getFullYear()} ©{" "}
        <a href="https://prebuiltui.com">NCThang Movie-Ticket</a>. All Right
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
