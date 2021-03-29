import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./SportBrands.scss";


function SportBrands() {

    const [sportBrands, setSportBrands] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        async function getSportBrands() {
            try{
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/9/products?projection=detailedProduct",{
                    method:"GET"
                })
                const fetchedSportBrands = await res.json();
                setSportBrands(fetchedSportBrands._embedded.products)
                setLoading(false)
            }catch(err){
                console.log(sportBrands);
            }
            
        }
        getSportBrands();
    },[])

    return(
        <div>
            {isLoading ? (
                <Loading/>
            ) : (
                <div className="sportBrands">
                    {sportBrands.map(sportbrand=>(
                        <div className="ajust">
                            <img src={sportbrand.pictureUrl} className="pictureUrl"/>
                            <div>{sportbrand.name}</div>
                            <div>{sportbrand.price} &#8362;</div>
                            <div className="brand">{sportbrand.brand.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
    
}

export default SportBrands;