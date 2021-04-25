import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [homeData, setHomeData] = useState({
    spotlight: [],
    carousel: [],
    category: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { home },
        } = await axios.get("https://damp-mesa-30814.herokuapp.com/home");
        setHomeData({
          ...homeData,
          carousel: home["0"].carouselImages,
          category: home["0"].category,
          spotlight: home["0"].spotlights,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <HomeContext.Provider value={{ homeData }}>{children}</HomeContext.Provider>
  );
}

export function useHome() {
  return useContext(HomeContext);
}
