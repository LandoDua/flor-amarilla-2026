import React from "react";
import { motion } from "framer-motion";
import FlowerCollage from "./components/FlowerCollage";
import "./App.css";

function App() {
  return (
    <div className="app">
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Para: luly
      </motion.div>

      <FlowerCollage />

      <motion.div
        className="signature-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Orlando
      </motion.div>
    </div>
  );
}

export default App;
