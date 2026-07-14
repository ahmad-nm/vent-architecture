/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollContext = createContext(0);

export function ScrollProvider({ children }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={scrollProgress}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  return useContext(ScrollContext);
}

// Hook to reset scroll on route change (call this inside Router context)
export function useResetScrollOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const syncScrollProgress = () => {
      window.dispatchEvent(new Event("scroll"));
    };

    syncScrollProgress();
    const frameId = requestAnimationFrame(syncScrollProgress);

    return () => cancelAnimationFrame(frameId);
  }, [location.pathname]);
}
