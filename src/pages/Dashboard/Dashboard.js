import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { HemaCard, HemaHeadingWithSubText } from '../../utils';
import { Queue, InProcess, Shipped, Delivered } from '../../HemeIconLibrary';
import Charts from '../../components/Dashbaord/charts';
import RequestImage from '../../assets/images/Request-Status.png';
import {getAllDashboardStatsAction, getAllOrderAction} from "../../Actions/order"
import RequestTable from './requestTable';
import CreateKit from "../../pages/createKit/createKit"
const Dashboard = () => {
  const {orders} = useSelector(state=>state)
  const [showDashboard, setShowDashboard] = useState(true)
  useEffect(()=>{
    getAllDashboardStatsAction()
    getAllOrderAction()
  },[])
  return (
    showDashboard ?
    <div className="dashboard">
      <HemaHeadingWithSubText
        HeadingFontSize="30px"
        HeadingLineHeight="38px"
        heading="Overview"
      />
      <div
        className="py-[30px] pl-[284px] pr-8 rounded-[15px] mt-[17px] flex justify-end relative"
        style={{
          background:
            'linear-gradient(71.65deg, #B2ADF4 0.38%, #F0DDFF 69.03%)',
        }}
      >
        <img
          src={RequestImage}
          alt="request"
          className="absolute top-[7px] left-[12px] w-auto h-auto"
        />
        <div className="relative">
          <p className="mb-[12px] text-white text-base font-bold">
            Request Status
          </p>
          <div className=" flex gap-[30px] w-full justify-between flex-wrap">
            <HemaCard
              heading={orders.dashboard?.requestStatus?.filter(data=>data.label==="New")[0]?.number || "0"}
              sub="Queue"
              Icon={Queue}
              shadeColor="#3D88E0"
              className="min-w-[229px]"
            />
            <HemaCard
             heading={orders.dashboard?.requestStatus?.filter(data=>data.label==="In Process")[0]?.number || "0"}
              sub="In Process"
              Icon={InProcess}
              className="min-w-[229px]"
              shadeColor="#F54C3B"
            />
            <HemaCard
            heading={orders.dashboard?.requestStatus?.filter(data=>data.label==="New")[0]?.number || "0"}
              sub="Shipped"
              Icon={Shipped}
              className="min-w-[229px]"
              shadeColor="#775FD5"
            />
            <HemaCard
              heading={orders.dashboard?.requestStatus?.filter(data=>data.label==="New")[0]?.number || "0"}
              sub="Delivered"
              Icon={Delivered}
              className="min-w-[229px]"
              shadeColor="#38C280"
            />
          </div>
        </div>
      </div>

      <div className="mb-[30px]">
        <Charts />
      </div>
      <RequestTable data={orders.allOrders || []} setShowDashboard={setShowDashboard} />
    </div> : <CreateKit setShowDashboard={setShowDashboard}  />
  );
};

export default Dashboard;
