import HomeButton from "./HomeButton";
import DrawerMenuButton from "./DrawerMenuButton";
import Search from "./Search";
import FavoritesAndHistoyFrame from "./FavoritesAndHistoyFrame";
import LoginRegAddFrame from "./LoginRegAddFrame";
import LanguageButton from "./LanguageButton";
import HandleChangeLanguage from '../../hooks/HandleChangeLanguage';
import "./css/NavBar.css";
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="homeandsearchframe">
        <div className="homeandsearchbox">
          <HomeButton />
          <DrawerMenuButton />
          <Search />
        </div>
      </div>
      <div className="menuitems">
        <FavoritesAndHistoyFrame />
        <LoginRegAddFrame />
        <HandleChangeLanguage />
        {/* <LanguageButton /> */}
      </div>
    </div>
  );
};

export default NavBar;
