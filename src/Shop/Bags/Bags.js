import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Bags.scss";


function Bags() {

    const [bags, setBags] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
        async function getBags() {
            try{
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/3/products?projection=detailedProduct",{
                    method : "GET"
                })
                const fetchedBags = await res.json();
                setBags(fetchedBags._embedded.products);
                setLoading(false)
            }catch(err){
                console.log(bags);
            }
            
        }
        getBags();
    },[])

    return(
        <div>
            {isLoading ? (
                <Loading/>
            ) : (
                <div className="bags">
                    {bags.map(bag =>(
                        <div className="ajust">
                            <img src={bag.pictureUrl} className="pictureUrl"/>
                            <div>{bag.name}</div>
                            <div>{bag.price} &#8362;</div>
                            <div className="brand">{bag.brand.name}</div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
    
}

export default Bags;