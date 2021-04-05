import React, { useEffect, useState } from "react";
import config from "../config/config"
import Menu from "../Menu/Menu";



function Feed() {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        async function getData() {
            try{
                const res = await fetch(config.apiCategories,{
                    method : "GET"
                });
                const fetchedData = await res.json();
                setCategories(fetchedData._embedded.categories);
            }catch(err){
                console.log(categories);
            }
            
        }
       getData();
    },[])
    

return(
    <div>
        
        {categories.map(category =>(
            <div>
            <div key="catt.so"></div>
            
            </div>
        ))}
        
    </div>
)
}
export default Feed


  

   
   
   
   
   
