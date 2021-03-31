import React, { useEffect, useState,useMemo } from "react";
import Loading from "../../Loader/Loader";
import "./Shoes.scss";
import { Link } from "react-router-dom";
import Select from 'react-select'
import RecommendedProducts from "../RecoProducts/Reco"




function Shoes() {

    const [shoes, setShoes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const apiShoes = "https://terminal-h.herokuapp.com/api/categories/4/products?projection=detailedProduct";


  
       

// console.log(shoes);



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
                <div>
                    {/* <Select options={options}/> */}
                <div className="shoes">
                    
                     {/* <button className="button" onClick={sortByRich}>מחיר גבוה</button>
                     <button className="button" onClick={sortByPoor}>מחיר נמוך</button> */}
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
                
                        </div>
            )}

        </div>
    )

}

export default Shoes;


