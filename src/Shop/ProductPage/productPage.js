import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../../Loader/Loader";
import "./ProductPage.scss";
import { makeStyles } from '@material-ui/core/styles';
import RecommendedProducts from "../RecoProducts/Reco";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@material-ui/core';
import { createMuiTheme } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';





export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
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


    const arrayOfPics = product.extraPictureUrls




    useEffect(() => {
        if (!id) {
            return;
        }
        
        getProduct(id);

    }, [id]);

    async function getProduct(id) {
        const fetchedProduct = await (await fetch(`https://terminal-h.herokuapp.com/api/products/${id}?projection=detailedProduct`, {
            method: "GET",


        })).json();
        setProduct(fetchedProduct);
        setLoading(false);
    }

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>

                    <div className={classes.productPage}>
                    {arrayOfPics.length ?
                                    <Carousel
                                    className={classes.carousel}
                                    infiniteLoop={true}
                                    autoPlay={false}
                                    width={"300px"}
                                    showStatus={false}
                                    thumbWidth="100px"
                                   
                                    
                                >
                                    
                                        {arrayOfPics.map((pic, key) => (
                                            <img className={classes.pictureProduct} alt="" src={pic.split("?")[0]} key={key} />
                                        ))
                                        
                                        }
                                </Carousel>
                                :
                                <img alt="" src={product.pictureUrl} className="pictureUrlProductPage" />
                    }
                        <div>

                        </div>
                        
                        <div className={classes.ajustDetails}>
                            <div className={classes.productHeader}>
                                {product.name}
                            </div>
                           

                            <div className={classes.productName}>
                                {product.brand.name}
                            </div>
                            <div className={classes.margin}>
                                &#8362;{product.price}
                            </div>
                            <div className="productShop">
                                <Button target="_blank" rel="noopener noreferrer" className={classes.direction} href={product.url}>
                                    <p> ראה מוצר באתר <b> {product.shop.name}</b> </p></Button>

                            </div>
                            <div className="ajustSizes">
                                {product.sizes.map((size)=>(
                                    <div className="sizes">{size}</div>
                                ))}
                            </div>

                            <Accordion className={classes.accordion}>
                                <AccordionSummary
                                    className={classes.direction}
                                    expandIcon={<KeyboardArrowDownIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography >על המוצר</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={classes.accordionDetails}>
                                    <Typography >
                                        {product.description}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <div>

                            </div>


                        </div>

                    </div>
                    <div className={classes.recommendedProducts}>
                        <div >
                            <div className={classes.alsoLikeText}>More From The Same Brand</div>

                            <RecommendedProducts section={product.category.id} brand={product.brand.id} />

                        </div>
                    </div>


                </>
            )

            }

        </div>
    )
};




const useStyles = makeStyles((theme) => ({
    accordion: {
        top: "10%",
    },
    ajustDetails: {
        width: "40%"
    },
    productHeader: {
        paddingRight: "5%",
        fontSize: "30px",
        fontWeight: "bold"
    },
    direction: {
        direction: "rtl"
    },
    productPage: {
        justifyContent: "space-between",
        display: "flex",
        marginTop: "7%",
        [theme.breakpoints.down("sm")]: {
            display:"flex",
            flexDirection:"column",
            justifyContent: "center"
        }
    },
    accordionDetails: {
        width: "100%"
    },
    recommendedProducts: {
        display: "flex",
        marginTop: "15%",
        flexDirection: "column",
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        }

    },
    alsoLikeText: {
        marginBottom: "5%",
        fontSize: "25px",
        fontWeight: "bold"
    },
    productName: {
        fontWeight: "bold",
        marginTop: "5%",
        fontSize: "20px"
    },
    pictureProduct: {
        width: "50px",
        [theme.breakpoints.down("sm")]: {
            display: "none",


        }
    },

    carousel:{
        showThumbs:false
    },
    margin: {
        marginTop: "5%",
        fontWeight: "bold",
        fontSize: "16px"
    },

    // root: {
    //     ...theme.typography.display1,
    //     padding: theme.spacing.unit * 4,
    //     backgroundColor: theme.palette.secondary.main,
    //     color: theme.palette.getContrastText(theme.palette.secondary.main),
    //     // Display the name of the current breakpoint
    //     "&::before": {
    //       [theme.breakpoints.down("sm")]: {
    //         content: `'Screen size = xs'`
    //       },
    //       [theme.breakpoints.up("sm")]: {
    //         content: `'Screen size = sm'`
    //       },
    //       [theme.breakpoints.up("md")]: {
    //         content: `'Screen size = md'`
    //       },
    //       [theme.breakpoints.up("lg")]: {
    //         content: `'Screen size = lg'`
    //       },
    //       [theme.breakpoints.up("xl")]: {
    //         content: `'Screen size = xl'`
    //       }
    //     }
    //   }

}));
