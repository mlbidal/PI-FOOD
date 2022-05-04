import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
    return (
      <div className="landing">
        <h1>FOOD BOOK</h1>
        <div>
          <Link to="./home" className="btnLan">
            <button>start</button>
          </Link>
        </div>
        
      </div>
    );
  }