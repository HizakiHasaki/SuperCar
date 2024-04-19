import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { rootURL } from "~/data";
import { interactData } from "~/functions/interactData";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
const cx = classNames.bind(styles);

function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const productDetailURL = `${rootURL}/api/ProductDetail.php`;
  const addToCartURL = `${rootURL}/actions/addToWishlist.php`;

  const handleAddToWishlist = () => {
    const data = {
      userID: 1,
      carID: id,
    };
    interactData(addToCartURL, "POST", data, (data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    interactData(`${productDetailURL}?productID=${id}`, "GET", null, (data) => {
      setProduct(data);
    });
  }, [productDetailURL, id]);

  return (
    <div className={cx("product-detail")}>
      <Row className={cx("product-container")}>
        <Col lg={5} className={cx("product-image")}>
          <img src={product.Image} alt={product.Name} className={cx("image")} />
        </Col>
        <Col lg={7} className={cx("product-info")}>
          <div className={cx("info-header")}>
            <h1 className={cx("name")}>{product.Name}</h1>
            <p className={cx("price")}>${product.Price}</p>
          </div>
          <p className={cx("country")}>{product.Country}</p>
          <p className={cx("description-title")}>DESCRIPTION</p>
          <p className={cx("description")}>{product.Description}</p>
          <div className={cx("actions")}>
            <button className={cx("buy")}>CONTACT AGENT</button>
            <button className={cx("wishlist")} onClick={handleAddToWishlist}>
              <FontAwesomeIcon icon={faHeart} className={cx("wishlist-icon")} />
              WISHLIST
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
