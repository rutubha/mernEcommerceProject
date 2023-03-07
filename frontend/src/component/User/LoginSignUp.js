import { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import Profile from "./../../images/Profile.png";
import {
  FaceOutlined,
  LockOpenOutlined,
  MailOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register ,clearErrors} from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(Profile);
  const [avatarPreview, setAvatarPreview] = useState(Profile);
  //   const [ name, email, password] = registerData;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", registerData.name);
    myForm.set("email", registerData.email);
    myForm.set("password", registerData.password);
    myForm.set("avatar", avatar);
    
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split('=')[1] : "/account"; 

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }

    if(isAuthenticated) {
        history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login-signup-toggle">
                  <p onClick={(e) => switchTab(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTab(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                <div className="loginEmail">
                  <MailOutlined />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenOutlined />
                  <input
                    type="password"
                    name=""
                    placeholder="Password"
                    value={loginPassword}
                    required
                    onChange={(e) => setLoginPassword(e.target.value)}
                    id=""
                  />
                </div>
                <Link to="/password/forgot">Forget password ? </Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceOutlined />
                  <input
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlined />
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={registerDataChange}
                    required
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenOutlined />
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={registerDataChange}
                    required
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
