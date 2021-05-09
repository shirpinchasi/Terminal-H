import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { Link, Redirect, useHistory, useLocation, withRouter } from "react-router-dom";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import SearchResults from "./SearchRes";


function Search(props) {

    const [query, setQuery] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");


    const handleChangeInput = (e) => {
        setSearchValue(e.target.value);

    }
    
    const resetLoading = () => {
        setLoading(true);
    };

    

    const CallSearchFunction = (e) => {
        e.preventDefault();
        resetLoading();
        setQuery(searchValue);
        props.history.push(`/SearchResults?name=${searchValue}`);
        
    };
    useEffect(() => {

        if (!query) {
            return;
        };
        function refreshPage() {
            window.location.reload(false);
          }
          refreshPage(true)
          
        setQuery(query);
    }, [query]);





    return (
        <div >
            <div>
                <form className="form" onSubmit={CallSearchFunction}>
                    <input className="Search"
                        placeholder="search Product Here.."
                        value={searchValue}
                        onChange={handleChangeInput}
                        type="text"
                        className="searchInput"
                    />
                    <FontAwesomeIcon icon={faSearch} className="far fa-search fa-sm" onClick={CallSearchFunction} />
                </form>
            </div>
            <div>
            {/* <SearchResults/> */}
            </div>
            
        </div>
    );
};

export default withRouter(Search);