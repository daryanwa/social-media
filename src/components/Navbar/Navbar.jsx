import React from "react";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 dark:bg-yellow-500 outline w-full px-44 py-2">
      <div className="text-3xl font-extrabold text-gray-900 font-roboto">
        <span className="text-sky-600 cursor-pointer">Social Media</span>
      </div>
      <div className="flex justify-center py-2 items-center mx-auto">
        <NavLinks />
      </div>
        <UserLinks />
     
    </div>
  );
};

export default Navbar;
