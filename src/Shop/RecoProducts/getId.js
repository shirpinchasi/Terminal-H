// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useHistory, useParams } from "react-router-dom";
// import RecommendedProducts from "./Reco";



// function GetId() {
//     const {id} = useParams();
//     const [getId, setGetId] = useState([]);
   
//         useEffect(() => {
//             if (!id) {
//                 return;
//             }
//             getDate(id);
//         }, [id]);

        
//         async function getDate(id) {
//                 const res = await(await fetch(`https://terminal-h.herokuapp.com/api/products?projection=detailedProduct&brand=${id}`, {
//                     method: "GET"
//                 })).json();
//                 setGetId(res._embedded.products);
//                 console.log(res._embedded.products);
//             }
//             console.log();
//     return (
//         <div className="flex">
//             {getId.slice(0,4).map(get =>(
//             <Link to={`/ProductPage/${get.id}`} id="Link">
//                 <div className="ajustRecomm">
//                     <img src={get.pictureUrl} className="pictureUrlRecomm" />
//                     <div className="brandRecomm">{get.brand.name}</div>
//                     <div>{get.name}</div>
//                     <div>&#8362;{get.price}</div>
//                     <div>{get.brand.id}</div>
                    
//                 </div>
//             </Link>
//             ))}
            
//         </div>
        
//     )
    
// }

// export default GetId;