import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useEffect, useState } from "react";
import { rootURL } from "~/data";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { interactData } from "~/functions/interactData";
const cx = classNames.bind(styles);

function Cart() {
  const [products, setProducts] = useState([]);

  const cartURL = `${rootURL}/api/Cart.php`;

  useEffect(() => {
    interactData(cartURL, "GET", null, setProducts);
  }, [cartURL]);
  return (
    <div className={cx("cart")}>
      <div className={cx("cart-header")}>
        <h1 className={cx("title")}>WISHLIST</h1>
        <span className={cx("remove")}>REMOVE ALL</span>
      </div>
      <div className={cx("cart-body")}>
        <ul className={cx("products-list")}>
          {products.map((product) => (
            <li
              lg={4} // 6 items per row
              key={product.ID}
              className={cx("product-item")}
            >
              <Link
                to={`/product/${product.ID}`}
                className={cx("product-link")}
              >
                <img
                  src={product.Image}
                  alt={product.Name}
                  className={cx("product-img")}
                  loading="lazy" // lazy load images
                  decoding="async" // async decoding for better performance
                />
                <div className={cx("add-wishlist")}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={cx("wishlist-icon")}
                  />
                </div>
                <div className={cx("product-info")}>
                  <p className={cx("product-price")}>${product.Price}</p>
                  <p className={cx("product-name")}>{product.Name}</p>
                  <p className={cx("product-country")}>{product.Country}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cart;
