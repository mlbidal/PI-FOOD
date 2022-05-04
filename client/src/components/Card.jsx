import React from "react";
import "../styles/Card.css";


export default function Card({ title, image, diets, vegetarian, score }) {
    return (
    <div className="cardComp">
        <h3>{title}</h3>
        <div className= 'imgContainer'><img
            src={image}
            alt="Img recipe not found" 
            onError={(e)=>e.target.setAttribute('src','https://png.pngtree.com/png-vector/20190925/ourlarge/pngtree-kitchen-cutlery-icon-png-image_1745530.jpg')}
        />
        </div>
        <h5 className="typeOfD">Type of Diet:</h5>
        <h5 className="diets">
            {diets}
            {vegetarian}
        </h5>
        <h5 className="typeOfD">Score:</h5>
        <h5 className="diets">
        <i class="material-icons"></i>
            {score}
        </h5>
    </div>
    );
}
