import "./FooterFrame.css";
const FooterFrame = () => {
  return (
    <footer className="footerframe">
      <div className="footerhelpinfoframe">
        <i className="footerhelpinfonametext">
          NE!Skelbiu.lt pagalba: +3706******0
        </i>
      </div>
      <div className="footerworkhoursinfoframe">
        <i className="footerhelpinfonametext">
          Darbo laikas: I-V 08:20 - 17:00
        </i>
      </div>
      <div className="footermenuframe">
        <i className="footerhelpinfonametext">D.U.K</i>
        <i className="footerhelpinfonametext">Naudojimo taisyklės</i>
        <i className="footerhelpinfonametext">Privatumo politika</i>
        <i className="footerhelpinfonametext">Kontaktai</i>
        <i className="footerhelpinfonametext">Svetainės struktūra</i>
      </div>
    </footer>
  );
};

export default FooterFrame;
