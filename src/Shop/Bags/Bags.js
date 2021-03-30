import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Bags.scss";
import { Link } from "react-router-dom";


function Bags() {

    const [bags, setBags] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function getBags() {
            try {
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/3/products?projection=detailedProduct", {
                    method: "GET"
                })
                const fetchedBags = await res.json();
                setBags(fetchedBags._embedded.products);
                setLoading(false)
            } catch (err) {
                console.log(bags);
            }

        }
        getBags();
    }, [])

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="bags">
                    {bags.map(bag => (
                        <div>
                            <Link to={`/ProductPage/${bag.id}`} id="Link">
                                <div className="ajustBags">
                                    <img src={bag.pictureUrl} className="pictureUrlBags" />
                                    <div className="brandBags">{bag.brand.name}</div>
                                    <div>{bag.name}</div>
                                    <div>{bag.price} &#8362;</div>


                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            )}
        </div>

    )
    
}

export default Bags;