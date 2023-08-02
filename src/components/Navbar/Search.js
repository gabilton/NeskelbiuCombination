import { useState, useRef, useCallback } from "react";
import FilterDropboxFrame from "./FilterDropboxFrame";
import PortalPopup from "./PortalPopup";
import "./Search.css";
import { useTranslation } from "react-i18next";

const Search = () => {
  const filterButtonRef = useRef(null);
  const [isFilterDropboxFramePopupOpen, setFilterDropboxFramePopupOpen] =
    useState(false);

  const openFilterDropboxFramePopup = useCallback(() => {
    setFilterDropboxFramePopupOpen(true);
  }, []);

  const closeFilterDropboxFramePopup = useCallback(() => {
    setFilterDropboxFramePopupOpen(false);
  }, []);

  const [t, i18n] = useTranslation("global");

  return (
    <>
      <div className="search">
        <input className="searchinput" type="text" />
        <button
          className="filterbutton"
          ref={filterButtonRef}
          onClick={openFilterDropboxFramePopup}
        >
          <b className="filterbuttonnametext">{t("navbarButtons.filterButton")}</b>
        </button>
        <img className="searchicon" alt="" src="/searchicon.svg" />
      </div>
      {isFilterDropboxFramePopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom left"
          relativeLayerRef={filterButtonRef}
          onOutsideClick={closeFilterDropboxFramePopup}
        >
          <FilterDropboxFrame onClose={closeFilterDropboxFramePopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Search;
