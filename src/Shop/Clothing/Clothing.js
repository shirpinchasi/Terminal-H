import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Clothing.scss";
import { Link } from "react-router-dom";


function Clothing() {

    const [clothing, setClothing] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getClothing() {
            try {
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/5/products?projection=detailedProduct", {
                    method: "GET"
                });
                const fetchedClothing = await res.json();
                setClothing(fetchedClothing._embedded.products);
                setLoading(false)
            } catch (err) {
                console.log(clothing);
            }
        }
        getClothing();
    }, [])

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="clothing">
                    {clothing.map(clothes => (
                        <div>
                            <Link to={`/ProductPage/${clothes.id}`} id="Link">
                                <div className="ajustClothing">

                                    <img src={clothes.pictureUrl} className="pictureUrlClothing" />
                                    <div>{clothes.name}</div>
                                    <div>&#8362; {clothes.price}  </div>
                                    <div className="brandClothing">{clothes.brand.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default Clothing;