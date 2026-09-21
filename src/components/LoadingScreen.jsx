import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 200 200" width="120" height="120">
              {[...Array(12)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="40"
                  rx="16"
                  ry="35"
                  fill={i % 2 === 0 ? "#F4D03F" : "#FFEB3B"}
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
              <circle cx="100" cy="100" r="22" fill="#5D4037" />
              <circle cx="100" cy="100" r="14" fill="#4E342E" />
            </svg>
          </motion.div>

          <motion.p
            className="loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Cargando flores...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
