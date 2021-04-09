import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Loader/Loader";
import { Link } from "react-router-dom";
import "./BrandPage.scss";
import ReactPaginate from "react-paginate"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function BrandPage() {
    const { id } = useParams();
    const [brandProduct, setBrandProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(0);
    const [itemsPerPage] = useState(30);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        if (!id) {
            return;
        }
        getBrandProduct(id);
    }, [id, page , sort]);


    async function getBrandProduct(id) {
        const fetchBrandProduct = await (await fetch(`https://terminal-h.herokuapp.com/api/products?brand=${id}&projection=detailedProduct&page=${page}&size=${itemsPerPage}&sort=price,${sort}`, {
            method: "GET",
        })).json();
        const fetchPages = await (await fetch(`https://terminal-h.herokuapp.com/api/products?brand=${id}&projection=detailedProduct&page=${page}&size=${itemsPerPage}&sort=price,${sort}`, {
            method: "GET"
        })).json();
        setPages(fetchPages.page);
        setBrandProduct(fetchBrandProduct._embedded.products);
        setLoading(false);
        console.log(fetchPages.page);

    }
    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
        scrollToTop();
    };
    const handleChange = (e) => {
        setSort(e.target.value)
        setLoading(true)
    };
    function scrollToTop() {
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
                    <FormControl>
                        <InputLabel id="select">...הצג לפי</InputLabel>
                        <Select
                            labelId="select"
                            id="selectOption"
                            value={sort}
                            onChange={handleChange}
                            setLoading={false}
                        >
                            <MenuItem value={""}>...הצג לפי</MenuItem>
                            <MenuItem value={"asc"}> מחיר: מהנמוך לגבוה</MenuItem>
                            <MenuItem value={"desc"}> מחיר: מהגבוה לנמוך</MenuItem>
                        </Select>
                    </FormControl>
                <div className="brandProduct">
                    {brandProduct.map(brandPro => (
                        <div >
                            <Link to={`/ProductPage/${brandPro.id}`} id="Link">
                                <div className="ajustProductBrands">
                                    <img src={brandPro.pictureUrl} className="pictureUrlProBrands" />
                                    <div className="brandProBrands">{brandPro.brand.name}</div>
                                    <div>{brandPro.name}</div>
                                    <div>&#8362;{brandPro.price}</div>
                                </div>
                            </Link>
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
                        setLoading={false}
                    />
                </div>
            )}

        </div>
    )
}

export default BrandPage;