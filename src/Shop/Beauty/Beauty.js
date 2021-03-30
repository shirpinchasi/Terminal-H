import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Beauty.scss";
import { Link } from "react-router-dom";


function Beauty() {

    const [beauty, setBeauty] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getBeauty() {
            try {
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/1/products?projection=detailedProduct", {
                    method: "GET"
                })
                const fetchedBeauty = await res.json();
                setBeauty(fetchedBeauty._embedded.products);
                setLoading(false)
            } catch (err) {
                console.log(beauty);
            }

        }
        getBeauty();
    }, [])
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="beauty">
                    {beauty.map(be => (
                        <div>
                            <Link to={`/ProductPage/${be.id}`} id="Link">
                                <div className="ajustBeauty">
                                    <img src={be.pictureUrl} className="pictureUrlBeauty" />
                                    <div>{be.name}</div>
                                    <div>{be.price} &#8362;</div>
                                    <div className="brandBeauty">{be.brand.name}</div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default Beauty;