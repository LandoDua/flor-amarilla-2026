import React, { useMemo } from "react";
import { motion } from "framer-motion";

const FlowerCutout = ({ src, style, delay = 0, size }) => {
  const wobbleConfig = useMemo(() => {
    const rand = (min, max) => Math.random() * (max - min) + min;
    return {
      xOffsets: [0, rand(-8, 8), rand(-5, 5), rand(-7, 7), 0],
      yOffsets: [0, rand(-5, 5), rand(-7, 7), rand(-4, 4), 0],
      rotations: [0, rand(-6, 6), rand(-4, 4), rand(-5, 5), 0],
      opacities: [1, rand(0.7, 0.95), 1, rand(0.75, 0.98), 1],
      duration: rand(2.5, 4.5),
      steps: Math.floor(rand(3, 6)),
    };
  }, []);

  return (
    <motion.div
      className="flower-cutout"
      style={{
        position: "absolute",
        ...style,
        zIndex: style.zIndex || 1,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0.15, rotate: Math.random() * 50 - 25 }}
      animate={{
        opacity: wobbleConfig.opacities,
        scale: 1,
        x: wobbleConfig.xOffsets,
        y: wobbleConfig.yOffsets,
        rotate: wobbleConfig.rotations,
      }}
      transition={{
        opacity: {
          delay,
          duration: 0.12,
          ease: "easeOut",
        },
        scale: {
          delay,
          type: "spring",
          stiffness: 280,
          damping: 14,
        },
        x: {
          delay: delay + 0.3,
          duration: wobbleConfig.duration,
          repeat: Infinity,
          ease: `steps(${wobbleConfig.steps})`,
        },
        y: {
          delay: delay + 0.3,
          duration: wobbleConfig.duration,
          repeat: Infinity,
          ease: `steps(${wobbleConfig.steps})`,
        },
        rotate: {
          delay: delay + 0.3,
          duration: wobbleConfig.duration,
          repeat: Infinity,
          ease: `steps(${wobbleConfig.steps})`,
        },
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </motion.div>
  );
};

export default FlowerCutout;
