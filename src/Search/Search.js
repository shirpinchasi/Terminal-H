import React, { useEffect, useState } from "react";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";


function Search(props) {

    const [query, setQuery] = useState("");
    const [searchValue, setSearchValue] = useState("");


    const handleChangeInput = (e) => {
        setSearchValue(e.target.value);

    }
    const CallSearchFunction = (e) => {
        e.preventDefault();
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
                        placeholder=" חיפוש "
                        value={searchValue}
                        onChange={handleChangeInput}
                        type="text"
                        className="searchInput"
                    />
                    <img src="https://www.factory54.co.il/on/demandware.static/Sites-factory54-Site/-/default/dw673bf99f/images/fill-19.svg" onClick={CallSearchFunction}/>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Search);