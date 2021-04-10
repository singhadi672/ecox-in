import React from "react";
import { category } from "../../api/homepageDB";
import "./home.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  let navigate = useNavigate();
  return (
    <div className="home-category">
      {category.map((item) => (
        <div className="category">
          <img src={item.image} alt="" />
          <div
            className="category-heading"
            onClick={() => navigate(`../${item.applink}`)}
          >
            <p>{item.categoryName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
