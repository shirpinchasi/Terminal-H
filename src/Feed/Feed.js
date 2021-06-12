import React, { useEffect, useState } from "react";
import config from "../config/config"
import Loading from "../Loader/Loader";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";



export default function Feed() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [itemsPerPage] = useState(30);
    const [pages, setPages] = useState([]);

    useEffect(() => {

        getData();

    }, [page])


    async function getData() {

        const res = await (await fetch(config.apiShop + `&sort=id,desc&size=${itemsPerPage}&page=${page}`, {
            method: "GET"
        })).json();
        setCategories(res._embedded.products);

        const fetchPages = await (await fetch(config.apiShop + `&sort=id,desc&size=${itemsPerPage}&page=${page}`, {
            method: "GET"
        })).json();
        setPages(fetchPages.page);
        setLoading(false)
    }


    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
        scrollToTop();
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
                <div className="shop">
                    {categories.map(category => (
                        <div>
                            <Link to={`/ProductPage/${category.id}`} id="Link">
                                <div className="ajustShop">
                                    <img src={category.pictureUrl} className="pictureUrlShop" />
                                    <div className="brandShop">{category.brand.name}</div>
                                    <div className="shopName">{category.name}</div>
                                    <div>&#8362;{category.price}</div>

                                </div>
                            </Link>

                        </div>
                    ))}
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
    )
}