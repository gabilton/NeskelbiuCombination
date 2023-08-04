import "./css/HomeButton.css";
import { Link } from 'react-router-dom';
const HomeButton = () => {
  return (


  

<Link className="homebutton" to="/">
<div className="homeicon">
        <img className="union-2-icon" alt="" src="/union-2.svg" />
        <img className="union-icon" alt="" src="/union.svg" />
        <img className="intersect-icon" alt="" src="/intersect.svg" />
        <img className="union-3-icon" alt="" src="/union-3.svg" />
      </div>
      <i className="homebuttontext">Ne!Skelbiu</i>
        </Link>

  );
};

export default HomeButton;
