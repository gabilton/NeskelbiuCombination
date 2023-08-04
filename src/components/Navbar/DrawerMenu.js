import { useEffect } from "react";
import "./css/DrawerMenu.css";
const DrawerMenu = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div className="drawer-menu" data-animate-on-scroll>
      <div className="drawerlanguagebuttonframe">
        <b className="kalba">Kalba</b>
      </div>
      <div className="drawerhistorybuttonframe">
        <b className="kalba">Istorija</b>
      </div>
      <div className="drawerfavoritesbuttonframe">
        <b className="kalba">Patikę skelbimai</b>
      </div>
      <div className="draweraddnewaddbuttonframe">
        <b className="kalba">Naujas skelbimas</b>
      </div>
      <div className="drawerregbuttonframe">
        <b className="kalba">Registracija</b>
      </div>
      <div className="drawerloginbuttonframe">
        <b className="kalba">Prisijungti</b>
      </div>
    </div>
  );
};

export default DrawerMenu;
