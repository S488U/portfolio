import { useState, useEffect, useRef } from "react";

const getRandomMildColor = () => {
  // Base Value + Math.random() * Range
  const hue = Math.floor(Math.random() * 360);
  // Saturation: 60% to 69% (Vibrant but soft)
  const saturation = 60 + Math.floor(Math.random() * 10);
  // Lightness: 89% to 94% (High readability)
  const lightness = 89 + Math.floor(Math.random() * 6);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const generateColors = n => {
  const colorSet = new Set();
  let attempts = 0;

  while (colorSet.size < n && attempts < n * 10) {
    colorSet.add(getRandomMildColor());
    attempts++;
  }

  while (colorSet.size < n) {
    colorSet.add(getRandomMildColor());
  }

  return [...colorSet];
};

export default function useRandomColors(count, reloadKey) {
  const [colors, setColors] = useState(() => generateColors(count));
  const isFirstRender = useRef(true);

  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;

    }

    setColors(generateColors(count));
  }, [count, reloadKey]); // reloadKey triggers re-generation

  return colors;
}   
