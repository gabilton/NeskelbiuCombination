import { useState, useCallback } from "react";
import DrawerMenu from "./DrawerMenu";
import PortalDrawer from "./PortalDrawer";
import "./css/DrawerMenuButton.css";
const DrawerMenuButton = () => {
  const [isDrawerMenuOpen, setDrawerMenuOpen] = useState(false);

  const openDrawerMenu = useCallback(() => {
    setDrawerMenuOpen(true);
  }, []);

  const closeDrawerMenu = useCallback(() => {
    setDrawerMenuOpen(false);
  }, []);

  return (
    <>
      <button className="drawermenu-button" onClick={openDrawerMenu}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </button>
      {isDrawerMenuOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Left"
          onOutsideClick={closeDrawerMenu}
        >
          <DrawerMenu onClose={closeDrawerMenu} />
        </PortalDrawer>
      )}
    </>
  );
};

export default DrawerMenuButton;
