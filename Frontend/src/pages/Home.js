import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlilce";
import ReactStars from "react-rating-stars-component";
import { addToWishlist } from "../features/products/productSlilce";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getblogs();
    getProducts();
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="images/banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/banner-2.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/banner-3.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                  
                />
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/banner-4.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="images/banner-5.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                          <img
                            src={wish}
                            alt="wishlist"
                            onClick={(e) => {
                              addToWish(item?._id);
                            }}
                          />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          alt="product image"
                          height={"250px"}
                          width={"260px"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                        <img
                          src={item?.images[0]?.url}
                          alt="product image"
                          height={"250px"}
                          width={"260px"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="price">
                          {item?.price ? (item.price).toLocaleString('vi-VN') : 0}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price ? (item.price).toLocaleString('vi-VN') : 0}
                    img={item?.images[0].url}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                          <img
                            src={wish}
                            alt="wishlist"
                            onClick={(e) => {
                              addToWish(item?._id);
                            }}
                          />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0].url}
                          alt="product image"
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                        <img
                          src={item?.images[0].url}
                          alt="product image"
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="price">
                          {item?.price ? (item.price).toLocaleString('vi-VN') : 0}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img style={{height:"150px",width:"150px"}} src="images/brand-1.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img style={{height:"150px",width:"150px"}} src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img style={{height:"150px",width:"150px"}} src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img style={{height:"150px",width:"150px"}} src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img style={{height:"150px",width:"150px"}} src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img style={{height:"150px",width:"150px"}} src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img style={{height:"150px",width:"150px"}} src="images/brand-07.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState &&
            blogState?.map((item, index) => {
              if (index < 4) {
                return (
                  <div className="col-3 " key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
