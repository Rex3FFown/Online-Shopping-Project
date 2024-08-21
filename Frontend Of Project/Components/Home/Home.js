// Home.js
import React from "react";
import './Home.css';
import Products from "../Products/Products";

function Home() {
    return (
        <div className="mainContainer">
            <div className="contentContainer">
                <h1 className="titleStyle">Ürünler</h1>
                <Products />
            </div>
        </div>
    );
}

export default Home;
