import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Loader/Loader";
import { Link } from "react-router-dom";
import "./BrandPage.scss";
import ReactPaginate from "react-paginate"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from "../../config/config";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BrandPage() {
    const { id } = useParams();
    const [brandProduct, setBrandProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(0);
    const [sortCount, setSortCount] = useState(30)
    const [pages, setPages] = useState([]);
    const [value, setValue] = useState('');
 

    useEffect(() => {
        if (!id) {
            return;
        }
        getBrandProduct(id);
    }, [id, page, sort, sortCount, value]);


    async function getBrandProduct(id) {
        const fetchBrandProduct = await (await fetch(config.apiShop + `&brand=${id}&page=${page}&size=${sortCount}&sort=price,${sort}&gender=${value}`, {
            method: "GET",
        })).json();
        console.log(fetchBrandProduct._embedded.products);
        setPages(fetchBrandProduct.page);
        setBrandProduct(fetchBrandProduct._embedded.products);
        setLoading(false);

    }
    const handlePageClick = (e) => {
        const page = e.selected;
        setPage(page)
        scrollToTop();
    };
    const handleChangeGender = (event) => {
        setValue(event.target.value);
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
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };





    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="brandProduct">
                     <div className="filters">
                            
                           
                            <FormControl id="two">
                                <InputLabel id="select">כמות מוצרים</InputLabel>
                                <Select
                                    labelId="select"
                                    id="selectOption2"
                                    value={sortCount}
                                    onChange={handleSortChange}
                                    setLoading={false}
                                >
                                    <MenuItem value={"30"}> 30 </MenuItem>
                                    <MenuItem value={"60"}> 60 </MenuItem>
                                    <MenuItem value={"90"}> 90 </MenuItem>
                                    <MenuItem value={"120"}> 120 </MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl id="gender">
                                <InputLabel id="select">מגדר</InputLabel>
                                <Select
                                    labelId="select"
                                    id="selectOption3"
                                    value={value}
                                    onChange={handleChangeGender}
                                    setLoading={false}
                                >
                                    <MenuItem value={"WOMEN"}>נשים</MenuItem>
                                    <MenuItem value={"MEN"}> גברים </MenuItem>
                                    <MenuItem value={"KIDS"}> ילדים </MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            {/* <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChangeNew}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div> */}
                            {/* <FormControl id="four">
                                <InputLabel id="select">מותג</InputLabel>
                                <Select

                                    labelId="select"
                                    id="selectOption1"
                                    value={brandid}
                                    onChange={handleBrandIdChange}
                                    setLoading={false}
                                >
                                    {brands.map((brand, index) =>
                                        <MenuItem key={index} value={brand.id} className="abc" >{brand.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl> */}
                            
                        </div>
                    {/* <FormControl id="oneee">
                        <InputLabel id="select">...הצג לפי</InputLabel>
                        <Select
                            labelId="select"
                            id="selectOption"
                            value={sort}
                            onChange={handleChange}
                            setLoading={false}
                        >
                            <MenuItem value={""}>...הצג לפי</MenuItem>
                            <MenuItem value={"asc"}> מחיר: מהנמוך לגבוה</MenuItem>
                            <MenuItem value={"desc"}> מחיר: מהגבוה לנמוך</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl id="twooo">
                        <InputLabel id="select">כמות מוצרים</InputLabel>
                        <Select
                            labelId="select"
                            id="selectOption2"
                            value={sortCount}
                            onChange={handleSortChange}
                            setLoading={false}
                        >
                            <MenuItem value={"30"}> 30 </MenuItem>
                            <MenuItem value={"60"}> 60 </MenuItem>
                            <MenuItem value={"90"}> 90 </MenuItem>
                            <MenuItem value={"120"}> 120 </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl id="genderr">
                        <InputLabel id="select">מגדר</InputLabel>
                        <Select
                            labelId="select"
                            id="selectOption3"
                            value={value}
                            onChange={handleChangeGender}
                            setLoading={false}
                        >
                            <MenuItem value={"WOMEN"}>נשים</MenuItem>
                            <MenuItem value={"MEN"}> גברים </MenuItem>
                            <MenuItem value={"KIDS"}> ילדים </MenuItem>
                        </Select>
                    </FormControl> */}
                    
                        
                        {brandProduct.map(brandPro => (
                            <div >
                                <Link to={`/ProductPage/${brandPro.id}`} id="Link">
                                    <div className="ajustProductBrands">
                                        <img src={brandPro.pictureUrl} alt="" className="pictureUrlProBrands" />
                                        <div className="brandProBrands">{brandPro.brand.name}</div>
                                        <div>{brandPro.name}</div>
                                        <div>&#8362;{brandPro.price}</div>
                                    </div>
                                </Link>
                            </div>
                        ))}

                    
                    <ReactPaginate
                        className="pagination"
                        previousLabel={"הקודם"}
                        nextLabel={"הבא"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pages.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        initialPage={0}
                        setLoading={false}
                    />
                </div>
            )}

        </div>
    )
}