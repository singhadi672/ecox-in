import React, { useEffect } from "react";
import "./spotlight.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function Spotlight({ setSpotlightWindow, spotlightWindow }) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setSpotlightWindow((spotlightWindow) => ({
        ...spotlightWindow,
        status: false,
      }));
    }, 4000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
  return (
    <>
      <div className="spotlight-main"></div>
      <div className="spotlight-carousel">
        <Carousel
          axis="vertical"
          showThumbs={false}
          showArrows={false}
          className="carousel-container"
        >
          <img
            src={spotlightWindow.offerURL}
            alt=""
            className="spotlight-reel-img"
          />
        </Carousel>
        <FontAwesomeIcon
          icon={faTimes}
          style={{ marginLeft: "1rem", color: "white", cursor: "pointer" }}
          size="2x"
          onClick={() => {
            setSpotlightWindow((spotlightWindow) => ({
              ...spotlightWindow,
              status: false,
            }));
          }}
        />
      </div>
    </>
  );
}
