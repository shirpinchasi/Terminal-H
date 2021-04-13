import React, { useState, useEffect } from 'react';
import "./Brands.scss";
import Loading from "../../Loader/Loader";
import { Link } from "react-router-dom";


function Brands() {

    const [brands, setBrands] = useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        async function getBrands() {
            try {
                const res = await fetch("https://terminal-h.herokuapp.com/api/brands?projection=detailedBrand&sort=name,asc", {
                    method: "GET",
                })
                const fetchedBrands = await res.json();
                setBrands(fetchedBrands._embedded.brands);
                setLoading(false)
            } catch (err) {
                console.log(brands);
            }

        }
        getBrands();

    }, [])
    console.log(brands);


    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="Brands">
                    {brands.map(brand => (
                        <div>
                            <Link to={`/BrandPage/${brand.id}`} className="href">
                                {console.log(brand.id)}
                                <ul>
                                    <li className="brandName">{brand.name}</li>
                                </ul>
                            </Link>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};
export default Brands;