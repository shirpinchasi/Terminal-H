import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Accessories.scss";
import { Link } from "react-router-dom";

function Accessories() {

    const [accessories, setAccessories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState("");


    useEffect(() => {
        async function getAccessories() {
            try {
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/2/products?projection=detailedProduct", {
                    method: "GET"
                });

                const fetchesAccessories = await res.json();
                setAccessories(fetchesAccessories._embedded.products);
                setLoading(false)

            } catch (err) {
                console.log(accessories);
            }
        }
        getAccessories();
    }, [])



    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (

                <div className="accessories">
                    {accessories.map(access => (
                        <div>
                            <Link to={`/ProductPage/${access.id}`} id="Link">
                                <div className="ajustAccessory">
                                    <div className="brandAccessory">{access.brand.name}</div>
                                    <div>{access.name}</div>
                                    <img src={access.pictureUrl} className="pictureUrlAccessory" />
                                    <div>{access.price} &#8362;</div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>


            )}

        </div>
    )

}

export default Accessories;