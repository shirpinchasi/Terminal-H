import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loader/Loader";
import { Link } from "react-router-dom";
import "./Shop.scss";
import ReactPaginate from "react-paginate"
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function Shop() {
    const { id } = useParams();
    const [shops, setShops] = useState([]);
    const [pages, setPages] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [itemsPerPage] = useState(30);
    const [sort, setSort] = useState("")
    

    useEffect(() => {
        if (!id) {
            return;
        }

        GetShop(id);

    }, [id, page,sort]);

console.log();
    async function GetShop(id) {
        const fetchShop = await (await fetch(`https://terminal-h.herokuapp.com/api/products?name&categorySectionId=${id}&projection=detailedProduct&page=${page}&size=${itemsPerPage}&sort=price,${sort}`,
            {
                method: "GET",
            })).json();
        const fetchPages = await (await fetch(`https://terminal-h.herokuapp.com/api/products?name&categorySectionId=${id}&projection=detailedProduct&page=${page}&size=${itemsPerPage}&sort=price,${sort}`, {
            method: "GET"
        })).json();
        console.log(page);
        console.log(fetchPages);
        setShops(fetchShop._embedded.products);
        setPages(fetchPages.page)
        setLoading(false)

    }

    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
        console.log(page);
        scrollToTop();
    };
    const handleChange = (e) =>{
        setSort(e.target.value)
        setLoading(true)
    }

    // const handleSort = (e) => {
    //     const sort = e.selected;
    //     setSort(sort)
        
        
    // };
    console.log(sort);
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        
    }








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
                    <div className="shop">
                        {shops.map(shop => (
                            <div >
                                <a href={`/ProductPage/${shop.id}`} id="Link">
                                    <div className="ajustShop">
                                        <img src={shop.pictureUrl} className="pictureUrlShop" />
                                        <div className="brandShop">{shop.brand.name}</div>
                                        <div className="shopName">{shop.name}</div>
                                        <div>&#8362;{shop.price}</div>
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
            )}

        </div>
    )
}

export default Shop;