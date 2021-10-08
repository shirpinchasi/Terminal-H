import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import "./Reco.scss";
import Loading from "../../Loader/Loader";
import config from "../../config/config";
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme} from "@material-ui/core/styles";
import { ClassNames } from "@emotion/react";

function RecommendedProducts(section , brand) {
    const [recoProducts, setRecoProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();
    const theme = createMuiTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 450,
            md: 600,
            lg: 900,
            xl: 1200
          }
        }
      });


    useEffect(() => {
        if (!brand && !section) {
            return;
        }
        getProducts(section.brand , section.section);
    }, [section.brand , section.section]);

    async function getProducts() {
        const fetchedBrandId = await (await fetch(config.apiShop + `&brand=${section.brand}&categorySectionId=${section.section}&sort=id,desc`, {
            method: "GET"
        })).json();
        setRecoProducts(fetchedBrandId._embedded.products);
        setLoading(false)
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

 

    return (
        <div >
            {isLoading ? (
                <Loading/>
            ) : (

                <div className={classes.flex}>
                    {recoProducts.sort(()=> 0.5 - Math.random()).slice(0, 4).map(recom => (
                        <div onClick={scrollToTop}>
                            
                            <Link to={`/ProductPage/${recom.id}`} id="Link">
                                <div className="ajustRecomm">
                                    <img src={recom.pictureUrl} className="pictureUrlRecomm" />
                                    <div className="brandRecomm">{recom.brand.name}</div>
                                    <div>{recom.name}</div>
                                    <div>&#8362;{recom.price}</div>
                                    
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>


            )}
        </div>
    );
};
export default RecommendedProducts;



const useStyles = makeStyles((theme) => ({
    flex : {
        
        display :"flex",
        justifyContent : "space-evenly",
            [theme.breakpoints.down("sm")]: {
                display : "flex",
                flexDirection : "column",
                width : "300px",
        }
        
    },
}))