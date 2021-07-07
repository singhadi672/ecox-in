import React, { useRef, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spotlight } from "../Spotlight/Spotlight";
import { useHome } from "../../contexts/home-context";

export function Home() {
  let navigate = useNavigate();
  const inputref = useRef(null);
  const { homeData } = useHome();

  const [spotlightWindow, setSpotlightWindow] = useState({
    status: false,
    offerURL: null,
  });
  return (
    <>
      <div className="home-content">
        <div className="spotlight" ref={inputref}>
          {homeData.spotlight.map((item) => (
            <li className="spotlight-list" key={item.id}>
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
            {homeData.carousel.map((item) => (
              <div key={item}>
                <img
                  className="carousel-image"
                  src={item}
                  alt="carousel"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="home-categories">
          {homeData.category.map((item) => (
            <div className="home-category" key={item.categoryName}>
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
