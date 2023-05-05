import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Error from "../pages/Error";
import Inventory from "../pages/inventory";
import Storage from "../pages/storage";
import Login from "../pages/login";
import InventoryDetail from "../pages/inventoryDetail";
import Settings from "../pages/Settings";
import LightApproval from "../pages/LightApproval";
import KitBuilder from "../pages/kitBuilder";
import SiteManagement from "../pages/siteManagement";
import SponserManagement from "../pages/sponserManagement";
import Layout from "../components/Layout";
import LogisticsOrchestra from "../pages/logistOrchestra/index";
import StudyManagement from "../pages/studyManagement";
import { refreshTokenAction } from "../Actions/auth";
import PrivateRoute from "./privateRoutes";
import OpenRoute from "./openRouter";
import hematogenix from "../assets/images/HematogenixRed.svg";
import CreateKit from "../pages/createKit/createKit";

const App = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("hema-token")) {
        const refreshToken = await refreshTokenAction();
        setReady(true);
        if (refreshToken.status === 200) {
          localStorage.setItem("hema-token", refreshToken.data.token);
          localStorage.setItem("hema-token-refresh", refreshToken.data.refreshToken);
        } else {
          localStorage.removeItem("hema-token");
          localStorage.removeItem("hema-token-refresh");
          window.location.reload();
        }
      } else {
        setReady(true);
      }
    })();
  }, []);
  return !ready ? (
    <div className="flex items-center justify-center h-screen bg-primary2">
      <img src={hematogenix} alt="logo" />
    </div>
  ) : (
    <Routes>
      <Route
        path="/login"
        element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }
      />

      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="inventory-management"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />

        <Route
          path="kit-builders"
          element={
            <PrivateRoute>
              <KitBuilder />
            </PrivateRoute>
          }
        />

        <Route
          path="create-kit"
          element={
            <PrivateRoute>
              <CreateKit />
            </PrivateRoute>
          }
        />

        <Route path="dashboard" element={<PrivateRoute></PrivateRoute>} />
        <Route path="reports" element={<PrivateRoute></PrivateRoute>} />
        <Route path="Kitorder-process" element={<PrivateRoute></PrivateRoute>} />

        <Route
          path="inventory/:id"
          element={
            <PrivateRoute>
              <InventoryDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="sponsors-management"
          element={
            <PrivateRoute>
              <SponserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="study-management"
          element={
            <PrivateRoute>
              <StudyManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="site-management"
          element={
            <PrivateRoute>
              <SiteManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="storage"
          element={
            <PrivateRoute>
              <Storage />
            </PrivateRoute>
          }
        />
        <Route
          path="logistic-orchestrator"
          element={
            <PrivateRoute>
              <LogisticsOrchestra />
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/green-light-approval"
          element={
            <PrivateRoute>
              <LightApproval />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Error />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
    // </BrowserRouter>
  );
};
export default App;
