import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from "../../Loader/Loader";
import "./ProductPage.scss"


function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            return;
        }
        getProduct(id);
    }, [id]);

    async function getProduct(id) {
        const fetchedProduct = await (await fetch(`https://terminal-h.herokuapp.com/api/products/${id}?projection=detailedProduct`, {
            method: "GET",


        })).json();
        setProduct(fetchedProduct);
        setLoading(false);


    }
    return (
        <div id="productPage" className="shadow-lg p-3 mb-2 bg-white rounded">
            {isLoading ? (
                <Loading />
            ) : (

                <div className="productPage">
                    <div className="productName">
                        {product.name}
                    </div>
                    <div >
                        <img src={product.pictureUrl} className="pictureUrlProductPage" />
                    </div>
                    <div className="productBrandName">
                        {product.brand.name}
                    </div>
                    <div className="productPrice">
                        &#8362;{product.price}
                    </div>
                    <div className="productShop">
                        {product.shop.name}
                    </div>
                    <div className="productDesc">
                        <div> {product.description}</div>
                    </div>


                </div>

            )

            }
        </div>
    );
}


export default ProductPage;

