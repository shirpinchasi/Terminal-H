import React from "react";
import "./App.css"
import Feed from "./Feed/Feed";
import { BrowserRouter, Route, useLocation } from "react-router-dom";
import Menu from "./Menu/Menu"
import './App.css';
import BrandPage from "./Shop/Brands/BrandPage";
import Shop from "./Shop/Shop";
import ProductPage from "./Shop/ProductPage/productPage"
import Brands from "./Shop/Brands/Brands";
import Search from "./Search/Search";
import SearchResults from "./Search/SearchRes"



export default function App() {

    return (
        <div className="App">
            

            <Menu />
            <Search />
            <BrowserRouter>
                <Route path="/Shop/:id?">
                    <Shop Component={Shop} />
                </Route>
                <Route path="/BrandPage/:id?">
                    <BrandPage Component={BrandPage} />
                </Route>
                <Route path="/ProductPage/:id?">
                    <ProductPage Component={ProductPage} />
                </Route>
                <Route path="/SearchResults">
                    <SearchResults Component={SearchResults} />
                </Route>
                <Route path="/Brands">
                    <Brands Component={Brands} />
                </Route>
                <Route exact path="/">
                    <Feed Component={Feed} />
                </Route>
            </BrowserRouter>


        </div>
    )
}