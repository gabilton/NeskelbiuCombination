import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../index.css"

const LOGIN_URL = "api/v1/auth/authenticate";
//"/api/v1/auth/authenticate"

const Login = () => {
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
        <section>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive" //will announce the error immediately when it's focused on
            >
                {errMsg}
            </p>
            <h1 className="text-4xl font-bold">Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Sign in
                </button>
            </form>
            <p>
                Need an Account?
                <br />
                <span className="line">
                    <Link
                        to="/register"
                        className="text-blue-500 hover:text-blue-400"
                    >
                        Sign up
                    </Link>
                </span>
            </p>
        </section>
    );
};

export default Login;
