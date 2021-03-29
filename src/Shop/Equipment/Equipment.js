import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Equipment.scss"
// https://terminal-h.herokuapp.com/api/categories/8/products{?projection}
function Equipment() {

    const [equipment , setEquipment] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        async function getEquipment() {
            try{
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/8/products?projection=detailedProduct", {
                    method:"GET"
                });
                const fetchedEquipment = await res.json();
                setEquipment(fetchedEquipment._embedded.products);
                setLoading(false)
            }catch(err){
                console.log(equipment);
            }
            
        }
        getEquipment();
    },[])

    return(
        <div>
            {isLoading ? (
                <Loading/>
            ) : (
                <div className="equipment">
                    {equipment.map(equip =>(
                        <div className="ajust">
                            <img src={equip.pictureUrl} className="pictureUrl"/>
                            <div>{equip.name}</div>
                            
                            <div>{equip.price} &#8362;</div>
                            <div className="brand">{equip.brand.name}</div>

                        </div>
                    ))}

                </div>
            )}
            
        </div>
    )
    
}

export default Equipment;