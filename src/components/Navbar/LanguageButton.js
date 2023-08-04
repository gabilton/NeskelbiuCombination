import { useState, useRef, useCallback } from "react";
import LanguageDropboxFrame from "./LanguageDropboxFrame";
import PortalPopup from "./PortalPopup";
import "./css/LanguageButton.css";
const LanguageButton = () => {
  const languageButtonRef = useRef(null);
  const [isLanguageDropboxFramePopupOpen, setLanguageDropboxFramePopupOpen] =
    useState(false);

  const openLanguageDropboxFramePopup = useCallback(() => {
    setLanguageDropboxFramePopupOpen(true);
  }, []);

  const closeLanguageDropboxFramePopup = useCallback(() => {
    setLanguageDropboxFramePopupOpen(false);
  }, []);

  return (
    <>
      <button
        className="languagebutton"
        ref={languageButtonRef}
        onClick={openLanguageDropboxFramePopup}
      >
        <img className="languageicon" alt="" src="/languageicon.svg" />
      </button>
      {isLanguageDropboxFramePopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom left"
          relativeLayerRef={languageButtonRef}
          onOutsideClick={closeLanguageDropboxFramePopup}
        >
          <LanguageDropboxFrame onClose={closeLanguageDropboxFramePopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default LanguageButton;
