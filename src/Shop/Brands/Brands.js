import React, { useState, useEffect } from 'react';
import "./Brands.scss";
import Loading from "../../Loader/Loader";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Scrollspy from 'react-scrollspy';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=> (({
    scrollspy : {
        width:48,
        transitionDelay : 1000,
        duration : 1000,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration,
        
    })},
})))


export default function Brands() {

    const [brands, setBrands] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();


    useEffect(() => {
        async function getBrands() {
            try {
                const res = await fetch("https://terminal-h.herokuapp.com/api/brands?projection=detailedBrand&sort=name,asc", {
                    method: "GET",
                })
                const fetchedBrands = await res.json();
                setBrands(fetchedBrands._embedded.brands);
                setLoading(false)
            } catch (err) {
                console.log(brands);
            }

        }
        getBrands();

    }, [])

    const groups = brands.reduce((groups, brand) => {
        const letterKey = brand.name.charAt(0).toUpperCase();
        (groups[letterKey] || (groups[letterKey] = [])).push(brand);
        return groups;
    }, {});


    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                < div className="Brands">
                    <h2 className="head">מותגים</h2>
                    <div className="scrollspy" id="abc">
                        {Object.entries(groups).map(([letterKey], index) =>
                        <Scrollspy className={classes.scrollspy}>
                            <a href={`#${letterKey}`} className="abc" key={index}>{letterKey}</a>
                            </Scrollspy>
                        )}
                    </div>
                    {Object.entries(groups).sort().map(([letterKey, brands]) => (
                        <div key={brands}>
                            <ul id="ul">
                                <h2 id={letterKey} className="letter" key={letterKey}>{letterKey}</h2>
                                {brands.map(brand => <Link to={`/BrandPage/${brand.id}`} key={brand.id} className="href">
                                    <div id="li">{brand.name}</div>

                                </Link>
                                )}
                            </ul>
                        </div>
                    ))}
                    {/* {brands.map(brand => (
                        <div>
                            <Link to={`/BrandPage/${brand.id}`} className="href">
                                
                                <ul>
                                    <div id="li">{brand.name}</div>
                                </ul>
                            </Link>
                        </div>
                    ))} */}

                </div>
            )
            }
        </div >
    );
};