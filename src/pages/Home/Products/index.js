import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { interactData } from "~/functions/interactData";
import { rootURL } from "~/data";

import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
const cx = classNames.bind(styles);

function Products() {
  const [products, setProducts] = useState([]);
  const [makes, setMakes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState(6);
  const [selectedMake, setSelectedMake] = useState(null);
  const [title, setTitle] = useState("All Cars");
  // const [filteredProducts, setFilteredProducts] = useState([products]);

  const productsURL = `${rootURL}/api/Products.php`;

  useEffect(() => {
    interactData(productsURL, "GET", null, (data) => {
      setProducts(data.products);
      setMakes(data.makes);
      setCountries(data.countries);
      setTotalProducts(data.totalProducts);
    });
  }, [productsURL]);

  const filterByMake = (makeID) => {
    setSelectedMake(makeID);
    setTitle(makes.find((make) => make.ID === makeID).Name);
    setTotalProducts(
      products.filter((product) => product.MakeID === makeID).length
    );
  };

  const filteredProducts = selectedMake
    ? products.filter((product) => product.MakeID === selectedMake)
    : products;

  return (
    <div className={cx("products")}>
      <div className={cx("filter")}>
        <div className={cx("filter-container")}>
          <button className={cx("filter-button")}>
            Filter
            <FontAwesomeIcon icon={faFilter} className={cx("filter-icon")} />
          </button>
          <Dropdown>
            <Dropdown.Toggle
              className={cx("filter-dropdown", { active: selectedMake })}
              id="dropdown-makes"
            >
              {selectedMake
                ? makes.find((make) => make.ID === selectedMake).Name
                : "All Makes"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {makes.map((make) => (
                <Dropdown.Item
                  key={make.ID}
                  className={cx("dropdown-item")}
                  href={`#/make/${make.ID}`}
                  onClick={() => filterByMake(make.ID)}
                >
                  {make.Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={cx("filter-dropdown")}
              id="dropdown-countries"
            >
              All Countries
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {countries.map((country) => (
                <Dropdown.Item
                  key={country.ID}
                  className={cx("dropdown-item")}
                  href={`#/country/${country.ID}`}
                >
                  {country.Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className={cx("products-container")}>
        <h1 className={cx("products-title")}>{title}</h1>
        <div className={cx("products-sort")}>
          <span className={cx("car-count")}>{totalProducts} cars</span>
          <span className={cx("sort")}>Sort: Premium</span>
        </div>
        <ul className={cx("products-list")}>
          {filteredProducts.slice(0, displayedProducts).map((product) => (
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
                    icon={faHeart}
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
      <div className={cx("more-container")}>
        <button
          className={cx("load-more")}
          onClick={() => setDisplayedProducts(displayedProducts + 30)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
