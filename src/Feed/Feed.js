import React, { useEffect, useState } from "react";
import config from "../config/config"
import Loading from "../Loader/Loader";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Pagination from "../Shop/Pagination/Pagination";
import "./Feed.scss";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useCart } from "react-use-cart";
import LaunchIcon from '@mui/icons-material/Launch';


export default function Feed() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [itemsPerPage] = useState(30);
    const [totalPages, setPages] = useState([]); 
    const { addItem, inCart, removeItem } = useCart();

    useEffect(() => {

        getData();

    }, [page]);

    async function getData() {

        const res = await (await fetch(config.apiShop + `&sort=discount,desc&size=${itemsPerPage}&page=${page}`, {
            method: "GET"
        })).json();
        setCategories(res._embedded.products);
        setPages(res.page);
        setLoading(false)
        
    }


    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
        scrollToTop();
    };
    const handlePageChange = (e) => {
        setPage(e.target.value)
        scrollToTop();
      

    };
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const pageOptions = []
    for(let i =0; i <totalPages.totalPages; i++){
        pageOptions.push({
            value: i+1,
            label : `page ${i+1}`
        })
    }
    console.log(pageOptions.value);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
        <>
                <div className="feed">
                    {categories.map(category => (
                        <div>
                            <Link to={`/ProductPage/${category.id}`} id="Link">
                                <div className="ajustShop">
                                <div id="image">
                                            <img src={category.pictureUrl} key={category.pictureUrl} className="pictureUrlShop" />
                                            <div className="hoverItems">
                                                {inCart(category.id) ?
                                                    <Button id="favorite" onClickCapture={(e)=> e.preventDefault()} onClick={() => inCart(category.id) ? removeItem(category.id) : addItem({ id: category.id, name: category.name, price: category.price, img: category.pictureUrl, brand: category.brand.name })} value={category.id}>
                                                        <FavoriteBorder  className="favoriteBorderIcon" />
                                                    </Button>
                                                    :
                                                    <Button id="favorite" onClickCapture={(e)=> e.preventDefault()} onClick={() =>   addItem({ id: category.id, name: category.name, price: category.price, img: category.pictureUrl, brand: category.brand.name })} value={category.id}>
                                                        <FavoriteBorder  />
                                                    </Button>
                                                }

                                                <Button href={category.url} target="_blank" rel="noopener noreferrer" id="buttonToSite">
                                                    <p className="linkToSite"> ראה מוצר באתר <b>{category.shop.name}</b></p>
                                                    <LaunchIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    
                                    <div className="descPrice">
                                            <div>
                                                {!category.discount ? 
                                                        <div className="originalPriceWithNoDiscount" >&#8362;{category.originalPrice}</div>
                                                        :
                                                    <div> 
                                                        <div className="originalPriceWithDiscount" >&#8362;{category.originalPrice}</div>
                                                        <div className="price" key={category.price}>&#8362;{category.price}</div>
                                                        <div className="discount">{Number(category.discount.toFixed(1))}%</div>
                                                </div>

                                                }
                                                
                                                
                                            </div>
                                            <div className="ajustNames">
                                            <div className="brandShop" key={category.brand.name}>{category.brand.name}</div>
                                            <div className="shopName" key={category.name}>{category.name}</div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            
                                            
                                        </div>
                                    

                                </div>
                               
                            </Link>

                        </div>
                    ))}
                    
        
                </div>
                
                    <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange}  />

            </>

            )}
           
        </div>
    )
}