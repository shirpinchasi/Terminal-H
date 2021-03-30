import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader";
import "./Search.scss";
import { Link } from "react-router-dom";

function Search() {
    
    const [query, setQuery] = useState("");
    const [product, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue]= useState("");
    
    const handleChangeInput = (e) =>{
        setSearchValue(e.target.value);
    }
   const reset = ()=>{
       setProducts([])
   }

    const CallSearchFunction = (e)=>{
        e.preventDefault();
        reset();
        setQuery(searchValue);
        
    }
    

    useEffect(()=>{
        
        if(!query){
            return;
        }
        
        getProducts();
    }, [query]);

    async function getProducts() {
        try{
            const res = await fetch(`https://terminal-h.herokuapp.com/api/products/search/findByNameContainingIgnoreCase?name=${query}&projection=detailedProduct`);
            const product = await res.json();
            setProducts(product._embedded.products)
            setLoading(false)
        }catch(err){
            console.log(err);
        }
        console.log(product);
    }
    function hasNoResults() {
        return query && product.length === 0;
    }
   
    return(
        <div id="Search">
            <div>
            <input
                placeholder="search Product Here.."
                value={searchValue}
                onChange={handleChangeInput} 
                type="text"
                // onKeyUp={dodelaySearch(this.val)}
            />
            <input onClick={CallSearchFunction}  type="submit" value="SEARCH"/>
            
            </div>
            <div>
                {isLoading ? (
                    <Loading/>
                ) : (

                
                    <div>
                    <div className="products">
                    {product.map(prod=>(
                        <div>
                        <Link to={`/ProductPage/${prod.id}`} id="Link">
                        <div className="ajustProducts">
                            <img src ={prod.pictureUrl} className="pictureUrlProducts"/>
                          <div>{prod.name}</div>
                          <div>{prod.price}</div>
                          <div className="brandProducts">{prod.brand.name}</div>
                        </div>
                        </Link>
                        </div>
                    ))}
                    </div>
                    
                
                
                  </div>  
            
            )}
            </div>
        </div>
    )
}
export default Search;