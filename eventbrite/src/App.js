
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./pages/navbar";
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/sign_up"
import Addevent from "./pages/addevent.js"
import Getevents from "./pages/getevent.js";
import { useState } from "react";

var islogged=true;


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home/></>
    }, {
      path: "/ae",
      element: <><Navbar/><Addevent /></>
    }
    , {
      path: "/login",
      element:  <><Navbar/><Login /></>
    }, {
      path: "/signup",
      element:  <><Navbar/><Signup /></>
    }, {
      path: "/se/m",
      element:  <><Navbar/><Getevents value ="m"/></>
    },
     {
      path: "/se/a",
      element:  <><Navbar/><Getevents value ="a"/></>
    },
     {
      path: "/he",
      element:  <><Navbar/><Addevent /></>
    }
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App;
