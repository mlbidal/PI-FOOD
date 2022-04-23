import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
      <div className="landing">
        <h1>FoodBook</h1>
        <h4>SEARCH or CREATE recipes!</h4>
        <div>
          <Link to="./home" className="btnLan">
            <button>start</button>
          </Link>
        </div>
        
      </div>
    );
  }