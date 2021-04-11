import React, { useRef, useState } from "react";
import { category, carouselImages, spotlightData } from "../../api/homepageDB";
import "./home.css";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spotlight } from "../Spotlight/Spotlight";

export function Home() {
  let navigate = useNavigate();
  const inputref = useRef(null);

  const [spotlightWindow, setSpotlightWindow] = useState({
    status: false,
    offerURL: null,
  });
  return (
    <>
      <div className="home-content">
        <div className="spotlight" ref={inputref}>
          {spotlightData.map((item) => (
            <li className="spotlight-list">
              <div className="spotlight-item">
                <div className="img-cover">
                  <img
                    src={item.image}
                    alt=""
                    onClick={() =>
                      setSpotlightWindow((spotlightWindow) => ({
                        ...spotlightWindow,
                        status: true,
                        offerURL: item.offerURL,
                      }))
                    }
                  />
                </div>
                <p>{item.personName}</p>
              </div>
            </li>
          ))}
          <button
            className="scroll-button button-right"
            onClick={() => {
              inputref.current.scrollLeft -= 500;
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="scroll-button button-left"
            onClick={() => {
              inputref.current.scrollLeft += 500;
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
        <div className="home-carousel">
          <Carousel
            autoPlay={true}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            interval={4000}
          >
            {carouselImages.map((item) => (
              <div>
                <img
                  className="carousel-image"
                  src={item}
                  alt="carousel image"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="home-categories">
          {category.map((item) => (
            <div className="home-category">
              <img
                src={item.image}
                alt=""
                onClick={() => navigate(item.applink)}
              />
              <div className="category-desc">
                <h2>{item.categoryName}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      {spotlightWindow.status && (
        <Spotlight
          setSpotlightWindow={setSpotlightWindow}
          spotlightWindow={spotlightWindow}
        />
      )}
    </>
  );
}
