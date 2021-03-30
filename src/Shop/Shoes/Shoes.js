import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Shoes.scss";
import { Link } from "react-router-dom";




function Shoes() {

    const [shoes, setShoes] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const apiShoes = "https://terminal-h.herokuapp.com/api/categories/4/products?projection=detailedProduct";




    useEffect(() => {
        async function getShoes() {
            try {
                const res = await fetch(apiShoes, {
                    method: "GET"
                });
                const fetchedShoes = await res.json();
                setShoes(fetchedShoes._embedded.products);
                setLoading(false)
            } catch (err) {
                console.log(shoes);
            }

        }
        getShoes();
    }, [])

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="shoes">
                    {shoes.map((product) => (
                        <div>

                            <Link to={`/ProductPage/${product.id}`} id="Link">
                                <div className="ajustShoes">
                                    <img src={product.pictureUrl} className="pictureUrlShoes" />
                                    <div className="brandShoes">{product.brand.name}</div>
                                    <div className="shoeName">{product.name}</div>
                                    <div>&#8362; {product.price}</div>
                                    {/* <div src={`https://terminal-h.herokuapp.com/api/products/${product.id}/brand/name`}> </div> */}


                                    <div>

                                    </div>
                                </div>
                            </Link>
                        </div>




                    ))}

                </div>

            )}

        </div>
    )

}

export default Shoes;


