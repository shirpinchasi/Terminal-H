import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Accessories.scss";

function Accessories() {

    const [accessories, setAccessories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    
    useEffect(()=>{
        async function getAccessories() {
            try{
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/2/products?projection=detailedProduct",{
                    method : "GET"
                });
               
                const fetchesAccessories = await res.json();
                setAccessories(fetchesAccessories._embedded.products);
                setLoading(false)
                
            }catch(err){
                console.log(accessories);
            }
        }
        getAccessories();
    },[])
    


    return(
        <div>
            {isLoading ? (
                <Loading/>
            ) : (
                <div className="accessories">
                  
                    {accessories.map(access =>(
                        <div className="ajust">
                            <div>{access.name}</div>
                            <img src={access.pictureUrl} className="pictureUrl"/>
                            <div>{access.price} &#8362;</div>
                            <div>{access.brand.name}</div>
                        </div>
                    ))}
           </div>
                    
            )}
            
        </div>
    )
    
}

export default Accessories;