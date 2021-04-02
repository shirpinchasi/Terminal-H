import React, { useEffect, useState,useCallback } from "react";
import { useParams } from "react-router";
import Loading from "../Loader/Loader";
import { Link } from "react-router-dom";
import "./Shop.scss";
import Menu from "../Menu/Menu";

function BrandPage() {
    const { id } = useParams();
    const [shops, setShops] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [, updateState] = useState([]);
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        if (!id) {
            return;
        }
        getShop(id);
    }, [id]);


    async function getShop(id) {
        const fetchShop = await (await fetch(`https://terminal-h.herokuapp.com/api/products/search/findByCategorySectionId?sectionId=${id}&projection=detailedProduct`, {
            method: "GET",
        })).json();
        setShops(fetchShop._embedded.products);
        setLoading(false)
        console.log(fetchShop);

    }


    return (
        <div>
            
            {isLoading ? (
                <Loading />
            ) : (
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
            )}

        </div>
    )
}

export default BrandPage;