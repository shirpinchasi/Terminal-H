import { Button } from "@material-ui/core";
import { get, list, quantity, remove, total } from "cart-localstorage";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { withRouter, Link } from "react-router-dom";
import "./Favorites.scss";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart, onItemRemove } from "react-use-cart";


const Favorites = ({ group }) => {

    const [getLocal, setLocal] = useState([])
    const { items, isEmpty, removeItem } = useCart();
    const totalItems = useCart().totalItems
    const totalPrice = useCart().cartTotal




    useEffect(() => {

        getFavorites()
    }, [removeItem]);

    async function getFavorites() {
        try {
            setLocal(items)
        } catch (err) {
            console.log(err);
        }
    }

    const result = [...items.reduce((r, { shopName, id, img, name, price, brand }) => {
        r.has(shopName) || r.set(shopName, {
            shopName,
            newArr: []
        });

        r.get(shopName).newArr.push({ id, img, name, price, brand, shopName });

        return r;
    }, new Map).values()];
    // const some = {(30 / 100) * 117.9}
    // console.log(some);

    return (
        <div>

            {isEmpty ?
                <h1 className="h1">הרשימה ריקה :(</h1>
                :
                <div>
                    <p className="h1">הרשימה שלי</p>
                    <div id="prices">
                        <p className="totalItems">כמות הפריטים בעגלה : {totalItems} פריטים</p>
                        <p className="priecBefore"> &#8362;מחיר לפני הנחה :  {totalPrice} </p>
                        <p className="priecAfter"> &#8362;מחיר אחרי הנחת חבר : {(totalPrice - ((30 / 100) *totalPrice)).toFixed(1)}  </p>
                    </div>
                    
                
                    <div className="favorites">
                        {result.map((shop) => (
                            <div className="ajustByShop">
                                <div className="shopNameFavorite">{shop.shopName}</div>
                                <div className="ajustItems">
                                    {shop.newArr.map((item) => (
                                        <div key={item.id} className="item">
                                            <a href={`/ProductPage/${item.id}`} id="Link">
                                                <div className="ajustProducts">
                                                    <div>{item.shopName}</div>
                                                    <div id="IMAGE">
                                                        <img src={item.img} className="pictureUrlProducts" />
                                                    </div>
                                                    <div className="brandProducts">{item.brand}</div>
                                                    <div>{item.name}</div>
                                                    <div>&#8362; {item.price}</div>


                                                </div>
                                            </a>
                                            <Button onClick={() => removeItem(item.id)} value={item.id}>
                                                <DeleteOutlineIcon />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Favorites;