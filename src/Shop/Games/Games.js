import React, { useEffect, useState } from "react";
import Loading from "../../Loader/Loader";
import "./Games.scss";
import { Link } from "react-router-dom";

function Games() {

    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        async function getGames() {
            try {
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories/10/products?projection=detailedProduct", {
                    method: "GET"
                })
                const fetchedGames = await res.json();
                setGames(fetchedGames._embedded.products);
                setLoading(false)
            } catch (err) {
                console.log(games);
            }

        }
        getGames();
    }, [])
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="games">
                    {games.map(game => (
                        <div>
                            <Link to={`/ProductPage/${game.id}`} id="Link">
                                <div className="ajustGames">
                                    <img src={game.pictureUrl} className="pictureUrlGames" />
                                    <div>{game.name}</div>
                                    <div>{game.price} &#8362;</div>
                                    <div className="brandGames">{game.brand.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default Games;