import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Loader/Loader";
import "./BrandPage.scss";
import Pagination from "../Pagination/Pagination";
import config from "../../config/config";
import Main from "../../Main/Main";
import Footer from "../../Footer/Footer";


export default function BrandPage() {
    const { id } = useParams();
    const [brandProduct, setBrandProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [sort, setSort] = useState("");
    const [gender, setGender] = useState('');
    const [page, setPage] = useState(0);
    const [brandid,setBrandId] = useState('')
    const [brands, setBrands] = useState([]);
    const [sortCount, setSortCount] = useState(30)
    const [catNames, setCatNames] = useState([])
    const [totalPages, setPages] = useState([]);
    const [totalElem, setTotalElem] = useState([]);


    useEffect(() => {
        if (!id) {
            return;
        }
        if(page){
            setLoading(true)
        }
        getBrandProduct(id);
    }, [id, page, sort, sortCount, gender]);


    async function getBrandProduct(id) {
        const fetchBrandProduct = await (await fetch(config.apiShop + `&brand=${id}&page=${page}&size=${sortCount}&sort=${sort}&sort=id,desc&gender=${gender}`, {
            method: "GET",
        })).json();
        setPages(fetchBrandProduct.page);
        setBrandProduct(fetchBrandProduct._embedded.products);
        setLoading(false);
        setTotalElem(fetchBrandProduct.page.totalElements)

    }
    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
    };
    const handleChangeGender = (event) => {
        setGender(event.target.value);
        setLoading(true)
    };
    const handleSortChange = (e) => {
        setSortCount(e.target.value)
        setLoading(true)
    };
    const handleChange = (e) => {
        setSort(e.target.value)
        setLoading(true)
    };

    const pageOptions = []
    for (let i = 0; i < totalPages.totalPages; i++) {
        pageOptions.push({
            value: i + 1,
            label: `page ${i + 1}`
        })
    };
    const handlePageChange = (e) => {
        setPage(e.target.value)
    };
    const handleChangeMultiple = (event) => {
        const {
            target: {value },
        } = event;
        setBrandId(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(value);
    };
    const handleSetGender = (e) => {
        setGender(e.target.value)
    };
    const handleSetCount = (e) => {
        setSortCount(e.target.value)
    };
    const handleChangeCategory = (e) => {
        setCatNames(e.target.value)
    };




    return (
        <>
        {isLoading ? (
            <Loading/>
        ):(
            <>
            <Main brandid={brandid} brands={brands} gender={gender} setGender={setGender} handleChangeMultiple={handleChangeMultiple} handleSetGender={handleSetGender} handleSetCount={handleSetCount} sortCount={sortCount} isLoading={isLoading} categoryName={""} totalElem={totalElem} sort={sort} setSort={setSort} shops={brandProduct} />
            <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange} />
            <Footer />
        </>
        )}
            {/* {isLoading ? (
                <Loading />
            ) : (
                <>
                <Main brandid={brandid} brands={brands} gender={gender} setGender={setGender} handleChangeMultiple={handleChangeMultiple} handleSetGender={handleSetGender} handleSetCount={handleSetCount} sortCount={sortCount} isLoading={isLoading} categoryName={""} totalElem={totalElem} sort={sort} setSort={setSort} shops={categories} />
                    <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange} />
                    <Footer />
                <div className="ShopFilters">
                
                        
                <FilterMenu brands={brandProduct} brandid={id} handleChangeMultiple={handleChangeMultiple} gender={gender} setGender={setGender}  handleSetGender={handleChangeGender}  handleSetCount={handleSortChange} sortCount={sortCount}/>
                
                
                
                
                <div className="totalElements">
                    {totalElem} תוצאות
                </div>
                <div>

                    <FormControl id="category">
                        <InputLabel id="select">מיין לפי : </InputLabel>
                        <Select

                            labelId="select"
                            id="selectOption1"
                            value={sortCount}
                            onChange={(e) => setSort(e.target.value)}

                        >
                            <MenuItem key={sortCount} value="" className="all" >מיין לפי</MenuItem>
                            <MenuItem key={sortCount} value="discount,desc" className="desc">הנחות : גבוה לנמוך</MenuItem>
                            <MenuItem key={sortCount} value="price,asc" className="asc" >מחיר: נמוך לגבוה</MenuItem>
                            <MenuItem key={sortCount} value="price,desc" className="desc" >מחיר: גבוה לנמוך</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
                <div className="brandProduct">
                    
                {brandProduct.map((brand) => (
                                <div key={brand.id}>
                                    <a href={`/ProductPage/${brand.id}`} key={brand.id} id="Link">
                                        <div className="ajustShop">
                                            <div id="image">
                                                <img src={brand.pictureUrl} key={brand.pictureUrl} className="pictureUrlShop" />
                                                <div className="showLike">
                                                    {inCart(brand.id) ?
                                                        <Button id="favorite" onClickCapture={(e) => e.preventDefault()} onClick={() => inCart(brand.id) ? removeItem(brand.id) : addItem({ id: brand.id, name: brand.name, price: brand.price, img: brand.pictureUrl, brand: brand.brand.name, shopName: brand.shop.name ,originalPrice: brand.originalPrice })} value={brand.id}>
                                                            <FavoriteBorder className="favoriteBorderIcon" />
                                                        </Button>
                                                        :
                                                        <Button id="favorite" onClickCapture={(e) => e.preventDefault()} onClick={() => addItem({ id: brand.id, name: brand.name, price: brand.price, img: brand.pictureUrl, brand: brand.brand.name, shopName: brand.shop.name, originalPrice: brand.originalPrice  })} value={brand.id}>
                                                            <FavoriteBorder />
                                                        </Button>
                                                    }
                                                </div>
                                                <div className="hoverItems">
                                                    {inCart(brand.id) ?
                                                        <Button id="favorite" onClickCapture={(e) => e.preventDefault()} onClick={() => inCart(brand.id) ? removeItem(brand.id) : addItem({ id: brand.id, name: brand.name, price: brand.price, img: brand.pictureUrl, brand: brand.brand.name, shopName: brand.shop.name, originalPrice: brand.originalPrice })} value={brand.id}>
                                                            <FavoriteBorder className="favoriteBorderIcon" />
                                                        </Button>
                                                        :
                                                        <Button id="favorite" onClickCapture={(e) => e.preventDefault()} onClick={() => addItem({ id: brand.id, name: brand.name, price: brand.price, img: brand.pictureUrl, brand: brand.brand.name, shopName: brand.shop.name,originalPrice: brand.originalPrice  })} value={brand.id}>
                                                            <FavoriteBorder />
                                                        </Button>
                                                    }

                                                    <Button href={brand.url} target="_blank" rel="noopener noreferrer" id="buttonToSite">
                                                        <p className="linkToSite"> ראה מוצר באתר <b>{brand.shop.name}</b></p>
                                                        <LaunchIcon />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="descPrice">
                                                <div>
                                                    {!brand.discount
                                                        ?
                                                        <div className="originalPriceWithNoDiscount" >&#8362;{brand.originalPrice}</div>
                                                        :
                                                        <div>
                                                            <div className="originalPriceWithDiscount" >&#8362;{brand.originalPrice}</div>
                                                            <div className="price" key={brand.price}>&#8362;{brand.price}</div>
                                                            <div className="discount">{Number(brand.discount.toFixed(1))}%</div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="ajustNames">
                                                    <div className="brandShop" key={brand.brand.name}>{brand.brand.name}</div>
                                                    <div className="shopName" key={brand.name}>{brand.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            ))}
                </div>
                <Pagination totalPages={totalPages.totalPages} page={page} totalNumbers={totalPages.number} pageOptions={pageOptions} handlePageClick={handlePageClick} handlePageChange={handlePageChange}  />
                </>
            
            )} */}
        </>
    )
}