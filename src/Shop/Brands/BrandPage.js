import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Loader/Loader";
import { Link } from "react-router-dom";
import "./BrandPage.scss";
import Pagination from "../Pagination/Pagination";
import config from "../../config/config";
import { Button, Toolbar } from "@material-ui/core";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useCart } from "react-use-cart";
import LaunchIcon from '@mui/icons-material/Launch';
import 'react-dropdown/style.css';
import FilterMenu from "../../Menu/FilterMenu";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BrandPage() {
    const { id } = useParams();
    const [brandProduct, setBrandProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [sort, setSort] = useState("");
    const [gender, setGender] = useState('');
    const [page, setPage] = useState(0);
    const [brandid,setBrandId] = useState('')
    const [sortCount, setSortCount] = useState(30)
    const [totalPages, setPages] = useState([]);
    const { addItem, inCart, removeItem } = useCart();
    const [totalElem, setTotalElem] = useState([]);


    useEffect(() => {
        if (!id) {
            return;
        }
        getBrandProduct(id);
    }, [id, page, sort, sortCount, gender]);


    async function getBrandProduct(id) {
        const fetchBrandProduct = await (await fetch(config.apiShop + `&brand=${id}&page=${page}&size=${sortCount}&sort=${sort}&gender=${gender}`, {
            method: "GET",
        })).json();
        setPages(fetchBrandProduct.page);
        setBrandProduct(fetchBrandProduct._embedded.products);
        setLoading(false);
        setTotalElem(fetchBrandProduct.page.totalElements)

    }
    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
        scrollToTop();
    };
    const handleChangeGender = (event) => {
        setGender(event.target.value);
        setLoading(true)
    };
    const handleSortChange = (e) => {
        setSortCount(e.target.value)
        setLoading(true)
    };
    const handleChange = (e) => {
        setSort(e.target.value)
        setLoading(true)
    };
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const pageOptions = []
    for (let i = 0; i < totalPages.totalPages; i++) {
        pageOptions.push({
            value: i + 1,
            label: `page ${i + 1}`
        })
    };
    const handlePageChange = (e) => {
        setPage(e.target.value)
        scrollToTop();
    };
    const handleChangeMultiple = (event) => {
        const {
            target: {value },
        } = event;
        setBrandId(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(value);
    };




    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                <div className="ShopFilters">
                
                        
                <FilterMenu brands={brandProduct} brandid={id} handleChangeMultiple={handleChangeMultiple} gender={gender} setGender={setGender}  handleSetGender={handleChangeGender}  handleSetCount={handleSortChange} sortCount={sortCount}/>
                
                
                
                
                <div className="totalElements">
                    {totalElem} תוצאות
                </div>
                <div>

                    <FormControl id="category">
                        <InputLabel id="select">מיין לפי : </InputLabel>
                        <Select

                            labelId="select"
                            id="selectOption1"
                            value={sortCount}
                            onChange={(e) => setSort(e.target.value)}

                        >
                            <MenuItem key={sortCount} value="" className="all" >מיין לפי</MenuItem>
                            <MenuItem key={sortCount} value="discount,desc" className="desc">הנחות : גבוה לנמוך</MenuItem>
                            <MenuItem key={sortCount} value="price,asc" className="asc" >מחיר: נמוך לגבוה</MenuItem>
                            <MenuItem key={sortCount} value="price,desc" className="desc" >מחיר: גבוה לנמוך</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
                <div className="brandProduct">
                    
                        {brandProduct.map(brandProduct => (
                            <div >
                                <Link to={`/ProductPage/${brandProduct.id}`} id="Link">
                                <div className="ajustShop">
                                        <div id="image">
                                            <img src={brandProduct.pictureUrl} key={brandProduct.pictureUrl} className="pictureUrlShop" />
                                            <div className="hoverItems">
                                                {inCart(brandProduct.id) ?
                                                    <Button id="favorite" onClickCapture={(e)=> e.preventDefault()} onClick={() => inCart(brandProduct.id) ? removeItem(brandProduct.id) : addItem({ id: brandProduct.id, name: brandProduct.name, price: brandProduct.price, img: brandProduct.pictureUrl, brand: brandProduct.brand.name })} value={brandProduct.id}>
                                                        <FavoriteBorder  className="favoriteBorderIcon" />
                                                    </Button>
                                                    :
                                                    <Button id="favorite" onClickCapture={(e)=> e.preventDefault()} onClick={() =>   addItem({ id: brandProduct.id, name: brandProduct.name, price: brandProduct.price, img: brandProduct.pictureUrl, brand: brandProduct.brand.name })} value={brandProduct.id}>
                                                        <FavoriteBorder  />
                                                    </Button>
                                                }

                                                <Button href={brandProduct.url} target="_blank" rel="noopener noreferrer" id="buttonToSite">
                                                    <p className="linkToSite"> ראה מוצר באתר <b>{brandProduct.shop.name}</b></p>
                                                    <LaunchIcon />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="descPrice">
                                        <div>
                                                {!brandProduct.discount ? 
                                                        <div className="originalPriceWithNoDiscount" >&#8362;{brandProduct.originalPrice}</div>
                                                        :
                                                    <div> 
                                                        <div className="originalPriceWithDiscount" >&#8362;{brandProduct.originalPrice}</div>
                                                        <div className="price" key={brandProduct.price}>&#8362;{brandProduct.price}</div>
                                                        <div className="discount">{Number(brandProduct.discount.toFixed(1))}%</div>
                                                        
                                                       
                                                </div>

                                                }
                                                
                                                
                                            </div>
                                            <div className="ajustNames">
                                            <div className="brandShop" key={brandProduct.brand.name}>{brandProduct.brand.name}</div>
                                            <div className="shopName" key={brandProduct.name}>{brandProduct.name}</div>
                                            </div>
                                        </div>
                                        
                                        
                                            
                                            
                                       
                                        
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange}  />
                </>
            
            )}
        </div>
    )
}