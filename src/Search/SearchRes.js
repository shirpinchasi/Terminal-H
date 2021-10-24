import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader"
import "./SearchRes.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Shop/Pagination/Pagination";
import { Button, Toolbar } from "@material-ui/core";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useCart } from "react-use-cart";
import LaunchIcon from '@mui/icons-material/Launch';
import 'react-dropdown/style.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterMenu from "../Menu/FilterMenu";
import config from "../config/config";


export default function SearchResults() {

    const [isLoading, setLoading] = useState(true);
    const [product, setProducts] = useState([]);
    const { search } = useLocation();
    const [sort, setSort] = useState("");
    const [value, setValue] = useState('');
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState([]);
    const [sortCount, setSortCount] = useState(30);
    const { addItem, inCart, removeItem } = useCart();
    const [totalElem, setTotalElem] = useState([]);


    useEffect(() => {
        getProducts();
        if (!search) {
            return;
        };
        if(page){
            setLoading(true)
        }
        
    }, [search, page,sort ,value,sortCount]);




    async function getProducts() {
        try {
            const res = await fetch(` https://terminal-h.herokuapp.com/api/products${search}&projection=detailedProduct&page=${page}&size=${sortCount}&sort=${sort}&gender=${value}`);
            const product = await res.json();
            setProducts(product._embedded.products)
            setTotalPages(product.page)
            setLoading(false)
            setTotalElem(product.page.totalElements)

        } catch (err) {
            console.log(err);
        }
    }
    const pageOptions = []
    for (let i = 0; i < totalPages.totalPages; i++) {
        pageOptions.push({
            value: i + 1,
            label: `page ${i + 1}`
        })
    }

    const handlePageChange = (e) => {
        setPage(e.target.value)
    };

    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
    };

    function hasNoResults(){
        return search && product.length === 0;
    }

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="noRes">
                {hasNoResults()?
                <h1><FontAwesomeIcon icon={faFrown}/>
                <i class="far fa-frown"></i>
                    אין תוצאות</h1>
                :
                <div>
                   <div>
                        <div id="resultsFor">תוצאות לחיפוש "{decodeURI(window.location.search.split("=")[1].split("%20").join(" "))}"</div>
                        </div>
                        <div className="ShopFilters">
                        <div className="totalElements">
                            {totalElem} תוצאות
                        </div>
                        <div>

                            <FormControl id="category">
                                <InputLabel id="select">מיין לפי : </InputLabel>
                                <Select

                                    labelId="select"
                                    id="selectOption1"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}

                                >
                                    <MenuItem key={sort} value="" className="all" >מיין לפי</MenuItem>
                                    <MenuItem key={sort} value="discount,desc" className="desc">הנחות : גבוה לנמוך</MenuItem>
                                    <MenuItem key={sort} value="price,asc" className="asc" >מחיר: נמוך לגבוה</MenuItem>
                                    <MenuItem key={sort} value="price,desc" className="desc" >מחיר: גבוה לנמוך</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    
                    <div className="products">
                    {product.map((shop) => (
                            <div key={shop.id}>
                                <a href={`/ProductPage/${shop.id}`} key={shop.id} id="Link">
                                    <div className="ajustShop">
                                        <div id="image">
                                            <img src={shop.pictureUrl} key={shop.pictureUrl} className="pictureUrlShop" />
                                            <div className="hoverItems">
                                                {inCart(shop.id) ?
                                                    <Button id="favorite" onClickCapture={(e)=> e.preventDefault()} onClick={() => inCart(shop.id) ? removeItem(shop.id) : addItem({ id: shop.id, name: shop.name, price: shop.price, img: shop.pictureUrl, brand: shop.brand.name, shopName:shop.shop.name })} value={shop.id}>
                                                        <FavoriteBorder  className="favoriteBorderIcon" />
                                                    </Button>
                                                    :
                                                    <Button id="favorite" onClickCapture={(e)=> e.preventDefault()} onClick={() =>   addItem({ id: shop.id, name: shop.name, price: shop.price, img: shop.pictureUrl, brand: shop.brand.name })} value={shop.id}>
                                                        <FavoriteBorder  />
                                                    </Button>
                                                }

                                                <Button href={shop.url} target="_blank" rel="noopener noreferrer" id="buttonToSite">
                                                    <p className="linkToSite"> ראה מוצר באתר <b>{shop.shop.name}</b></p>
                                                    <LaunchIcon />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="descPrice">
                                        <div>
                                                {!shop.discount ? 
                                                        <div className="originalPriceWithNoDiscount" >&#8362;{shop.originalPrice}</div>
                                                        :
                                                    <div> 
                                                        <div className="originalPriceWithDiscount" >&#8362;{shop.originalPrice}</div>
                                                        <div className="price" key={shop.price}>&#8362;{shop.price}</div>
                                                        <div className="discount">{Number(shop.discount.toFixed(1))}%</div>
                                                        
                                                       
                                                </div>

                                                }
                                                
                                                
                                            </div>
                                            <div className="ajustNames">
                                            <div className="brandShop" key={shop.brand.name}>{shop.brand.name}</div>
                                            <div className="shopName" key={shop.name}>{shop.name}</div>
                                            </div>
                                        </div>
                                        
                                        
                                            
                                            
                                       
                                        
                                    </div>
                                </a>

                            </div>
                        ))}
                        {/* {product.map(prod => (
                            
                            <div>
                                <a href={`/ProductPage/${prod.id}`} id="Link">
                                    <div className="ajustProducts">
                                        <img src={prod.pictureUrl} className="pictureUrlProducts" />
                                        <div className="brandProducts">{prod.brand.name}</div>
                                        <div>{prod.name}</div>
                                        <div>&#8362; {prod.price}</div>

                                    </div>
                                </a>
                            </div>
                            
                        ))} */}


                        
                    </div>
            
                </div>
            }
            <Pagination totalPages={totalPages.totalPages} page={page}  pageOptions={pageOptions} totalNumbers={totalPages.number} handlePageClick={handlePageClick} handlePageChange={handlePageChange} />
                </div>
            )}
        </div>
    )
}