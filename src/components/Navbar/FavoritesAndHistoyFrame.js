import "./css/FavoritesAndHistoyFrame.css";
import { Link } from 'react-router-dom';
const FavoritesAndHistoyFrame = () => {
  return (
    <div className="favoritesandhistoyframe">

        <Link className="favoritesbutton" to="/favorite posts" >
      <img className="favoritesicon" alt="" src="/favoritesicon.svg" />
        </Link>

      <Link className="favoritesbutton" to="/posters">
        <img className="historyicon" alt="" src="/historyicon.svg" />
      </Link>


    </div>
  );
};

export default FavoritesAndHistoyFrame;
