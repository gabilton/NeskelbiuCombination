import { useState, useCallback, useTransition } from "react";
import LoginFrame from "./LoginFrame";
import PortalPopup from "./PortalPopup";
import "./LoginRegAddFrame.css";
import { Link } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';
import { useTranslation } from "react-i18next";


const LoginRegAddFrame = () => {
  const [isLoginFramePopupOpen, setLoginFramePopupOpen] = useState(false);

  const auth = useAuth();

  const openLoginFramePopup = useCallback(() => {
    setLoginFramePopupOpen(true);
  }, []);

  const closeLoginFramePopup = useCallback(() => {
    setLoginFramePopupOpen(false);
  }, []);

  const [t, i18n] = useTranslation("global");

  return (
    <>
      <div className="loginregaddframe">
       
        <Link className="addnewaddbutton" to="/create" >
        <b className="addnewaddbuttonnametext">Naujas skelbimas</b>
        </Link>


        { console.log(auth) }
        { 
          !auth?.user ? ( 
            
            <>
              <Link className="loginbutton" onClick={openLoginFramePopup} to="/login" >
                  <b className="loginbuttonnametext">{t("Login.loginButton")}</b>
              </Link>

              <Link className="loginbutton" to="/register" >
                <b className="addnewaddbuttonnametext">Registracija</b>
              </Link>
            </>
             
           ) : (
                <>
                  <Link className="loginbutton" onClick={openLoginFramePopup} to="/login" >
                      {/* <b className="loginbuttonnametext">{auth.user}</b> */}
                      <b className="loginbuttonnametext">Paskyra</b>
                  </Link>

                  <Link className="loginbutton" to="/register" >
                    <b className="addnewaddbuttonnametext">Atsijungti</b>
                  </Link>
                </>
            ) 
          } 
      </div>
      {isLoginFramePopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeLoginFramePopup}
        >
          <LoginFrame onClose={closeLoginFramePopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default LoginRegAddFrame;
