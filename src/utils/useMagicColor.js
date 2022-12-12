import React, { useEffect, useRef, useState } from "react";
const randomColor = (colorRef) => {
  const listColor = [
    "red",
    "green",
    "yellow",
    "blue",
    "white",
    "black",
    "dark",
    "brown",
    "gray",
    "pink",
  ];
  const currentIndex = listColor.indexOf(colorRef);
  let newIndex = currentIndex;
  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * 10);
  }
  return listColor[newIndex];
};
const useMagicColor = () => {
  const [color, setColor] = useState("transparent");
  const colorRef = useRef("transparent");
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor(colorRef.current);
      setColor(newColor);
      colorRef.current = newColor;
    }, 1000);
    return () => {
      clearInterval(colorInterval);
    };
  }, []);
  return { color };
};

export default useMagicColor;
