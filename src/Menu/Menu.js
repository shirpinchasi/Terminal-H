import React from "react";
import "./Menu.scss";


function Menu() {
    return(
        
        <div className="menu">
            <a className="terminalH" href="/" alt="Feed">Terminal H</a>
            <div className="d-flex col-6">
                <a href="/Shoes" alt="Shoes">נעליים</a>
                <a href="/Clothing" alt="Clothing">ביגוד</a>
                <a href="/Equipment" alt="Equipment">מכשירי כושר וציוד</a>
                <a href="/SportBrands" alt="SportBrands">ענפי ספורט</a>
                <a href="/Games" alt="Games">משחקים ופנאי</a>
                <a href="/Beauty" alt="Beauty">ביוטי ולייף סטייל</a>
                <a href="/Accessories" alt="Accessories">אקססוריז</a>
                <a href="/Bags" alt="Bags">תיקים</a>
                <a href="/Search">חיפוש</a>
               


            </div>
            
            <hr/>

        </div>
    )

    
}
export default Menu;