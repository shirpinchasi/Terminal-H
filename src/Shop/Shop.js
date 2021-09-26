import React, { useEffect, useState } from "react";
import { Redirect, useParams, withRouter } from "react-router-dom";
import Loading from "../Loader/Loader";
import "./Shop.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFilter } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from "react-paginate";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from "../config/config";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useCart } from "react-use-cart";
import LaunchIcon from '@mui/icons-material/Launch';
import { red } from '@mui/material/colors';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { maxWidth } from "@mui/system";
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const useStyles = makeStyles((theme) => ({
    root: {

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,

    },
}));


const Shop = () => {
    const { id } = useParams();
    const [shops, setShops] = useState([]);
    const [pages, setPages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState("");
    const [sortCount, setSortCount] = useState(30);
    const [value, setValue] = useState('');
    const [brands, setBrands] = useState([]);
    const [brandid, setBrandId] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [totalElem, setTotalElem] = useState([]);
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [catNames, setCatNames] = useState([])
    const { addItem, inCart, removeItem } = useCart();
    const [display, setDisplay] = useState({ display: "none" });
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
    for(let i =0; i <pages.totalPages; i++){
        pageOptions.push({
            value: i+1,
            label : `page ${i+1}`
        })
    }
    console.log(pageOptions.value);


    useEffect(() => {
        if (!id) {
            return;
        }
        GetShop(id);

    }, [id, page, sort, sortCount, value, brandid, catNames]);



    async function GetShop(id) {
        const fetchShop = await (await fetch(config.apiShop + `&categorySectionId=${id}&page=${page}&size=${sortCount}&sort=price,${sort}&gender=${value}&brand=${brandid}&categoryId=${catNames}`, {
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


        setCategoryName(categoryNameFetch.name)
        setShops(fetchShop._embedded.products);
        setPages(fetchShop.page);
        setTotalElem(fetchShop.page.totalElements)
        setBrands(fetchedBrands._embedded.brands);
        setLoading(false);
        setCategories(fetchCategories._embedded.categories)
    };

    const handleChangeGender = (event) => {
        setValue(event.target.value);
        setLoading(true)

    };


    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
        scrollToTop();

    };
    const handlePageChange = (e) => {
        setPage(e.target.value)
        scrollToTop();
      

    };
    const handleSortChange = (e) => {
        setSortCount(e.target.value)
        
    };

    const handleChangeCategory = (e) => {
        setCatNames(e.target.value)
      

    };
   
    const handleChangeSort = (e) => {
        setSort(e.target.value)
       

    };
    const handleBrandIdChange = (e) => {
        setBrandId(e.target.value)
      
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",

        });
    };
    const showButton = e => {
        e.preventDefault();
        setDisplay({ display: "block" });
    };

    const hideButton = e => {
        e.preventDefault();
        setDisplay({ display: "none" });
    };
console.log(pages);

    return (
        <div>

            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <h1 className="categoryName">{categoryName}</h1>
                    
                        <div className="FILTERS">
                            <Toolbar>
                                {['right'].map((anchor) => (
                                    <React.Fragment key={anchor}>
                                        {/* <Button onClick={toggleDrawer(anchor, true)}></Button> */}
                                        <IconButton
                                            color="black"
                                            aria-label="open drawer"
                                            edge="end"
                                            onClick={toggleDrawer(anchor, true)}
                                        >
                                            <div id="filterOptions">
                                                <FilterListIcon fontSize="small" />
                                                <p>פילטרים</p>
                                            </div>
                                        </IconButton>
                                        <Drawer
                                            anchor={anchor}
                                            open={state[anchor]}
                                        // onClose={toggleDrawer(anchor, false)}
                                        >
                                            <Box
                                                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
                                                role="presentation"
                                            // onClick={toggleDrawer(anchor, false)}

                                            >
                                                <ChevronLeftIcon onClick={toggleDrawer(anchor, false)} id="ChevronLeft" />
                                                <List direction="rtl">
                                                    <div className={classes.root}>
                                                        <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<KeyboardArrowDownIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"

                                                            >
                                                                <Typography className={classes.heading}>מיין לפי</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Typography>
                                                                    <FormControl component="fieldset" style={{ width: 200 }} id="radioSortBy">
                                                                        <RadioGroup
                                                                            aria-label="gender"
                                                                            name="controlled-radio-buttons-group"
                                                                            value={sort}
                                                                            onChange={handleChangeSort}
                                                                        >
                                                                            <FormControlLabel style={{ fontSize: 30 }} value="" control={<Radio />} label="מיין לפי" />
                                                                            <FormControlLabel value="asc" control={<Radio />} label="מחיר: נמוך לגבוה" />
                                                                            <FormControlLabel value="desc" control={<Radio />} label="מחיר: גבוה לנמוך" />
                                                                        </RadioGroup>
                                                                    </FormControl>

                                                                </Typography>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<KeyboardArrowDownIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"

                                                            >
                                                                <Typography className={classes.heading}>כמות מוצרים בדף</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Typography>
                                                                <FormControl component="fieldset" style={{ width: 200 }} id="radioSortBy">
                                                                        <RadioGroup
                                                                            aria-label="gender"
                                                                            name="controlled-radio-buttons-group"
                                                                            value={sortCount}
                                                                            onChange={handleSortChange}
                                                                        >
                                                                            <FormControlLabel style={{ fontSize: 30 }} value="30" control={<Radio />} label="30" />
                                                                            <FormControlLabel value="60" control={<Radio />} label="60" />
                                                                            <FormControlLabel value="90" control={<Radio />} label="90" />
                                                                            <FormControlLabel value="120" control={<Radio />} label="120" />
                                                                        </RadioGroup>
                                                                    </FormControl>

                                                                </Typography>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        {/* <Accordion id="accordion">
                                                            <AccordionSummary
                                                                expandIcon={<FontAwesomeIcon icon={faFilter} />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography className={classes.heading}>Filter</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Typography>
                                                                    <FormControl id="acordionone">
                                                                        <InputLabel id="select">...הצג לפי</InputLabel>
                                                                        <Select
                                                                            labelId="select"
                                                                            id="selectOption1"
                                                                            value={sort}
                                                                            onChange={handleChangeSort}
                                                                            setLoading={false}
                                                                        >
                                                                            <MenuItem value={""}>...הצג לפי</MenuItem>
                                                                            <MenuItem value={"asc"}> מחיר: מהנמוך לגבוה</MenuItem>
                                                                            <MenuItem value={"desc"}> מחיר: מהגבוה לנמוך</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Typography>
                                                                <Typography>
                                                                    <FormControl id="acordiontwo">
                                                                        <InputLabel id="select">כמות מוצרים</InputLabel>
                                                                        <Select
                                                                            labelId="select"
                                                                            id="selectOption2"
                                                                            value={sortCount}
                                                                            onChange={handleSortChange}
                                                                            setLoading={false}
                                                                        >
                                                                            <MenuItem value={"30"}> 30 </MenuItem>
                                                                            <MenuItem value={"60"}> 60 </MenuItem>
                                                                            <MenuItem value={"90"}> 90 </MenuItem>
                                                                            <MenuItem value={"120"}> 120 </MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Typography>
                                                                <FormControl id="acordionGender">
                                                                    <InputLabel id="select">מגדר</InputLabel>
                                                                    <Select
                                                                        labelId="select"
                                                                        id="selectOption3"
                                                                        value={value}
                                                                        onChange={handleChangeGender}
                                                                        setLoading={false}
                                                                    >
                                                                        <MenuItem value={"WOMEN"}>נשים</MenuItem>
                                                                        <MenuItem value={"MEN"}> גברים </MenuItem>
                                                                        <MenuItem value={"KIDS"}> ילדים </MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                <Typography>

                                                                </Typography>
                                                                <Typography>
                                                                    <FormControl id="acordionFour">
                                                                        <InputLabel id="select">מותג</InputLabel>
                                                                        <Select

                                                                            labelId="select"
                                                                            id="selectOption1"
                                                                            value={brandid}
                                                                            onChange={handleBrandIdChange}
                                                                            setLoading={false}
                                                                        >
                                                                            {brands.map((brand, index) =>
                                                                                <MenuItem key={index} value={brand.id} className="abc" >{brand.name}</MenuItem>
                                                                            )}
                                                                        </Select>
                                                                    </FormControl>
                                                                </Typography>
                                                                {/* <button onClick={onFilterClick} setLoading={false}>Filter</button>  */}
                                                        {/* </AccordionDetails>
                                                        </Accordion> */}

                                                    </div>
                                                </List>
                                            </Box>
                                        </Drawer>
                                    </React.Fragment>
                                ))}
                            </Toolbar>
                                <div></div>
                            <div className="totalElements">
                                {totalElem} תוצאות
                            </div>
                        </div>
                    


                    <div className="shop">
                        {/* <div className="filters">
                            <FormControl id="category">
                                <InputLabel id="select">קטגוריה</InputLabel>
                                <Select

                                    labelId="select"
                                    id="selectOption1"
                                    value={catNames}
                                    onChange={handleChangeCategory}
                                    setLoading={false}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {categories.map((cat, index) =>
                                        <MenuItem key={index} value={cat.id} className="abc" >{cat.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>



                            <FormControl id="gender">
                                <InputLabel id="select">מגדר</InputLabel>
                                <Select
                                    labelId="select"
                                    id="selectOption3"
                                    value={value}
                                    onChange={handleChangeGender}
                                    setLoading={false}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"WOMEN"}>נשים</MenuItem>
                                    <MenuItem value={"MEN"}> גברים </MenuItem>
                                    <MenuItem value={"KIDS"}> ילדים </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl id="four">
                                <InputLabel id="select">מותג</InputLabel>
                                <Select

                                    labelId="select"
                                    id="selectOption1"
                                    value={brandid}
                                    onChange={handleBrandIdChange}
                                    setLoading={false}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {brands.map((brand, index) =>
                                        <MenuItem key={index} value={brand.id} className="abc" >{brand.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                        </div> */}


                        {shops.map((shop, index) => (
                            <div key={index} className="prodView">
                                <a href={`/ProductPage/${shop.id}`} key={shop.id} id="Link">
                                    <div className="ajustShop">
                                        <img src={shop.pictureUrl} key={shop.pictureUrl} className="pictureUrlShop" />
                                        <div className="brandShop" key={shop.brand.name}>{shop.brand.name}</div>
                                        <div className="shopName" key={shop.name}>{shop.name}</div>
                                        <div key={shop.price}>&#8362;{shop.price}</div>

                                    </div>
                                </a>

                                {inCart(shop.id) ?
                                    <Button onClick={() => inCart(shop.id) ? removeItem(shop.id) : addItem({ id: shop.id, name: shop.name, price: shop.price, img: shop.pictureUrl, brand: shop.brand.name })} value={shop.id}>
                                        <FavoriteBorder className="favoriteBorderIcon" />
                                    </Button>
                                    :
                                    <Button onClick={() => addItem({ id: shop.id, name: shop.name, price: shop.price, img: shop.pictureUrl, brand: shop.brand.name })} value={shop.id}>
                                        <FavoriteBorder />
                                    </Button>
                                }

                                <Button href={shop.url} target="_blank" rel="noopener noreferrer" id="buttonToSite">
                                    <p className="linkToSite"> ראה מוצר באתר <b>{shop.shop.name}</b></p>
                                    <LaunchIcon />
                                </Button>

                            </div>
                        ))}

                    </div>
                    
                    <ReactPaginate
                        className="pagination"
                        previousLabel={"הקודם"}
                        nextLabel={"הבא"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pages.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        initialPage={0}
                    />
                    
                   
                </div>
            )}
        <div id="phonePagination">
            <div>
                
            {pages.number ||1}
            </div>
            /
            <FormControl>
                                <InputLabel ></InputLabel>
                                <Select
                                    labelId="select"
                                    id="selectOptionPage"
                                    value={page}
                                    onChange={handlePageChange}
                                    setLoading={false}
                                >
                                     {pageOptions.map((pageNum, index) =>
                                        <MenuItem key={pageNum.value} value={pageNum.value} className="abc" >{pageNum.value}</MenuItem>
                                    )}  
                                    
                                </Select>
                            </FormControl>
        </div>
        </div>
    );
};
export default withRouter(Shop)