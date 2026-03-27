import React from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingBasket,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import MainLogo from "../../../assets/White Logo.png";

const BuyerFooter = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src={MainLogo}
                alt="AISmartTrade Logo"
                className="h-10 mr-2"
              />
              <span className="text-xl font-bold">AISmartTrade</span>
            </div>
            <p className="mb-4 text-neutral-300 max-w-md">
              Your trusted digital marketplace for wholesale trading. Connect
              with verified sellers and discover quality products in bulk.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {/* Twitter */}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[50px] h-[50px] overflow-hidden"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full bg-transparent transition-all duration-300 group-hover:-translate-y-[60px]">
                  <FaTwitter className="text-white text-[18px]" />
                </div>
                <div className="flex items-center justify-center w-full h-full rounded-full bg-black absolute top-[60px] left-0 transition-all duration-300 group-hover:top-0">
                  <FaTwitter className="text-white text-[18px] opacity-0 group-hover:opacity-100 transition delay-200" />
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/haris.bhatti.33671/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[50px] h-[50px] overflow-hidden"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full transition-all duration-300 group-hover:-translate-y-[60px]">
                  <FaInstagram className="text-white text-[18px]" />
                </div>
                <div
                  className="flex items-center justify-center w-full h-full rounded-full absolute top-[60px] left-0 transition-all duration-300 group-hover:top-0"
                  style={{
                    background:
                      "linear-gradient(72deg,#ff7a00,#ff0169,#d300c5)",
                  }}
                >
                  <FaInstagram className="text-white text-[18px] opacity-0 group-hover:opacity-100 transition delay-200" />
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/haris.bhatti.33671"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[50px] h-[50px] overflow-hidden"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full transition-all duration-300 group-hover:-translate-y-[60px]">
                  <FaFacebook className="text-white text-[18px]" />
                </div>
                <div className="flex items-center justify-center w-full h-full rounded-full bg-[#316ff6] absolute top-[60px] left-0 transition-all duration-300 group-hover:top-0">
                  <FaFacebook className="text-white text-[18px] opacity-0 group-hover:opacity-100 transition delay-200" />
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/haris-saeed-824a1332b/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[50px] h-[50px] overflow-hidden"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full transition-all duration-300 group-hover:-translate-y-[60px]">
                  <FaLinkedin className="text-white text-[18px]" />
                </div>
                <div
                  className="flex items-center justify-center w-full h-full rounded-full absolute top-[60px] left-0 transition-all duration-300 group-hover:top-0"
                  style={{
                    background: "linear-gradient(180deg,#812290,#4d227c)",
                  }}
                >
                  <FaLinkedin className="text-white text-[18px] opacity-0 group-hover:opacity-100 transition delay-200" />
                </div>
              </a>
            </div>
            {/* <div className="flex gap-3"> */}
            {/* Twitter */}
            {/* <Link
                to="/twitter"
                className="group relative w-[50px] h-[50px] overflow-hidden"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full bg-transparent transition-all duration-300 group-hover:-translate-y-[60px]">
                  <FaTwitter className="text-white text-[18px]" />
                </div>
                <div className="flex items-center justify-center w-full h-full rounded-full bg-black absolute top-[60px] left-0 transition-all duration-300 group-hover:top-0">
                  <FaTwitter className="text-white text-[18px] opacity-0 group-hover:opacity-100 transition delay-200" />
                </div>
              </Link> */}

            {/* Instagram */}
            {/* <Link
                to="/instagram"
                className="group relative w-[50px] h-[50px] overflow-hidden"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full transition-all duration-300 group-hover:-translate-y-[60px]">
                  <FaInstagram className="text-white text-[18px]" />
                </div>
                <div
                  className="flex items-center justify-center w-full h-full rounded-full absolute top-[60px] left-0 transition-all duration-300 group-hover:top-0"
                  style={{
                    background:
                      "linear-gradient(72deg,#ff7a00,#ff0169,#d300c5)",
                  }}
                >
                  <FaInstagram className="text-white text-[18px] opacity-0 group-hover:opacity-100 transition delay-200" />
                </div>
              </Link> */}

            {/* Facebook */}
            {/* <Link
                to="/facebook"
                className="group relative w-[50px] h-[50px] overflow-hidden"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full transition-all duration-300 group-hover:-translate-y-[60px]">
                  <FaFacebook className="text-white text-[18px]" />
                </div>
                <div className="flex items-center justify-center w-full h-full rounded-full bg-[#316ff6] absolute top-[60px] left-0 transition-all duration-300 group-hover:top-0">
                  <FaFacebook className="text-white text-[18px] opacity-0 group-hover:opacity-100 transition delay-200" />
                </div>
              </Link> */}

            {/* LinkedIn */}
            {/* <Link
                to="/linkedin"
                className="group relative w-[50px] h-[50px] overflow-hidden"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full transition-all duration-300 group-hover:-translate-y-[60px]">
                  <FaLinkedin className="text-white text-[18px]" />
                </div>
                <div
                  className="flex items-center justify-center w-full h-full rounded-full absolute top-[60px] left-0 transition-all duration-300 group-hover:top-0"
                  style={{
                    background: "linear-gradient(180deg,#812290,#4d227c)",
                  }}
                >
                  <FaLinkedin className="text-white text-[18px] opacity-0 group-hover:opacity-100 transition delay-200" />
                </div>
              </Link> */}
            {/* </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-neutral-300 hover:text-white"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-neutral-300 hover:text-white"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-300 hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-neutral-300">
              <li>Email: harisbhatti07726@gmail.com</li>
              <li>Phone: +92 306 5278287</li>
              <li>Address: Green International University</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-neutral-700">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-neutral-400">
              © 2025 AISmartTrade. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-6 text-sm md:mt-0">
              <Link to="/privacy" className="text-neutral-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-400 hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BuyerFooter;
