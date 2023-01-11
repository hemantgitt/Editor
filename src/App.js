import React from "react";
import Login from './Components/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultView from './Components/DefaultView/DefaultView'
import './Components/DefaultView/DefaultView.css';
import URL from "./Components/Login/URL";



const App = () => {


  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<URL />}></Route>
          <Route exact path="/login/:assId/:resId" element={<Login />}></Route>
          <Route exact path="/Default/:assId/:resId" element={<DefaultView />}></Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
