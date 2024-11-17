import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlilce";
import { getUserCart } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const productState = useSelector((state) => state?.product?.product);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      "ngrok-skip-browser-warning": "69420"
    },
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  const [productOpt, setProductOpt] = useState([]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    let category = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
      category.push(element.category);
    }
    setProductOpt(data);
    setCategories(category);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // State to manage the visibility of the scroll-to-top button
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on the scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Pham Anh Quoc - 20116325</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline: 
                <a className="text-white" href="tel:+84961869560" style={{textDecoration:"none"}}>
                  +84 961 869 560
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="/ " style={{textDecoration:"none"}}>
                  {/* <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} /> */}
                  Shoes Shop
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder="Search for Products here"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  {/* <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link> */}
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                    style={{textDecoration:"none"}}
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                    style={{textDecoration:"none"}}
                  >
                    <img src={user} alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Log in <br /> My Account
                      </p>
                    ) : (
                      <p className="mb-0">
                        Welcome {authState?.user?.firstname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                    style={{textDecoration:"none"}}
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">
                        {!cartState?.length ? 0 : total ? total.toLocaleString('vi-VN') : 0} ₫
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <div
                      className="btn btn-secondary bg-transparent border-0 gap-15 d-flex align-items-center"
                      id="dropdownMenuButton1"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shoes Shop
                      </span>
                    </div>

                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15" >
                    <NavLink to="/" style={{textDecoration:"none"}}>Home</NavLink>
                    <NavLink to="/product" style={{textDecoration:"none"}}>Our Store</NavLink>
                    <NavLink to="/my-orders" style={{textDecoration:"none"}}>My Orders</NavLink>
                    <NavLink to="/blogs" style={{textDecoration:"none"}}>Blogs</NavLink>
                    <NavLink to="/contact" style={{textDecoration:"none"}}>Contact</NavLink>
                    {authState?.user !== null ? (
                      <button
                        className="border border-0 bg-transparent text-white text-uppercase"
                        type="button"
                        style={{ backgroundColor: "#232f3e" }}
                        onClick={handleLogout}
                      >
                        LogOut
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "25px",
            backgroundColor: "#ff5a5a",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "24px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Header;
