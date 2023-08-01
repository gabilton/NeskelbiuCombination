import "./LoginFrame.css";
const LoginFrame = ({ onClose }) => {
  return (
    <div className="loginframe">
      <input className="loginnameinput" type="text" placeholder="Name" />
      <input
        className="loginpasswordinput"
        type="text"
        placeholder="Password"
      />
      <button className="submitloginbuttonframe">
        <b className="submitloginbuttonnametext">Prisijungti</b>
      </button>
    </div>
  );
};

export default LoginFrame;
