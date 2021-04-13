import React, { useEffect, useState } from "react";
import "./Menu.scss";
import Search from "../Search/Search"
import config from "../config/config";
import Loading from "../Loader/Loader";
import { Link, useParams,useLocation } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { logDOM } from "@testing-library/dom";
import Shop from "../Shop/Shop";




function Menu() {
    const [sections, setSections] = useState([])
    
   

    useEffect(() => {
        async function getSections() {
            try {
                const res = await fetch(config.apiSections, {
                    method: "GET"
                })
           
                const fetchedSections = await res.json();
                setSections(fetchedSections._embedded.sections);
                localStorage.setItem('sections', JSON.stringify(sections.map(section =>(
                    {section}
                ))), "name");
            } catch (err) {
                console.log(err);
            }
            
        }
        getSections();
    }, [])



    return (


        <div className="center">
            
            <div className="genderCategories">
                <a href={`/Shop?gender=WOMEN`}>נשים</a>
                <a href="/Shop?gender=MEN">גברים</a>
                <a href="/Shop?gender=KIDS">ילדים</a>
            </div>
            <a className="terminalH" href="/" alt="Feed">Terminal H</a>
            
            <div className="menu">
                <a href="/brands" className="mutagim">מותגים</a>
                {sections.map(section => (
                    <div >
                        <div className="ajustSections">
                            <a href={`/Shop/${section.id}`} className="sectionName" > {section.name}</a>
                        </div>

                    </div>
                ))}


            </div>
            <Search />
            
            <hr />
                    
        </div>
    )


}
export default Menu;