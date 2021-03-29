import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Shoes.scss";

function Shoes() {

    const [shoes, setShoes] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const apiShoes = "https://terminal-h.herokuapp.com/api/categories/4/products?projection=detailedProduct";

    useEffect(()=>{
        async function getShoes() {
            try{
                const res = await fetch(apiShoes,{
                    method : "GET"
                });
                const fetchedShoes = await res.json();
                setShoes(fetchedShoes._embedded.products);
                setLoading(false)
            }catch(err){
                console.log(shoes);
            }
            
        }
        getShoes();
    },[])
console.log(shoes);
    return(
        <div>
               {isLoading ? (
                   <Loading/>
               ) : (
                   <div className="shoes">
                       {shoes.map((product) =>(
                            <div className="ajust1" >
                                <div>{product.name}</div>
                                <img src={product.pictureUrl} className="pictureUrl"/>
                                <div>{product.price} &#8362;</div>
                                <div src={`https://terminal-h.herokuapp.com/api/products/${product.id}/brand/name`}> </div>
                                {/* <div>{shoe.description}</div> */}
                                 <div>{product.brand.name}</div>
                                <div>
                                    {product.shop.name}
                                </div>
                            </div>
                            
                            
))}

                   </div>
                   
               )}
               
        </div>
    )
    
}

export default Shoes;


