import { useState, useRef, useCallback } from "react";
import FilterDropboxFrame from "./FilterDropboxFrame";
import PortalPopup from "./PortalPopup";
import "./Search.css";
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

  return (
    <>
      <div className="search">
        <input className="searchinput" type="text" />
        <button
          className="filterbutton"
          ref={filterButtonRef}
          onClick={openFilterDropboxFramePopup}
        >
          <b className="filterbuttonnametext">Filtras</b>
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
