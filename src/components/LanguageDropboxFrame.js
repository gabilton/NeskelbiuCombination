import "./LanguageDropboxFrame.css";
const LanguageDropboxFrame = ({ onClose }) => {
  return (
    <div className="languagedropboxframe">
      <button className="languageselectframegb">
        <img className="flagicongb" alt="" src="/flagicongb@2x.png" />
      </button>
      <button className="languageselectframelt">
        <img className="flagicongb" alt="" src="/flagiconlt@2x.png" />
      </button>
    </div>
  );
};

export default LanguageDropboxFrame;
