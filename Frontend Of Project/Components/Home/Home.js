// Home.js
import React from "react";
import './Home.css';
import Products from "../Products/Products";

function Home() {
    return (
        <div className="mainContainer">
            <div className="contentContainer">
                <h1 className="titleStyle">Ürünler</h1>
                
                {/* <div className="header-container">
                <input
                    type="text"
                    placeholder="Arama yap..."
                    value={Products.searchTerm}
                    onChange={Products.handleSearchTerm}
                    className="search__input"
                 /></div> */}
                <Products />
            </div>
        </div>
    );
}

export default Home;
