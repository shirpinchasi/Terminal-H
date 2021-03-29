import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Games.scss";

function Games() {

    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(()=>{
        async function getGames() {
            try{
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/10/products?projection=detailedProduct",{
                    method : "GET"
                })
                const fetchedGames = await res.json();
                setGames(fetchedGames._embedded.products);
                setLoading(false)
            }catch(err){
                console.log(games);
            }
            
        }
        getGames();
    },[])
    return(
        <div>
            {isLoading ? (
                <Loading/>
            ) : (
                <div className="games">
                    {games.map(game =>(
                        <div className="ajust">
                            <img src={game.pictureUrl} className="pictureUrl"/>
                            <div>{game.name}</div>
                            <div>{game.price} &#8362;</div>
                            <div className="brand">{game.brand.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
    
}

export default Games;