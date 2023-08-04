import { useRef, useState, useEffect } from "react";
import {
    faCheck,
    faTimes,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z](?!.*\s)[a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}/;
const FIRST_REGEX = /^[A-Za-z]{3,24}$/;
const LAST_REGEX = /^[A-Za-z]{3,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "api/v1/auth/register";

function Register() {
    const userRef = useRef(); //focus on the user input when page is loaded
    const errRef = useRef(); //error focus

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        // console.log(result);
        // console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        // console.log(result);
        // console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        const result = FIRST_REGEX.test(firstName);
        // console.log(result);
        // console.log(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = LAST_REGEX.test(lastName);
        // console.log(result);
        // console.log(lastName);
        setValidLastName(result);
    }, [lastName]);
    // email checking
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        // console.log(result);
        // console.log(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd, email]);

    async function handleSubmit(e) {
        e.preventDefault();
        //if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = FIRST_REGEX.test(firstName);
        const v4 = LAST_REGEX.test(lastName);
        const v5 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("invalid Entry");
            return;
        }
        try {
            console.log(REGISTER_URL)
            const response = await axios.post(REGISTER_URL, {
                username: user,
                password: pwd,
                role: "USER",
                firstname: firstName,
                lastname: lastName,
                email: email
            });
            console.log(response.data);
            console.log(response.data.access_token);
            setSuccess(true);
            //clear input fields
            setUser("");
            setPwd("");
            setMatchPwd("");
            setFirstName("");
            setLastName("");
            setEmail("");
        } catch (err) {
            if (!err.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username taken"); //TODO reikia jog patikrintų ar toks vartotojas jau egzistuoja // cai tai padaro manau
            } else {
                setErrMsg("Registration failed");
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1 className="text-4xl font-bold text-green-800">
                        Success!
                    </h1>
                    <p>
                        <a
                            href="/login"
                            className="text-blue-500 hover:text-blue-400"
                        >
                            Sign In
                        </a>
                    </p>
                </section>
            ) : (
                <section className="registerForm">
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    {/* Formos pavadinimas */}
                    <h1 className="text-4xl font-bold"> Register </h1>
                    <form onSubmit={handleSubmit}>
                        {/* username label */}
                        <label htmlFor="username">
                            Username:
                            <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                                className={
                                    validName || !user ? "hide" : "invalid"
                                }
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        {/* username input */}
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p
                            id="uidnote"
                            className={
                                userFocus && user && !validName
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscore, hyphens allowed.
                        </p>
                        {/* password label */}
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validPwd ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validPwd || !pwd ? "hide" : "invalid"
                                }
                            />
                        </label>
                        {/* username input */}
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p
                            id="pwdnote"
                            className={
                                pwdFocus && !validPwd
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            <br />
                            Must include uppercase and lowercase letters, a
                            number and a special character.
                            <br />
                            Allowed special characters:{" "}
                            <span aria-label="exclamation mark">!</span>{" "}
                            <span aria-label="at symbol">@</span>{" "}
                            <span aria-label="hashtag">#</span>{" "}
                            <span aria-label="dollar sign">$</span>{" "}
                            <span aria-label="percent">%</span>
                        </p>
                        {/* password comfirmation label */}
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validMatch && matchPwd ? "valid" : "hide"
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validMatch || !matchPwd ? "hide" : "invalid"
                                }
                            />
                        </label>
                        {/* password comfirmation input*/}
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p
                            id="confirmnote"
                            className={
                                matchFocus && !validMatch
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        {/* first name label */}
                        <label htmlFor="firstname">
                            First name:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validFirstName && firstName
                                        ? "valid"
                                        : "hide"
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validFirstName || !firstName
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </label>
                        {/* first name input */}
                        <input
                            type="text"
                            id="firstname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="firstnote"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                        />
                        <p
                            id="firstnote"
                            className={
                                firstNameFocus && firstName && !validFirstName
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3 to 24 characters.
                            <br />
                            Letters only allowed.
                        </p>
                        {/* last name label */}
                        <label htmlFor="lastname">
                            Last name:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validLastName && lastName ? "valid" : "hide"
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validLastName || !lastName
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </label>
                        {/* last name input */}
                        <input
                            type="text"
                            id="lastname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="lastnote"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                        />
                        <p
                            id="lastnote"
                            className={
                                lastNameFocus && lastName && !validLastName
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3 to 24 characters.
                            <br />
                            Letters only allowed.
                        </p>
                        {/* email label */}
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validEmail && email ? "valid" : "hide"
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validEmail || !email ? "hide" : "invalid"
                                }
                            />
                        </label>
                        {/* email input */}
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p
                            id="emailnote"
                            className={
                                emailFocus && email && !validEmail
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Email has to be valid
                        </p>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            disabled={
                                !validName ||
                                !validPwd ||
                                !validMatch ||
                                !validFirstName ||
                                !validLastName ||
                                !email
                                    ? true
                                    : false
                            }
                        >
                            Sign Up
                        </button>
                    </form>
                    <p>
                        Already Registered?
                        <br />
                        <span className="line">
                            <Link
                                to="/login"
                                className="text-blue-500 hover:text-blue-400"
                            >
                                Sign in
                            </Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}
export default Register;
