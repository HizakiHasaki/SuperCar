import { useState } from "react";

import { Form, Modal, Navbar } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { interactData } from "~/functions/interactData";

import Swal from "sweetalert2";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { rootURL } from "~/data";

const cx = classNames.bind(styles);

function Header() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const registerURL = `${rootURL}/actions/register.php`;
  const loginURL = `${rootURL}/actions/login.php`;

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };
  const handleShowSignUp = () => {
    setShowSignUp(true);
    if (showLogIn) {
      setShowLogIn(false);
    }
  };

  const handleCloseLogIn = () => {
    setShowLogIn(false);
  };

  const handleShowLogIn = () => {
    setShowLogIn(true);
    if (showSignUp) {
      setShowSignUp(false);
    }
  };

  const handleChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const dataRegister = {
      email: emailValue,
      password: passwordValue,
    };

    console.log(dataRegister);

    interactData(registerURL, "POST", dataRegister, (data) => {
      if (data.message === "User was added successfully.") {
        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          text: "You have successfully signed up.",
          confirmButtonText: "OK",
        }).then(() => {
          handleShowLogIn();
        });
      }
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const dataLogin = {
      email: emailValue,
      password: passwordValue,
    };

    interactData(loginURL, "POST", dataLogin, (data) => {
      if (data.message === "Login successful") {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You have successfully logged in.",
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.setItem("user", JSON.stringify(data.userData));
          handleCloseLogIn();
        });
      }
    });
  };

  return (
    <header className={cx("header")}>
      <div className={cx("header-container")}>
        <Navbar.Brand href="/" className={cx("header-logo")}>
          <img
            src="https://img.freepik.com/premium-vector/yellow-super-car-vector-logo-template_530726-22.jpg?w=996"
            alt="Logo"
            className={cx("logo")}
          />
        </Navbar.Brand>
        <div className={cx("header-search")}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={cx("search-icon")}
          />
          <input
            className={cx("search-input")}
            placeholder="Search for cars...."
          />
        </div>
        <div className={cx("header-options")}>
          <Link to="/cart">
            <FontAwesomeIcon icon={faHeart} className={cx("option-wishlist")} />
          </Link>
          <button className={cx("sign-up__button")} onClick={handleShowSignUp}>
            <FontAwesomeIcon icon={faUser} className={cx("sign-up__icon")} />
            Sign Up
          </button>
        </div>
      </div>
      <Modal
        className={cx("modal-sign__up")}
        show={showSignUp}
        onHide={handleCloseSignUp}
        centered
      >
        <Modal.Body className={cx("modal-body")}>
          <h2 className={cx("sign-up__title")}>Sign Up</h2>
          <Form className={cx("sign-up__form")}>
            <Form.Group className={cx("form-group")} controlId="formBasicEmail">
              <Form.Label className={cx("form-label")}>Email </Form.Label>
              <Form.Control
                className={cx("form-input")}
                type="email"
                placeholder="Enter email"
                onChange={handleChangeEmail}
                value={emailValue}
              />
            </Form.Group>
            <Form.Group
              className={cx("form-group")}
              controlId="formBasicPassword"
            >
              <Form.Label className={cx("form-label")}>Password</Form.Label>
              <Form.Control
                className={cx("form-input")}
                type="password"
                placeholder="Password"
                onChange={handleChangePassword}
                value={passwordValue}
              />
            </Form.Group>
            <button
              type="submit"
              className={cx("sign-up__button")}
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </Form>
          <span className={cx("sign-up__text")}>
            Already a member?{" "}
            <span onClick={handleShowLogIn} className={cx("sign-up__link")}>
              Log In
            </span>
          </span>
        </Modal.Body>
      </Modal>
      <Modal
        className={cx("modal-log__in")}
        show={showLogIn}
        onHide={handleCloseLogIn}
        centered
      >
        <Modal.Body className={cx("modal-body")}>
          <h2 className={cx("sign-up__title")}>Log In</h2>
          <Form className={cx("sign-up__form")}>
            <Form.Group className={cx("form-group")} controlId="formBasicEmail">
              <Form.Label className={cx("form-label")}>Email </Form.Label>
              <Form.Control
                className={cx("form-input")}
                type="email"
                placeholder="Enter email"
                onChange={handleChangeEmail}
                value={emailValue}
              />
            </Form.Group>
            <Form.Group
              className={cx("form-group")}
              controlId="formBasicPassword"
            >
              <Form.Label className={cx("form-label")}>Password</Form.Label>
              <Form.Control
                className={cx("form-input")}
                type="password"
                placeholder="Password"
                onChange={handleChangePassword}
                value={passwordValue}
              />
            </Form.Group>
            <button className={cx("sign-up__button")} onClick={handleLogin}>
              Log In
            </button>
          </Form>
          <span className={cx("sign-up__text")}>
            Not a member yet?{" "}
            <span className={cx("sign-up__link")} onClick={handleShowSignUp}>
              Sign Up
            </span>
          </span>
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default Header;
