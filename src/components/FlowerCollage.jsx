import React, { useState, useEffect, useMemo } from "react";
import FlowerCutout from "./FlowerCutout";
import FinalMessage from "./FinalMessage";

const base = import.meta.env.BASE_URL;

const yellowFlowers = [
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
];

const otherFlowers = [
  `${base}flowers/lilac1.png`,
  `${base}flowers/lilac2.png`,
  `${base}flowers/lilac3.png`,
  `${base}flowers/viola1.png`,
  `${base}flowers/viola2.png`,
];

/**
 * Selecciona una imagen de flor aleatoria.
 * 82% de probabilidad de elegir una flor amarilla, 18% de otros colores.
 * @returns {string} Ruta de la imagen seleccionada
 */
const pickImage = () => {
  if (Math.random() < 0.82) {
    return yellowFlowers[Math.floor(Math.random() * yellowFlowers.length)];
  }
  return otherFlowers[Math.floor(Math.random() * otherFlowers.length)];
};

/**
 * Genera posiciones aleatorias para las flores en una cuadricula.
 * Cada flor recibe: posicion (x, y), rotacion, tamano, imagen y z-index.
 * @param {number} cols - Numero de columnas
 * @param {number} rows - Numero de filas
 * @returns {Array<{x: string, y: string, rotation: number, size: number, src: string, zIndex: number}>}
 */
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
        size = rand(65, 90);
      } else if (sizeRoll < 0.3) {
        size = rand(90, 120);
      } else if (sizeRoll < 0.6) {
        size = rand(120, 160);
      } else if (sizeRoll < 0.85) {
        size = rand(160, 210);
      } else {
        size = rand(210, 260);
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
