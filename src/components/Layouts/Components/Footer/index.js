import { Col, Row } from "react-bootstrap";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx("footer")}>
      <Row className={cx("footer-header")}>
        <Col lg={3}>
          <h3 className={cx("footer-title")}>SUPER CAR</h3>
          <ul className={cx("footer-list")}>
            <li className={cx("footer-item")}>About</li>
            <li className={cx("footer-item")}>Contact</li>
            <li className={cx("footer-item")}>Careers</li>
            <li className={cx("footer-item")}>Help & FAQ</li>
            <li className={cx("footer-item")}>Terms</li>
            <li className={cx("footer-item")}>Privacy</li>
          </ul>
        </Col>
        <Col lg={3}>
          <h3 className={cx("footer-title")}>CATEGORIES</h3>
          <ul className={cx("footer-list")}>
            <li className={cx("footer-item")}>Real Estate</li>
            <li className={cx("footer-item")}>Cars</li>
            <li className={cx("footer-item")}>Yachts</li>
            <li className={cx("footer-item")}>Jets</li>
            <li className={cx("footer-item")}>Helicopter</li>
            <li className={cx("footer-item")}>Watches</li>
          </ul>
        </Col>
        <Col lg={3}>
          <h3 className={cx("footer-title")}>CATALOG</h3>
          <ul className={cx("footer-list")}>
            <li className={cx("footer-item")}>All Brands</li>
            <li className={cx("footer-item")}>All Business</li>
          </ul>
        </Col>
        <Col lg={3}>
          <h3 className={cx("footer-title")}>FOR BUSINESS</h3>
          <ul className={cx("footer-list")}>
            <li className={cx("footer-item")}>Sell With Us</li>
            <li className={cx("footer-item")}>Partner</li>
            <li className={cx("footer-item")}>Linking</li>
          </ul>
        </Col>
      </Row>
      <div className={cx("footer-footer")}>
        <span className={cx("footer-content")}>
          © 2024 Super Car. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
