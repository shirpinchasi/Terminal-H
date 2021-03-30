import React from "react";
import "./App.css"
import Feed from "./Feed/Feed";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu/Menu";
import Accessories from "./Shop/Accessories/Accessories";
import Clothing from "./Shop/Clothing/Clothing";
import Shoes from "./Shop/Shoes/Shoes";
import Equipment from "./Shop/Equipment/Equipment";
import SportBrands from "./Shop/SportBrands/SportBrands";
import Games from "./Shop/Games/Games";
import './App.css';
import Beauty from "./Shop/Beauty/Beauty";
import Bags from "./Shop/Bags/Bags";
import ProductPage from "./Shop/ProductPage/productPage"
import Search from "./search/search"

function App() {
  return (
    <div className="App">
      <Menu/>
      <BrowserRouter>
            <Switch>
            <Route exact path="/search">
                    <Search />
                </Route>
            <Route exact path="/Bags">
                    <Bags />
                </Route>
                <Route exact path="/ProductPage/:id?">
                    <ProductPage/>
                </Route>
            <Route exact path="/Beauty">
                    <Beauty />
                </Route>
            <Route exact path="/Accessories">
                    <Accessories />
                </Route>
            <Route exact path="/Games">
                    <Games />
                </Route>
            <Route exact path="/SportBrands">
                    <SportBrands />
                </Route>
            <Route exact path="/Equipment">
                    <Equipment />
                </Route>
            <Route exact path="/Shoes">
                    <Shoes />
                </Route>
                <Route exact path="/Clothing">
                    <Clothing />
                </Route>
                <Route exact path="/">
                  <Feed Component={Feed}/>
                </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
