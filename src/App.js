import React from "react";
import "./App.css"
import Feed from "./Feed/Feed";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu/Menu";
import './App.css';
import BrandPage from "./Shop/Brands/BrandPage";
import Shop from "./Shop/Shop";
import ProductPage from "./Shop/ProductPage/productPage"
import Brands from "./Shop/Brands/Brands";
import Search from "./Menu/Search/Search"

function App() {
  return (
      <div>
          <Menu/>
          
    <div className="App">
      <BrowserRouter>
            <Switch>
            <Route exact path="/BrandPage/:id?">
                    <BrandPage />
                </Route>
                <Route exact path="/Menu/:id?">
                    <Menu />
                </Route>
                <Route exact path="/Brands">
                    <Brands />
                </Route>
                <Route exact path="/ProductPage/:id?">
                    <ProductPage />
                </Route>
                <Route exact path="/Shop/:id?">
                    <Shop />
                </Route>
                <Route exact path="/">
                  <Feed Component={Feed}/>
                </Route>
          </Switch>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
