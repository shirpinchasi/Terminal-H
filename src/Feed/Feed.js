import React, { useEffect, useState } from "react";

// export default class Feed extends Component{
//     constructor(props){
//         super(props);
//         this.state={ 
//             data : []
//         };
//         }
//         componentDidMount(){
//             fetch("https://terminal-h.herokuapp.com/api/categories" ,{
//                 method : "GET"
//             })
//             .then(res => res.json())
//             .then(res =>{
//                 this.setState({
//                     data : res._embedded.categories,
//                 })
//             })
//     }
//     render(){
//         return(
//             <div></div>
//         )
//     }
// }

// export default function Feed() {

//     const [categories , setCategories] = useState([]);
    
//     useEffect(()=>{
//        async function FetchData() {
//     const res = await fetch("https://terminal-h.herokuapp.com/api/categories")
//         res.json()
//         .then(res => setCategories(res._embedded.categories))
//         .catch(err => console.log(err));
//     }
// })


function Feed() {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        async function getData() {
            try{
                const res = await fetch("https://terminal-h.herokuapp.com/api/categories",{
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
    console.log(categories);

return(
    <div>
        {categories.map(category =>(
            <div key="some.some">{console.log(category.name)}</div>
        ))}
    </div>
)
}
export default Feed


  

   
   
   
   
   
