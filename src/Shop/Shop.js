import React, { useEffect, useState } from "react";
import { Redirect, useParams, withRouter } from "react-router-dom";
import Loading from "../Loader/Loader";
import "./Shop.scss";
import config from "../config/config";
import 'react-dropdown/style.css';
import Pagination from "./Pagination/Pagination";
import FilterMenu from "../Menu/FilterMenu";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

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
    const [categories, setCategories] = useState([]);
    const [catNames, setCatNames] = useState([])
    const [totalPages, setTotalPages] = useState([])
    const [state, setState] = React.useState({
        right: false,
    });
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
        });
    };



    useEffect(() => {
        if (!id) {
            return;
        };
        if (page || sortCount || gender || brandid || catNames || sort) {
            setLoading(true)
        }
        GetShop(id);

    }, [id, page, sort, sortCount, gender, brandid, catNames]);

    async function GetShop(id) {
        const fetchShop = await (await fetch(config.apiShop + `&categorySectionId=${id}&page=${page}&size=${sortCount}&sort=${sort}&sort=id,desc&gender=${gender}&brand=${brandid}&categoryId=${catNames}`, {
            method: "GET",
        })).json();
        const fetchCategories = await (await fetch(`https://terminal-h.herokuapp.com/api/sections/${id}/categories`, {
            method: "GET"
        })).json();
        const fetchedBrands = await (await fetch(config.apiBrands, {
            method: "GET",
        })).json();
        const categoryNameFetch = await (await fetch(config.apiSections + `&${id}`, {
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
        setLoading(false)
    };
    const handlePageChange = (e) => {
        setPage(e.target.value)
    };
    const handleSetGender = (e) => {
        setGender(e.target.value)
    };
    const handleSetCount = (e) => {
        setSortCount(e.target.value)
    };
    const handleChangeCategory = (e) => {
        setCatNames(e.target.value)
    };
    const handleChangeMultiple = (event) => {
        const {
            target: { value },
        } = event;
        setBrandId(

            typeof value === 'string' ? value.split(',') : value
        );
    };


    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <FilterMenu brandid={brandid} brands={brands} gender={gender} setGender={setGender} handleChangeMultiple={handleChangeMultiple} handleSetGender={handleSetGender} handleSetCount={handleSetCount} sortCount={sortCount} />
                    <Main brandid={brandid} brands={brands} gender={gender} setGender={setGender} handleChangeMultiple={handleChangeMultiple} handleSetGender={handleSetGender} handleSetCount={handleSetCount} sortCount={sortCount} categoryName={categoryName} totalElem={totalElem} sort={sort} setSort={setSort} shops={shops} />
                    <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange} />
                    <Footer />
                </>
            )}
        </div>
    );
};
export default withRouter(Shop);
