import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useParams } from "react-router";
import "./Reco.scss"
import GetId from "./getId";

function RecommendedProducts() {
    const {id} = useParams()
    const [recoProducts, setRecoProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [brandId, setBrandId] = useState([]);


    useEffect(() => {
        if (!id) {
            return;
        }
        getProducts(id);
    }, [id])

    // async function getRecommProducts() {

    //     const fetchedData = await (await fetch(`http://terminal-h.herokuapp.com/api/brands`, {
    //         method: "GET"
    //     })).json();
    //     setBrandId(fetchedData._embedded.brands) 
    // }
    async function getProducts(id) {
        const fetchedBrandId = await (await fetch(`http://terminal-h.herokuapp.com/api/brands/2/products?projection=detailedProduct`, {
            method: "GET"
        })).json();
        setRecoProducts(fetchedBrandId._embedded.products);
        setLoading(false)
    }



    return (
        <div >
            {isLoading ? (
                <div className="flex"></div>
            ) : (

                <div className="flex">
                    
                    {recoProducts.slice(0, 4).map(recom => (
                        <div >
                            <Link to={`/ProductPage/${recom.id}`} id="Link">
                                <div className="ajustRecomm">

                                    <img src={recom.pictureUrl} className="pictureUrlRecomm" />
                                    <div className="brandRecomm">{recom.brand.name}</div>
                                    <div>{recom.name}</div>
                                    <div>&#8362;{recom.price}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>


            )}
        </div>
    )
}
export default RecommendedProducts;



