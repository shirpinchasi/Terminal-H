import React, { useEffect, useState } from "react";
import config from "../config/config"
import Loading from "../Loader/Loader";
import Pagination from "../Shop/Pagination/Pagination";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";


export default function Feed() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setPages] = useState([]);
    const [sort, setSort] = useState("");
    const [sortCount, setSortCount] = useState("30");
    const [gender, setGender] = useState('');
    const [brands, setBrands] = useState([]);
    const [brandid, setBrandId] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [catNames, setCatNames] = useState([])
    const [totalElem, setTotalElem] = useState([]);

    useEffect(() => {
        if (page) {
            setLoading(true)
        }

        getData();

    }, [page]);


    async function getData() {

        const res = await (await fetch(config.apiShop + `&sort=discount,desc&sort=id,desc&size=${sortCount}&page=${page}`, {
            method: "GET"
        })).json();
        setCategories(res._embedded.products);
        setPages(res.page);
        setLoading(false)
        setTotalElem(res.page.totalElements)
    }


    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
    };
    const handlePageChange = (e) => {
        setPage(e.target.value)
    };

    const pageOptions = []
    for (let i = 0; i < totalPages.totalPages; i++) {
        pageOptions.push({
            value: i + 1,
            label: `page ${i + 1}`
        })
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
                <>
                    <Main brandid={brandid} brands={brands} gender={gender} setGender={setGender} handleChangeMultiple={handleChangeMultiple} handleSetGender={handleSetGender} handleSetCount={handleSetCount} sortCount={sortCount} isLoading={isLoading} categoryName={""} totalElem={totalElem} sort={sort} setSort={setSort} shops={categories} />
                    <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange} />
                    <Footer />
                    
                </>

            )}

        </>
    )
}