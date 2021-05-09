import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader"
import "./SearchRes.scss";
import { useLocation, RouteComponentProps } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Search from "./Search";
import queryString from 'query-string'


function SearchResults() {

    const [isLoading, setLoading] = useState(true);
    const [product, setProducts] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [pages, setPages] = useState([]);
    const [itemsPerPage] = useState(30);
    const {search} = useLocation();
    console.log(search);

    useEffect(() => {

        if (!search) {
            return;
        };
    }, [search, pages]);

    async function getProducts() {
        try {
            const res = await fetch(`https://terminal-h.herokuapp.com/api/products${search}&projection=detailedProduct&page=${pageNum}&size=${itemsPerPage}`);
            const product = await res.json();
            const result = await fetch(`https://terminal-h.herokuapp.com/api/products${search}&projection=detailedProduct&page=${pageNum}&size=${itemsPerPage}`, {
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

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div>
            {isLoading ? (
            <Loading/>
            ):(

            <div>
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

export default SearchResults;













