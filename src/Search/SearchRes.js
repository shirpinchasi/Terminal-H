import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader"
import "./SearchRes.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Shop/Pagination/Pagination";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import 'react-dropdown/style.css';



export default function SearchResults() {

    const [isLoading, setLoading] = useState(true);
    const [product, setProducts] = useState([]);
    const { search } = useLocation();
    const [sort, setSort] = useState("");
    const [value, setValue] = useState('');
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState([]);
    const [totalElem, setTotalElem] = useState([]);
    const [sortCount, setSortCount] = useState("30");
    const [gender, setGender] = useState('');
    const [brands, setBrands] = useState([]);
    const [brandid, setBrandId] = useState([]);
    const [catNames, setCatNames] = useState([])


    useEffect(() => {
        getProducts();
        if (!search) {
            return;
        };
        if (page) {
            setLoading(true)
        }

    }, [search, page, sort, value, sortCount]);




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

    function hasNoResults() {
        return search && product.length === 0;
    }
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
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="noRes">
                    {hasNoResults() ?
                        <h1><FontAwesomeIcon icon={faFrown} />
                            <i class="far fa-frown"></i>
                            אין תוצאות</h1>
                        :
                        <>
                            <Main brandid={brandid} brands={brands} gender={value} setGender={setGender} handleChangeMultiple={handleChangeMultiple} handleSetGender={handleSetGender} handleSetCount={handleSetCount} sortCount={sortCount} isLoading={isLoading} categoryName={""} totalElem={totalElem} sort={sort} setSort={setSort} shops={product} />
                            <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange} />
                            <Footer />
                        </>
                    }
                </div>
            )}
        </>
    )
}