import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";



function GetId() {
    const history = useHistory()
    const [getId , setGetId] = useState([])
    function fuckThisId(id) {
         history.push(`/Reco/${id}`)
    }


    useEffect(()=>{
        async function getDate(id) {
            try{
                const res = await fetch(`http://terminal-h.herokuapp.com/api/brands`,{
                    method : "GET"
                });
                const fetchId = await res.json();
                setGetId(fetchId._embedded.brands);
            }catch(err){
                console.log(err);
            }
            
        }
        getDate()
    },[])
    return(
        <div>
            {getId.map(ids =>(
               <div>{ids.id}</div>
            ))}
        </div>
    )
    
}

export default GetId;