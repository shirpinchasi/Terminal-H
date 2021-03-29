import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Games.scss";

function Games() {

    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // useEffect(()=>{
    //     async function getGames() {
    //         try{
    //             const res = await fetch("")
    //         }
            
    //     }
    // })
    return(
        <div>
            Games
        </div>
    )
    
}

export default Games;