import React from "react";
import "../styles/hero.css";
import heroVideo from "../assets/hero-video.mp4";

const Hero = () => {
  return (
    <section className="hero">
      {/* Background Video */}
      <video
        className="hero-video"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay content */}
      <div className="hero-overlay">
        <h1 className="hero-title">NEW COLLECTION</h1>
        <button className="hero-btn">SHOP NOW</button>
      </div>
    </section>
  );
};

export default Hero;