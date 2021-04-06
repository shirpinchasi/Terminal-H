import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./Reco.scss"

function RecommendedProducts() {
    const { id } = useParams();
    const [recoProducts, setRecoProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(!id) {
            return;
        }
        getProducts(id);
    }, [id])


        async function getRecommProducts() {
            
                const fetchedData = await (await fetch(`http://terminal-h.herokuapp.com/api/brands`, {
                    method: "GET"
                })).json();
                setRecoProducts(fetchedData._embedded.brands)
                console.log(fetchedData._embedded.brands);
                recoProducts.map(reco=>(
                    <div>{reco.id}</div>
                ))
        }
        async function getProducts(id) {
            const fetchedBrandId = await (await fetch(`http://terminal-h.herokuapp.com/api/brands/${id}/products?projection=detailedProduct`, {
                    method: "GET"
                })).json();
                setRecoProducts(fetchedBrandId._embedded.brands);
                setLoading(false)
        }
     


    return (
        <div >
            {isLoading ? (
                <div className="flex"></div>
            ) : (
                <div className="flex">
                  {/* .slice(0,4)   */}
                    {recoProducts.map(recom => (
                        <div >
                            {console.log(recom.id)}
                            <Link to={`/ProductPage/${recom.id}`} id="Link">
                                <div className="ajustRecomm">

                                    {/* <img src={recom.pictureUrl} className="pictureUrlRecomm" />
                                    <div className="brandRecomm">{recom.brand.name}</div>
                                    <div>{recom.name}</div>
                                    <div>&#8362;{recom.price}</div> */}
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



