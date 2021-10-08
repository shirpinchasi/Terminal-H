import React, { useEffect, useState } from "react";
import { Redirect, useParams, withRouter } from "react-router-dom";
import Loading from "../Loader/Loader";
import "./Shop.scss";
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
import Pagination from "./Pagination/Pagination";
import FilterMenu from "../Menu/FilterMenu";



const useStyles = makeStyles((theme) => ({
    root: {

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,

    },
    error: {
        color: theme.palette.error.dark,
        fontSize: '1em'
    },
    checkBox: {
        color: purple['700']
    }
}));


const Shop = () => {
    const { id } = useParams();
    const [shops, setShops] = useState([]);
    const [page, setPage] = useState(0)
    const [isLoading, setLoading] = useState(true);
    const [sort, setSort] = useState("");
    const [sortCount, setSortCount] = useState("30");
    const [gender, setGender] = useState('');
    const [brands, setBrands] = useState([]);
    const [brandid, setBrandId] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [totalElem, setTotalElem] = useState([]);
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [catNames, setCatNames] = useState([])
    const { addItem, inCart, removeItem } = useCart();
    const [totalPages, setTotalPages] = useState([])
    const [state, setState] = React.useState({
        right: false,
    });
    const [checked, setChecked] = React.useState(true);


    const toggleDrawer = (anchor, openDrawer) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: openDrawer });
    };
    const pageOptions = []
    for (let i = 0; i < totalPages.totalPages; i++) {
        pageOptions.push({
            value: i + 1,
            label: `page ${i + 1}`
        })
    }

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


    const handleChangeMultiple = (event) => {
        const {
            target: {value,key },
        } = event;
        setBrandId(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(value,key);
    };




    useEffect(() => {
        if (!id) {
            return;
        }
        // if(handlePageClick){
        //     setLoading(true)
        // }
        GetShop(id);

    }, [id,page, sort, sortCount, gender, brandid, catNames]);



    async function GetShop(id) {
        const fetchShop = await (await fetch(config.apiShop + `&categorySectionId=${id}&page=${page}&size=${sortCount}&sort=${sort}&gender=${gender}&brand=${brandid}&categoryId=${catNames}`, {
            method: "GET",
        })).json();
        const fetchCategories = await (await fetch(`https://terminal-h.herokuapp.com/api/sections/${id}/categories`, {
            method: "GET"
        })).json();
        const fetchedBrands = await (await fetch("https://terminal-h.herokuapp.com/api/brands?projection=detailedBrand&sort=name,asc", {
            method: "GET",
        })).json();
        const categoryNameFetch = await (await fetch(`https://terminal-h.herokuapp.com/api/sections/${id}`, {
            method: "GET"
        })).json();
 

        setTotalPages(fetchShop.page);
        setCategoryName(categoryNameFetch.name)
        setShops(fetchShop._embedded.products);
        setTotalElem(fetchShop.page.totalElements)
        setBrands(fetchedBrands._embedded.brands);
        setLoading(false);
        setCategories(fetchCategories._embedded.categories)
    };



    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
        scrollToTop();
        setLoading(false)
    };
    const handlePageChange = (e) => {
        setPage(e.target.value)
        scrollToTop();


    };
    const handleSetGender = (e) => {
        setGender(e.target.value)
        scrollToTop();
    };
    const handleSetCount = (e) => {
        setSortCount(e.target.value)
        scrollToTop();
    };

    const handleChangeCategory = (e) => {
        setCatNames(e.target.value)


    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",

        });
    };



    return (
        <div>

            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    
                    <h1 className="categoryName">{categoryName}</h1>

                    <div className="ShopFilters">
                
                        
                        <FilterMenu brandid={brandid} brands={brands} gender={gender} setGender={setGender}  handleChangeMultiple={handleChangeMultiple} handleSetGender={handleSetGender}  handleSetCount={handleSetCount} sortCount={sortCount}/>
                        
                        
                        
                        
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



                    <div className="shop">
                        {shops.map((shop) => (
                            <div key={shop.id}>
                                <a href={`/ProductPage/${shop.id}`} key={shop.id} id="Link">
                                    <div className="ajustShop">
                                        <div id="image">
                                            <img src={shop.pictureUrl} key={shop.pictureUrl} className="pictureUrlShop" />
                                            <div className="hoverItems">
                                                {inCart(shop.id) ?
                                                    <Button id="favorite" onClickCapture={(e)=> e.preventDefault()} onClick={() => inCart(shop.id) ? removeItem(shop.id) : addItem({ id: shop.id, name: shop.name, price: shop.price, img: shop.pictureUrl, brand: shop.brand.name })} value={shop.id}>
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

                    </div>
                    <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange}  />
                    

                </div>

            )}

        </div>
    );
};
export default withRouter(Shop)