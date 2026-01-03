import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";
import heroVideo from "../assets/hero-video.mp4";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <video
        className="hero-video"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="hero-overlay">
        <h1 className="hero-title">NEW COLLECTION</h1>
        <button
          className="hero-btn"
          onClick={() => navigate("/new-collection")}
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default Hero;
