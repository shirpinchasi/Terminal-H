import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loader/Loader";
import { Link } from "react-router-dom";
import "./Shop.scss";
import ReactPaginate from "react-paginate"


function Shop() {
    const { id } = useParams();
    const [shops, setShops] = useState([]);
    const [pages, setPages] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [page , setPage] = useState(0);
    const [itemsPerPage] = useState(30);
    
    

    useEffect(() => {
        if (!id) {
            return;
        }
        
        GetShop(id);
        
    }, [id,page]);


    async function GetShop(id) {
        const fetchShop = await (await fetch(`https://terminal-h.herokuapp.com/api/products/search/findByCategorySectionId?sectionId=${id}&projection=detailedProduct&sort=price&page=${page}&size=${itemsPerPage}`,
         {
            method: "GET",
        })).json();
        const fetchPages = await (await fetch(`https://terminal-h.herokuapp.com/api/products/search/findByCategorySectionId?sectionId=${id}&projection=detailedProduct&sort=price&page=${page}&size=${itemsPerPage}`,{
            method:"GET"
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
};


  
    
    
   
 

    return (
        <div>
            
            {isLoading ? (
                <Loading/>
            ) : (
                <div>
                <div className="shop">
                    {shops.map(shop => (
                        <div >
                            <Link to={`/ProductPage/${shop.id}`} id="Link">
                                <div className="ajustShop">
                                    <img src={shop.pictureUrl} className="pictureUrlShop" />
                                    <div className="brandShop">{shop.brand.name}</div>
                                    <div className="shopName">{shop.name}</div>
                                    <div>&#8362;{shop.price}</div>
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
                initialPage ={0}

            />
                </div>
            )}

        </div>
    )
}

export default Shop;