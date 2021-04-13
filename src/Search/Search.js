import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import {Redirect,useHistory, useLocation} from "react-router-dom";
import history from "../history"

function Search() {

    const [query, setQuery] = useState("");
    const [product, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [pages, setPages] = useState([]);
    const [itemsPerPage] = useState(30);
    let history = useHistory()
 


    const handleChangeInput = (e) => {
        setSearchValue(e.target.value);
    }
    const reset = () => {
        setProducts([]);
    };
    const resetLoading = () => {
        setLoading(true);
    };

    const CallSearchFunction = (e) => {
        e.preventDefault();
        reset();
        resetLoading();
        onLoadProducts();
        setQuery(searchValue);
        <Redirect to="/SearchResults"/>
    };
    function onLoadProducts() {
        setLoading(true);
        <Loading />
    };


    useEffect(() => {

        if (!query) {
            return;
        };
        
        getProducts();
    }, [query, pageNum]);

    async function getProducts() {
        try {
            const res = await fetch(`https://terminal-h.herokuapp.com/api/products?name=${query}&projection=detailedProduct&page=${pageNum}&size=${itemsPerPage}`);
            const product = await res.json();
            const result = await fetch(`https://terminal-h.herokuapp.com/api/products?name=${query}&projection=detailedProduct&page=${pageNum}&size=${itemsPerPage}`, {
                method: "GET"
            })
            const pages = await result.json();
            setProducts(product._embedded.products)
            setPages(pages.page)
            console.log(pages.page);
            setLoading(false)

        } catch (err) {
            console.log(err);
        };
    };

    const handlePageClick = (e) => {
        const page = e.selected;
        setPageNum(page)
        console.log(page);
        scrollToTop();
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div >
            <div>
                <form className="form" onSubmit={CallSearchFunction}>
                    <input className="Search"
                        placeholder="search Product Here.."
                        value={searchValue}
                        onChange={handleChangeInput}
                        type="text"
                        className="searchInput"
                    />

                    <FontAwesomeIcon icon={faSearch} className="far fa-search fa-sm" onClick={CallSearchFunction} onClick={onLoadProducts} />

                </form>
            </div>
            <div>

                {isLoading ?
                    <div></div>
                    :
                    <div>
                        <hr />
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
                        </div>
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

                }
            </div>
        </div>
    );
};
export default Search;