// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const RecipeContext = React.createContext();


// function RecipeProvider({children}) {
//   const [data, setData] = React.useState([]);
  
//   async function GetData(){
//     const res = await (await fetch("https://terminal-h.herokuapp.com/api/products?page=1", {
//     method: "GET"
//   })).json()
//   setData(res._embedded.products)
  
// }
//   useEffect(() => {
//       GetData()
//     console.log(data)
//     }, []);
  


//   return (
//     <RecipeContext.Provider
//       value={{
//         data
//       }}
//     >
//       {/* {data.map((item)=>(
//         <div>
//           {item.id}
//         </div>
//       ))} */}
//       {/* {data.map((item)=>(
//         console.log(item.id, item.url)
//       ))} */}
//     </RecipeContext.Provider>
//   );
// }

// export default RecipeProvider;
