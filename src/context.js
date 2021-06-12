// import React, { createContext, useContext, useReducer } from "react";

// const StoreContext = createContext();
// const initialState = { gender: "", message: "" };

// const reducer = (state, action) => {
//     switch (action.type) {
//         case "WOMEN":
//             return {
//                 gender: state.gender + "WOMEN",
//                 message: action.message
//             }
//         case "MEN":
//             return {
//                 gender: state.gender + "MEN",
//                 message: action.message
//             }
//         case "KIDS":
//             return {
//                 gender: state.gender + "KIDS",
//                 message: action.message
//             }
//         default:
//             throw new Error(`Unable action type${action.type}`)
//     }
// }


// export const StoreProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     return (
//         <StoreContext.Provider value={{ state, dispatch }}>
//             {children}
//         </StoreContext.Provider>
//     )
// }
// export const useStore = () => useContext(StoreContext);
// export default reducer;