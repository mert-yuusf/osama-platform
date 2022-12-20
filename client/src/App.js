import React from 'react';

import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/protected-route";


import Profile from "./pages/Dashboard/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Skills from "./pages/Dashboard/Skills";
import Work from "./pages/Dashboard/Wrok";
import Social from "./pages/Dashboard/Social";
import RegisterPage from "./pages/AuthPage";
import ErrorPage from "./pages/Error";


import axiosInstance from "./utils/axios";
import { useEffect } from "react";
import Address from "./pages/Dashboard/Address";
import Toast from './components/Toast';

function App() {

  useEffect(() => {
    return async () => {
      const response = await axiosInstance.get("/is-running");
      console.log(response.data);
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Alert></Alert>
        <Routes>
          <Route index path="/" element={<Home></Home>}></Route>
          <Route path="/get-started" element={<RegisterPage></RegisterPage>}></Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard></Dashboard>
            </ProtectedRoute>
          }>
            <Route path="profile" element={<Profile></Profile>}></Route>
            <Route path="skills" element={<Skills></Skills>}></Route>
            <Route path="work" element={<Work></Work>}></Route>
            <Route path="social" element={<Social></Social>}></Route>
            <Route path="address" element={<Address></Address>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
