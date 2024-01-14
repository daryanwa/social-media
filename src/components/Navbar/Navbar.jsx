import React from 'react';
import NavLinks from './NavLinks';
import UserLinks from './UserLinks';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="border-b border-gray-100 dark:bg-yellow-500 outline w-full px-44 text-center">
      <Link to='/'>
        <div className="mx-auto">
          <div className="text-3xl font-extrabold text-gray-900 font-roboto">
            <span className="text-sky-600 cursor-pointer ">Social Media</span>
          </div>
        </div>
      </Link>
      <div className="flex justify-center py-1 item-center">
        <NavLinks></NavLinks>
        <UserLinks></UserLinks>
      </div>
    </div>
  );
};

export default Navbar;
