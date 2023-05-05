import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

import './style.scss';

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex w-full h-full bg-hemaSecondary ">
        <div className="hemergy-container pt-[107px] pb-[25px]  px-[20px] w-full min-h-[100vh] max-h-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
