import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Clothing.scss"

function Clothing() {

    const [clothing , setClothing] = useState([]);
    const [isLoading , setLoading] = useState(true);

    useEffect(()=>{
        async function getClothing() {
            try{
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/5/products?projection=detailedProduct",{
                    method : "GET"
                });
                const fetchedClothing = await res.json();
                setClothing(fetchedClothing._embedded.products);
                setLoading(false)
            }catch(err){
                console.log(clothing);
            }
        }
        getClothing();
    },[])

    return(
        <div>
            {isLoading?(
                <Loading/>
            ) : (
                <div className="clothing">
                    {clothing.map(clothes =>(
                        <div className="ajust">
                            <img src={clothes.pictureUrl} className="pictureUrl"/>
                            <div>{clothes.name}</div>
                            <div>{clothes.price} &#8362; </div>
                            <div className="brand">{clothes.brand.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
    
}

export default Clothing;