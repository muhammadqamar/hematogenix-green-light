import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from './sidebar';

import './style.scss';

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div className="flex w-full h-full bg-hemaSecondary ">
        <Sidebar />
        <div className="hemergy-container pt-[107px] pb-[25px] pl-[110px] px-[20px] w-full min-h-[100vh] max-h-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
