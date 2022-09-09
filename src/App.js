import React, {Component} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { NavbarComponents } from "./components";
import Home from "./pages/Home";
import Succes from "./pages/Succes";


export default class App extends Component {
  render (){
    return (
      <BrowserRouter>
          <NavbarComponents />
          <main>
            <Routes>
              <Route path="/" element={<Home/>} exact/>
              <Route path="/succes" element={<Succes/>} exact/>
            </Routes>
          </main>
      </BrowserRouter>
    )
  }
}