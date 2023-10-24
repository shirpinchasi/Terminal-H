import React, { useEffect, useState } from "react";
import { Redirect, useParams, withRouter } from "react-router-dom";
import Loading from "../Loader/Loader";
import "../Shop/Shop.scss"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from "../config/config";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar } from "@material-ui/core";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useCart } from "react-use-cart";
import LaunchIcon from '@mui/icons-material/Launch';
import 'react-dropdown/style.css';
import purple from '@material-ui/core/colors/purple';
import Pagination from "../Shop/Pagination/Pagination";
import FilterMenu from "../Menu/FilterMenu";
import Footer from "../Footer/Footer";

const Main = (props) => {

    const { addItem, inCart, removeItem } = useCart();
    



    return (
        <div>
            
                <>
                    <div>
                        <h1 className="categoryName">{props.categoryName}</h1>
                        
                        <div className="ShopFilters">
                        <FilterMenu brandid={props.brandid} brands={props.brands} gender={props.gender} setGender={props.setGender} handleChangeMultiple={props.handleChangeMultiple} handleSetGender={props.handleSetGender} handleSetCount={props.handleSetCount} sortCount={props.sortCount} />
                            <div className="totalElements">
                                {props.totalElem} תוצאות
                            </div>
                            <div>
                                <FormControl id="category">
                                    <InputLabel id="select">מיין לפי : </InputLabel>
                                    <Select
                                        labelId="select"
                                        id="selectOption1"
                                        value={props.sort}
                                        onChange={(e) => props.setSort(e.target.value)}
                                    >
                                        <MenuItem key={props.sort} value="" className="all" >מיין לפי</MenuItem>
                                        <MenuItem key={props.sort} value="discount,desc" className="desc">הנחות : גבוה לנמוך</MenuItem>
                                        <MenuItem key={props.sort} value="price,asc" className="asc" >מחיר: נמוך לגבוה</MenuItem>
                                        <MenuItem key={props.sort} value="price,desc" className="desc" >מחיר: גבוה לנמוך</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="shop">
                            {props.shops.map((item) => (
                                <div key={item.id}>

                                    <a href={`/ProductPage/${item.id}`} key={item.id} id="Link">
                                        <div className="ajustitem">
                                            <div id="image">
                                                <img src={item.pictureUrl} key={item.pictureUrl} className="pictureUrlShop" />
                                                <div className="showLike">
                                                    {inCart(item.id) ?
                                                        <Button id="favorite" onClickCapture={(e) => e.preventDefault()} onClick={() => inCart(item.id) ? removeItem(item.id) : addItem({ id: item.id, name: item.name, price: item.price, img: item.pictureUrl, brand: item.brand.name, shopName: item.shop.name, originalPrice: item.originalPrice })} value={item.id}>
                                                            <FavoriteBorder className="favoriteBorderIcon" />
                                                        </Button>
                                                        :
                                                        <Button id="favorite" onClickCapture={(e) => e.preventDefault()} onClick={() => addItem({ id: item.id, name: item.name, price: item.price, img: item.pictureUrl, brand: item.brand.name, shopName: item.shop.name, originalPrice: item.originalPrice })} value={item.id}>
                                                            <FavoriteBorder />
                                                        </Button>
                                                    }
                                                </div>
                                                <div className="hoverItems">
                                                    {inCart(item.id) ?
                                                        <Button id="favorite" onClickCapture={(e) => e.preventDefault()} onClick={() => inCart(item.id) ? removeItem(item.id) : addItem({ id: item.id, name: item.name, price: item.price, img: item.pictureUrl, brand: item.brand.name, shopName: item.shop.name, originalPrice: item.originalPrice })} value={item.id}>
                                                            <FavoriteBorder className="favoriteBorderIcon" />
                                                        </Button>
                                                        :
                                                        <Button id="favorite" onClickCapture={(e) => e.preventDefault()} onClick={() => addItem({ id: item.id, name: item.name, price: item.price, img: item.pictureUrl, brand: item.brand.name, shopName: item.shop.name, originalPrice: item.originalPrice })} value={item.id}>
                                                            <FavoriteBorder />
                                                        </Button>
                                                    }

                                                    <Button href={item.url} target="_blank" rel="noopener noreferrer" id="buttonToSite">
                                                        <p className="linkToSite"> ראה מוצר באתר <b>{item.shop.name}</b></p>
                                                        <LaunchIcon />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="descPrice">
                                                <div>
                                                    {!item.discount
                                                        ?
                                                        <div className="originalPriceWithNoDiscount" >&#8362;{item.originalPrice}</div>
                                                        :
                                                        <div>
                                                            <div className="originalPriceWithDiscount" >&#8362;{item.originalPrice}</div>
                                                            <div className="price" key={item.price}>&#8362;{item.price}</div>
                                                            <div className="discount">{Number(item.discount.toFixed(1))}%</div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="ajustNames">
                                                    <div className="brandShop" key={item.brand.name}>{item.brand.name}</div>
                                                    <div className="shopName" key={item.name}>{item.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            ))}

                        </div>
                        
                    </div>
                    
                </>
          
        </div>
    );
};
export default Main;
