import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Loading from "../Loader/Loader";
import "./Shop.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from "react-paginate";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from "../config/config";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


  const useStyles = makeStyles((theme) => ({
    root: {
      width: '50%',
      display : "flex",
      flexDirection : "column",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
     
    },
  }));


export default function Shop(props) {
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
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);
    



    useEffect(() => {
        if (!id) {
            return;
        }
        GetShop(id);

    }, [id, page, sort, sortCount,value, brandid]);



    async function GetShop(id) {
        const fetchShop = await (await fetch(config.apiShop + `&categorySectionId=${id}&page=${page}&size=${sortCount}&sort=price,${sort}&gender=${value}&brand=${brandid}`, {
            method: "GET",
        })).json();
        const res = await fetch("https://terminal-h.herokuapp.com/api/brands?projection=detailedBrand&sort=name,asc", {
                    method: "GET",
                })
        
        setShops(fetchShop._embedded.products);
        setPages(fetchShop.page);
        const fetchedBrands = await res.json();
        setBrands(fetchedBrands._embedded.brands);
        setLoading(false);
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
    const handleSortChange = (e) => {
        setSortCount(e.target.value)
        setLoading(true)
    };
    const handleChange = (e) => {
        setSort(e.target.value)
        setLoading(true)
    };
    const handleBrandIdChange = (e) => {
        setBrandId(e.target.value)
        setLoading(true)
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
            
        });
    };
    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
      };
    
    
      
   


    return (
        <div>

            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <div className="shop">
                    <div className="filters">
                        <FormControl id="one">
                        <InputLabel id="select">...הצג לפי</InputLabel>
                        <Select
                            labelId="select"
                            id="selectOption1"
                            value={sort}
                            onChange={handleChange}
                            setLoading={false}
                        >
                            <MenuItem value={""}>...הצג לפי</MenuItem>
                            <MenuItem value={"asc"}> מחיר: מהנמוך לגבוה</MenuItem>
                            <MenuItem value={"desc"}> מחיר: מהגבוה לנמוך</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl id="two">
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
                    <br/>
                    <FormControl id="gender">
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
                    <br/><FormControl id="four">
                        <InputLabel id="select">מותג</InputLabel>
                        <Select
                        
                            labelId="select"
                            id="selectOption1"
                            value={brandid}
                            onChange={handleBrandIdChange}
                            setLoading={false}
                        >
                            {brands.map((brand, index) =>
                                <MenuItem key={index} value={brand.id}  className="abc" >{brand.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                        </div>
                        {shops.map((shop ,index) => (
                            <div key={index}>
                                <a href={`/ProductPage/${shop.id}`} key={shop.id} id="Link">
                                    <div className="ajustShop">
                                        <img src={shop.pictureUrl} key={shop.pictureUrl} className="pictureUrlShop" />
                                        <div className="brandShop" key={shop.brand.name}>{shop.brand.name}</div>
                                        <div className="shopName" key={shop.name}>{shop.name}</div>
                                        <div key={shop.price}>&#8362;{shop.price}</div>

                                    </div>
                                </a>
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

        </div>
    );
};