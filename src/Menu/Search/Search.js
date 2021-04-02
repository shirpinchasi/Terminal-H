import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Search.scss";
import Select from 'react-select'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function Search() {

    const [query, setQuery] = useState("");
    const [product, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const apiSearch = `https://terminal-h.herokuapp.com/api/products/search/findByNameContainingIgnoreCase?name=${query}&projection=detailedProduct&sort`
    const icon = <i class="fas fa-user"></i> 

    
       const sortHigh= product.sort((a,b) => parseInt(a.price) - parseInt(b.price))
    
    
        const sortLow= product.sort((a, b) => parseInt(b.price) - parseInt(a.price))
    

    // const sortAscending = () => {
    //     let sortedData = product.sort((a, b) => a - b)
    //     setProducts(sortedData)
    // }
    // const sortDescending = () => {
    //     let sortedData = product.sort((a, b) => b - a)
    //     setProducts(sortedData)
    // }


    const handleChangeInput = (e) => {
        setSearchValue(e.target.value);
    }
    const reset = () => {
        setProducts([])
    }
    const resetLoading = () =>{
        setLoading(true)
    }

    const CallSearchFunction = (e) => {
        e.preventDefault();
        reset();
        resetLoading();
        
        setQuery(searchValue);

    }
    function onLoadProducts() {
        setLoading(true);
        <Loading/>
    }


    useEffect(() => {

        if (!query) {
            return;
        }

        getProducts();
    }, [query]);

    async function getProducts() {
        try {
            const res = await fetch(apiSearch);
            const product = await res.json();
            setProducts(product._embedded.products)
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }
    // function hasNoResults() {
    //     return query && product.length === 0;
    // }
    function LoadingData() {
        return CallSearchFunction && product.length === 0;
    };
    const options =[
        {value : "main", label : "מיין לפי"},
        {value : `${apiSearch}&sort=${sortHigh}`, label : "מחיר: מהגבוה לנמוך"},
        {value : `${apiSearch}&sort=${sortLow}`, label : "מחיר: מהנמוך לגבוה"}
    
    ]

    return (
        <div id="Search">
            <div>
                <form className="form" onSubmit={CallSearchFunction}>
                <input
                    placeholder="search Product Here.."
                    value={searchValue}
                    onChange={handleChangeInput}
                    type="text"
                    className="searchInput"
                // onKeyUp={dodelaySearch(this.val)}
                />
                <FontAwesomeIcon icon={faSearch} className="far fa-search fa-sm" onClick={CallSearchFunction} onLoad={onLoadProducts}/>
                {/* <input onClick={CallSearchFunction} onLoad={onLoadProducts} type="submit" className="submit" value="SEARCH" /> */}
                </form>
            </div>
            <div>
                {/* {isLoading ? (
                    <Loading />
                ) : ( */}
                {LoadingData()
                
                 ?<div></div>
                 

                        : 
                        <div>
                            <Select options={options}/>
                        <div className="products">
                            {product.map(prod => (
                                <div>
                                    <a href={`/ProductPage/${prod.id}`} id="Link">
                                        <div className="ajustProducts">
                                            <img src={prod.pictureUrl} className="pictureUrlProducts" />
                                            <div className="brandProducts">{prod.brand.name}</div>
                                            <div>{prod.name}</div>
                                            <div>&#8362; {prod.price}</div>
                                            
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>



                    
                        </div>
                        
                        }
                {/* )} */}
            </div>
        </div>
    )
}
export default Search;