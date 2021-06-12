import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader"
import "./SearchRes.scss";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function SearchResults() {

    const [isLoading, setLoading] = useState(true);
    const [product, setProducts] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [pages, setPages] = useState([]);
    const { search } = useLocation();
    const [sort, setSort] = useState("");
    const [sortCount, setSortCount] = useState(30)
    

    useEffect(() => {

        if (!search) {
            return;
        };
    }, [search, pages,sort , sortCount]);

    async function getProducts() {
        try {
            const res = await fetch(`https://terminal-h.herokuapp.com/api/products${search}&projection=detailedProduct&page=${pageNum}&size=${sortCount}&sort=price,${sort}`);
            const product = await res.json();
            const result = await fetch(`https://terminal-h.herokuapp.com/api/products${search}&projection=detailedProduct&page=${pageNum}&size=${sortCount}&sort=price,${sort}`, {
                method: "GET"
            })
            const pages = await result.json();
            setProducts(product._embedded.products)
            setPages(pages.page)

            setLoading(false)

        } catch (err) {
            console.log(err);
        };
    };

    getProducts();

    const handlePageClick = (e) => {
        const page = e.selected;
        setPageNum(page)
        console.log(page);
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

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (

                <div>
                    <FormControl id="onee">
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
                    <FormControl id="twoo">
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
                    <div className="products">
                        {product.map(prod => (
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
                        ))}


                        <ReactPaginate
                            className="pagination"
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pages.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            initialPage={0}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}