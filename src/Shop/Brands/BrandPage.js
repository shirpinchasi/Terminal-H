import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Loader/Loader";
import { Link } from "react-router-dom";
import "./BrandPage.scss";

function BrandPage() {
    const { id } = useParams();
    const [brandProduct, setBrandProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            return;
        }
        getBrandProduct(id);
    }, [id]);


    async function getBrandProduct(id) {
        const fetchBrandProduct = await (await fetch(`https://terminal-h.herokuapp.com/api/brands/${id}/products?projection=detailedProduct`, {
            method: "GET",
        })).json();
        setBrandProduct(fetchBrandProduct._embedded.products);
        setLoading(false);
        console.log(fetchBrandProduct);

    }


    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="brandProduct">
                    {brandProduct.map(brandPro => (
                        <div >
                            <Link to={`/ProductPage/${brandPro.id}`} id="Link">
                                <div className="ajustProductBrands">
                                    <img src={brandPro.pictureUrl} className="pictureUrlProBrands" />
                                    <div className="brandProBrands">{brandPro.brand.name}</div>
                                    <div>{brandPro.name}</div>
                                    <div>&#8362;{brandPro.price}</div>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            )}

        </div>
    )
}

export default BrandPage;