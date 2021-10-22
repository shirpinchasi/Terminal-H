import { Button } from "@material-ui/core";
import { get, list, quantity, remove } from "cart-localstorage";
import React, { useEffect, useState } from "react";
import { useLocation,useParams } from "react-router-dom";
import { withRouter,Link } from "react-router-dom";
import "./Favorites.scss";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart,onItemRemove } from "react-use-cart";


const Favorites = ({group}) => {

    const [getLocal, setLocal] = useState([])
    const { items, isEmpty,removeItem } = useCart();



    useEffect(() => {
       
        getFavorites()
    }, [removeItem]);


    async function getFavorites(){
        try {
        setLocal(items)
    }catch(err){
        console.log(err);
    }
}

const some = getLocal

    return (
        <div>
            
            {isEmpty?
                <h1 className="h1">הרשימה ריקה :(</h1>
                :
    <div>
        <p className="h1">הרשימה שלי</p>
        <div className="favorites">
        
        
            {getLocal.map(prod => (
                <div  key={prod.id}>
                     
                    
                
                            <div >
                                <a href={`/ProductPage/${prod.id}`} id="Link">
                                    <div className="ajustProducts">
                                        <div id="IMAGE">
                                            <img src={prod.img} className="pictureUrlProducts" />
                                        </div>
                                        <div className="brandProducts">{prod.brand}</div>
                                        <div>{prod.name}</div>
                                        <div>&#8362; {prod.price}</div>
                                       

                                    </div>
                                </a>
                                <Button onClick={()=> removeItem(prod.id)}  value={prod.id}>
                                <DeleteOutlineIcon />
                                </Button>
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