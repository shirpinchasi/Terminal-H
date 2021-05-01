import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import {Redirect,useHistory, withRouter } from "react-router-dom";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import SearchResults from "./SearchRes";


function Search() {

    const [query, setQuery] = useState("");
    const [product, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [pages, setPages] = useState([]);
    const [itemsPerPage] = useState(30);
    const history = useHistory();
   
   


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
        
        history.push("/SearchResults")
    };
    function onLoadProducts() {
        setLoading(true);
        <Loading />
    };


    useEffect(() => {

        if (!query) {
            return;
        };
        
        getProducts(query);
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
    function hasNoResults(){
        return query && product.length === 0;
    }

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
                        
                        <div className="products">
                            {hasNoResults()
                            ?<div>no results</div>
                            :product.map(prod => <SearchResults prod={prod}/>)
                            
                            }
                            {/* {product.map(prod => (
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
                            ))} */}
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
export default withRouter(Search);