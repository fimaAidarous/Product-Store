import { useState, useEffect } from "react";

export const useColorMode = () => {
  const [colorMode, setColorMode] = useState("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("colorMode");
    if (savedMode) {
      setColorMode(savedMode);
    } else {
      setColorMode("light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newMode);
    localStorage.setItem("colorMode", newMode); 
  };

  return { colorMode, toggleColorMode };
};
