import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [homeData, setHomeData] = useState({
    spotlight: [],
    carousel: [],
    category: [],
  });
  const [loader, setLoader] = useState(true);

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
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <HomeContext.Provider value={{ homeData, loader }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  return useContext(HomeContext);
}
