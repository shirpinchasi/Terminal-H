import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Loading from "../Loader/Loader";
import "./Shop.scss";
import ReactPaginate from "react-paginate";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from "../config/config";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


export default function Shop(props) {
    const { id } = useParams();
    const [shops, setShops] = useState([]);
    const [pages, setPages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState("");
    const [gender, setGender] = useState("");
    const [sortCount, setSortCount] = useState(30);
    // const [favorites, setFevorites] = useState("");
    // const [savedFavorites] = useState(false)
    const [value, setValue] = useState('');



    useEffect(() => {
        if (!id) {
            return;
        }

        GetShop(id);

    }, [id, page, sort, gender, sortCount,value]);


    // useEffect(async () => {
    //     let savedFavorites = await localStorage.getItem("_Fav");
    //     if (savedFavorites) {
    //         setFevorites(savedFavorites)
    //     }
    // })

    async function GetShop(id) {
        const fetchShop = await (await fetch(config.apiShop + `&categorySectionId=${id}&page=${page}&size=${sortCount}&sort=price,${sort}&gender=${value}`, {
            method: "GET",
        })).json();
        const fetchPages = await (await fetch(config.apiShop + `&categorySectionId=${id}&page=${page}&size=${sortCount}&sort=price,${sort}&gender=${value}`, {
            method: "GET"
        })).json();
        setShops(fetchShop._embedded.products);
        setPages(fetchPages.page);
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
                    <div>
                    </div>

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
                    {/* <FormControl id="gender" component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangeGender}>
                            <FormControlLabel value="WOMEN" control={<Radio />} label="WOMEN" />
                            <FormControlLabel value="MEN" control={<Radio />} label="MEN" />
                            <FormControlLabel value="KIDS" control={<Radio />} label="KIDS" />
                            
                        </RadioGroup>
                    </FormControl> */}

                    <div className="shop">
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
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={1}
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