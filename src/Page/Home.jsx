import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero"
import Features from "./Features";
import Categories from "./Categories"
import SaleSection from "./SaleSection"
import Footer from "./Footer"

function Home() {
  return (
    <>
      <Navbar />
      
      <Hero/>
        <Features/>
      <Categories/>
      
      <SaleSection/>
      
      <Footer/>
    </>
  );
}

export default Home;
