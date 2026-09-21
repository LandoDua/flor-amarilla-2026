import React, { useState, useEffect, useMemo } from "react";
import FlowerCutout from "./FlowerCutout";
import FinalMessage from "./FinalMessage";

const yellowFlowers = [
  "/flowers/sunflower1.png",
  "/flowers/sunflower2.png",
  "/flowers/sunflower3.png",
  "/flowers/sunflower4.png",
  "/flowers/sunflower5.png",
  "/flowers/sunflower6.png",
  "/flowers/sunflower7.png",
  "/flowers/sunflower8.png",
  "/flowers/tulip1.png",
  "/flowers/tulip2.png",
  "/flowers/tulip3.png",
  "/flowers/tulip4.png",
  "/flowers/tulip5.png",
  "/flowers/tulip6.png",
  "/flowers/lilium1.png",
  "/flowers/lilium2.png",
  "/flowers/lilium3.png",
  "/flowers/lilium4.png",
  "/flowers/dandelion1.png",
  "/flowers/dandelion2.png",
  "/flowers/dandelion3.png",
];

const otherFlowers = [
  "/flowers/lilac1.png",
  "/flowers/lilac2.png",
  "/flowers/lilac3.png",
  "/flowers/viola1.png",
  "/flowers/viola2.png",
];

const pickImage = () => {
  if (Math.random() < 0.82) {
    return yellowFlowers[Math.floor(Math.random() * yellowFlowers.length)];
  }
  return otherFlowers[Math.floor(Math.random() * otherFlowers.length)];
};

const generateFlowerPositions = (cols, rows) => {
  const positions = [];
  const rand = (min, max) => Math.random() * (max - min) + min;
  const cellW = 100 / cols;
  const cellH = 100 / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const baseX = col * cellW + cellW / 2;
      const baseY = row * cellH + cellH / 2;

      const jitterX = rand(-cellW * 0.45, cellW * 0.45);
      const jitterY = rand(-cellH * 0.45, cellH * 0.45);

      const sizeRoll = Math.random();
      let size;
      if (sizeRoll < 0.1) {
        size = rand(35, 55);
      } else if (sizeRoll < 0.3) {
        size = rand(55, 85);
      } else if (sizeRoll < 0.6) {
        size = rand(85, 130);
      } else if (sizeRoll < 0.85) {
        size = rand(130, 185);
      } else {
        size = rand(185, 240);
      }

      positions.push({
        x: `${Math.max(0, Math.min(95, baseX + jitterX))}%`,
        y: `${Math.max(0, Math.min(95, baseY + jitterY))}%`,
        rotation: rand(-30, 30),
        size,
        src: pickImage(),
        zIndex: Math.floor(rand(1, 18)),
      });
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  return positions;
};

const FlowerCollage = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  const flowers = useMemo(() => generateFlowerPositions(6, 10), []);
  const totalFlowers = flowers.length;

  useEffect(() => {
    if (visibleCount >= totalFlowers) return;

    const delay = visibleCount === 0 ? 400 : 50 + Math.random() * 80;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleCount, totalFlowers]);

  return (
    <div className="collage-container">
      {flowers.slice(0, visibleCount).map((flower, index) => (
        <FlowerCutout
          key={index}
          src={flower.src}
          size={flower.size}
          delay={0}
          style={{
            left: flower.x,
            top: flower.y,
            transform: `translate(-50%, -50%) rotate(${flower.rotation}deg)`,
            zIndex: flower.zIndex,
          }}
        />
      ))}

      <FinalMessage show={visibleCount >= totalFlowers} />
    </div>
  );
};

export default FlowerCollage;
