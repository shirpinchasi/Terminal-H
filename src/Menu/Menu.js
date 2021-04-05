import React, { useEffect, useState } from "react";
import "./Menu.scss";
import Search from "./Search/Search";
import config from "../config/config";
import Loading from "../Loader/Loader";
import { Link, useParams } from "react-router-dom";

function Menu() {
    const [sections, setSections] = useState([])
    const [isLoading, setLoading] = useState(true);

    const callLoading = (e) =>{
        setLoading(true);
        <Loading/>
    }
    
    useEffect(()=>{
       async function getSections() {
            try{
                const res = await fetch(config.apiSections ,{
                    method : "GET"
                })
                const fetchedSections = await res.json();
                setSections(fetchedSections._embedded.sections);
                console.log(fetchedSections._embedded.sections);
                setLoading(callLoading)
                sessionStorage.setItem('sections', JSON.stringify(sections),"name");
            }catch(err){
                console.log(sections);
            }
        }
        getSections();
    }, [])
    return(
        <div>
            
        <div className="center">
            <a className="terminalH" href="/" alt="Feed">Terminal H</a>
            
        <div className="menu">
        <a href="/brands" className="mutagim">מותגים</a> 
            {sections.map(section =>(
                <div >
                    {/* <Link to ={`/Shop/${section.id}`}> */}
                    <div className="ajustSections">
                        <a href={`/Shop/${section.id}`} className="sectionName" onClick={callLoading}> {section.name}</a>
                    </div>  
                    {/* </Link> */}
                </div>
            ))}
             
        </div>
        <Search/>
        <hr/>
       
        </div>
        </div>
    )

    
}
export default Menu;