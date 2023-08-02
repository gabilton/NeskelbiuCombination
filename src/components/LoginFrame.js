import "./LoginFrame.css";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "api/v1/auth/authenticate";

const LoginFrame = ({ onClose }) => {

  const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, {
                username: user,
                password: pwd
            });
            // console.log(response.data);
            const accessToken = response?.data?.access_token;
            const roles = response?.data?.role;
            const email = response?.data?.email;
            const userId = response?.data?.user_id;
            setAuth({ userId, user, email, roles, accessToken });
            console.log({ userId, user, email, roles, accessToken });
            setUser("");
            setPwd("");

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 403) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login failed");
            }
            errRef.current.focus();
        }
    }

  return (
    <div className="loginframe">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive" //will announce the error immediately when it's focused on
      >
        {errMsg}
      </p>
      <h1 className="text-4xl font-bold">Sign In</h1>
      
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
