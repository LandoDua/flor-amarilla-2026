import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FlowerCollage from "./components/FlowerCollage";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

const base = import.meta.env.BASE_URL;

const allFlowers = [
  `${base}flowers/sunflower1.png`,
  `${base}flowers/sunflower2.png`,
  `${base}flowers/sunflower3.png`,
  `${base}flowers/sunflower4.png`,
  `${base}flowers/sunflower5.png`,
  `${base}flowers/sunflower6.png`,
  `${base}flowers/sunflower7.png`,
  `${base}flowers/sunflower8.png`,
  `${base}flowers/tulip1.png`,
  `${base}flowers/tulip2.png`,
  `${base}flowers/tulip3.png`,
  `${base}flowers/tulip4.png`,
  `${base}flowers/tulip5.png`,
  `${base}flowers/tulip6.png`,
  `${base}flowers/lilium1.png`,
  `${base}flowers/lilium2.png`,
  `${base}flowers/lilium3.png`,
  `${base}flowers/lilium4.png`,
  `${base}flowers/dandelion1.png`,
  `${base}flowers/dandelion2.png`,
  `${base}flowers/dandelion3.png`,
  `${base}flowers/lilac1.png`,
  `${base}flowers/lilac2.png`,
  `${base}flowers/lilac3.png`,
  `${base}flowers/viola1.png`,
  `${base}flowers/viola2.png`,
];

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let loaded = 0;
    const total = allFlowers.length;

    allFlowers.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= total) {
          setTimeout(() => setIsLoading(false), 600);
        }
      };
      img.src = src;
    });

    const fallback = setTimeout(() => setIsLoading(false), 8000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className="app">
      <LoadingScreen show={isLoading} />

      <div className="newspaper-bg">
        <div className="newspaper-texture" />
        <div className="newspaper-columns">
          <div className="column" />
          <div className="column" />
          <div className="column" />
        </div>
      </div>

      <motion.div
        className="caption-top"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Para: luly
      </motion.div>

      {!isLoading && <FlowerCollage />}

      <motion.div
        className="signature-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Orlando
      </motion.div>
    </div>
  );
}

export default App;
