import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Reco.scss"

function RecommendedProducts() {

    const [recoProducts, setRecoProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getRecommProducts() {
            try {
                const res = await fetch("http://terminal-h.herokuapp.com/api/brands/24/products?projection=detailedProduct", {
                    method: "GET"
                });
                const fetchedData = await res.json();
                setRecoProducts(fetchedData._embedded.products);
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
            console.log(recoProducts);
        }
        getRecommProducts();
    }, [])


    return (
        <div >
            {isLoading ? (
                <div className="flex"></div>
            ) : (
                <div className="flex">
                    
                    {recoProducts.slice(0,4).map(recom => (
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



