import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                Address : 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh. <br />
                </address>
                <a
                  href="tel:+84 961869560"
                  className="mt-3 d-block mb-1 text-white"
                  style={{textDecoration:"none"}}
                >
                  +84 961 869 560
                </a>
                <a
                  href="mailto:devjariwala8444@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                  style={{textDecoration:"none"}}
                >
                  it2022ute@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1" style={{textDecoration:"none"}}>
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1" style={{textDecoration:"none"}}>
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1" style={{textDecoration:"none"}}>
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1" style={{textDecoration:"none"}}>
                  Terms & Conditions
                </Link>
                <Link className="text-white py-2 mb-1" style={{textDecoration:"none"}}>Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1" style={{textDecoration:"none"}}>About Us</Link>
                <Link className="text-white py-2 mb-1" style={{textDecoration:"none"}}>Faq</Link>
                <Link className="text-white py-2 mb-1" style={{textDecoration:"none"}}>Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1" style={{textDecoration:"none"}}>Nike</Link>
                <Link className="text-white py-2 mb-1" style={{textDecoration:"none"}}>Adidas</Link>
                <Link className="text-white py-2 mb-1" style={{textDecoration:"none"}}>Reebok</Link>
                <Link className="text-white py-2 mb-1" style={{textDecoration:"none"}}>New Balance</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}: Powered by Pham Anh Quoc
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
