import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  BarChart,
  CloseSideBar,
  Home,
  Check,
  Library,
  LifeBuoy,
  PieChart,
  Setting,
  OpenSideBar,
  UserGroup,
} from '../../HemeIconLibrary';
import UserPurple from '../../HemeIconLibrary/settingsIcons/userPurple';

const sidebarData = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <Home />,
  },
  {
    name: 'Inventory Management',
    path: '/inventory-management',
    icon: <BarChart />,
  },
  {
    name: 'Template Builder',
    path: '/kit-builders',
    icon: <Library />,
  },
  {
    name: 'Logistics Orchestrator',
    path: '/logistic-orchestrator',
    icon: <Check />,
  },
  {
    name: 'Kit Order Process',
    path: '',
    icon: <PieChart />,
  },
  {
    name: 'Inventory Configuration',
    path: '/storage',
    icon: <UserGroup />,
  },
  {
    name: 'Sponsor Management',
    path: '/sponsors-management',
    icon: <UserPurple />,
  },
  {
    name: 'Study Management',
    path: '/study-management',
    icon: <UserPurple />,
  },
  {
    name: 'Site Management',
    path: '/site-management',
    icon: <UserPurple />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Setting />,
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: <LifeBuoy />,
  },
  {
    name: 'Template Builder',
    path: '/create-kit',
    icon: <Library />,
  },
];

const Sidebar = () => {
  const [isCollapse, setisCollapse] = useState(false);
  const location = useLocation();
  const collapseClass = isCollapse
    ? ' w-[192px] absolute z-10 hema-sidebar'
    : ' w-[90px] relative';

  return (
    <div className="fixed z-[3] top-0 left-0">
      <div
        className={`h-[calc(100vh-0px)] bg-white    ${collapseClass} transition-all`}
      >
        <ul className="pt-[97px] pb-[28px] pl-0 flex flex-col gap-[23px] h-full overflow-auto">
          {sidebarData.map((item, index) => (
            <li className="w-full">
              <NavLink
                exact
                activeClassName="active"
                to={item.path}
                className={
                  location.pathname?.toLocaleLowerCase()?.trim() === item.path
                    ? isCollapse
                      ? ' nav-link is-collapse-active mx-0 hover:mx-0'
                      : 'nav-link is-active mx-[21px]'
                    : isCollapse
                    ? 'nav-link mx-0'
                    : 'nav-link mx-[21px]'
                }
                onClick={() => {
                  setisCollapse(false);
                }}
              >
                {item.icon}
                {isCollapse && (
                  <span
                    className={`${
                      location.pathname?.toLocaleLowerCase()?.trim() ===
                      item.path
                        ? 'is-collapse-active'
                        : 'text-[#2D3B48]'
                    } font-medium text-[12px] ml-[12px]`}
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div
          className="absolute top-[50%] right-[-12px] cursor-pointer"
          onClick={() => {
            setisCollapse(!isCollapse);
          }}
        >
          {isCollapse ? <CloseSideBar /> : <OpenSideBar />}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
