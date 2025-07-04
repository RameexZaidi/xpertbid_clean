import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

SwiperCore.use([Autoplay]);

const AboutUs = () => {
  return (
    <>
      <Header />

      {/* about section */}
      <section className="py-5 bg-light about-bg-image about-bg-image-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="h1 mb-4">
                About <span style={{ color: "#43ACE9" }}>Xpert</span>
                <span style={{ color: "#333333" }}>Bid</span>
              </h2>
              <p className="mb-3 text-secondary">
                Built for Real Estate. Designed for Speed.
              </p>
              <p className="mb-3 text-secondary">
                XpertBid is an online auction platform created for landlords,
                developers, and businesses who want a simpler way to sell,
                lease, or buy property. From commercial plots and apartment
                buildings to vehicles and bulk stock, our goal is to make asset
                trading fast, transparent, and secure.
              </p>
              <p className="mb-3 text-secondary">
                We started with a single idea: to help people move property and
                stock more efficiently—without endless delays, agent fees, or
                confusing paperwork. Today, XpertBid connects sellers and buyers
                across Pakistan, the UAE, and other growing markets, giving them
                access to live bidding and escrow-secured transactions.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <img
                src="/assets/images/about_main.png"
                alt="About XpertBid"
                className="img-fluid rounded-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* mission/vision/what we do */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {/* Mission */}
            <div className="col-md-4">
              <div
                className="mission-card position-relative text-center"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Hover to see our Mission details"
              >
                <div className="icon-heading">
                  <i
                    className="bi bi-bullseye"
                    style={{ fontSize: "2rem", color: "#43ACE9" }}
                  ></i>
                  <h3 className="my-2">Our Mission</h3>
                </div>
                <div className="overlay-content">
                  <p>
                    To bring structure, speed, and trust to property and asset
                    trading in regions where traditional systems fall short.
                  </p>
                </div>
              </div>
            </div>
            {/* Vision */}
            <div className="col-md-4">
              <div
                className="mission-card position-relative text-center"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Hover to see our Vision details"
              >
                <div className="icon-heading">
                  <i
                    className="bi bi-eye"
                    style={{ fontSize: "2rem", color: "#43ACE9" }}
                  ></i>
                  <h3 className="my-2">Our Vision</h3>
                </div>
                <div className="overlay-content">
                  <p>
                    To become the leading digital auction platform across the
                    Middle East, South Asia, and emerging markets—where
                    individuals and businesses can trade confidently, access
                    broader markets, and unlock the full value of their assets.
                  </p>
                </div>
              </div>
            </div>
            {/* What We Do */}
            <div className="col-md-4">
              <div
                className="mission-card position-relative text-center"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Hover to see What We Do"
              >
                <div className="icon-heading">
                  <i
                    className="bi bi-lightning-charge"
                    style={{ fontSize: "2rem", color: "#43ACE9" }}
                  ></i>
                  <h3 className="my-2">What We Do</h3>
                </div>
                <div className="overlay-content">
                  <p>
                    We provide a digital auction platform focused on
                    real estate—residential, commercial, plots, and rentals—plus
                    vehicles, equipment, and inventory. Timed auctions,
                    KYC-verified buyers, escrow-secured payments, and an easy
                    dashboard create real opportunities for growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .mission-card {
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            position: relative;
            height: 320px;
            cursor: pointer;
          }
          .mission-card .overlay-content {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(67, 172, 233, 0.95);
            color: #fff;
            padding: 1.5rem;
            transition: top 0.4s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .mission-card:hover .overlay-content {
            top: 0;
          }
          .icon-heading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            transition: opacity 0.3s ease;
          }
          .mission-card:hover .icon-heading {
            opacity: 0;
          }
        `}</style>
      </section>

      {/* our story swiper */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1 mb-3">Our Story</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
              XpertBid was founded in response to a problem we saw across
              emerging markets: Sellers struggled with slow-moving inventory.
              Buyers couldn’t find verified deals. The process was manual,
              unorganised, and often untrustworthy. We built a digital platform
              to change that.
            </p>
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop
            autoplay={{ delay: 3000 }}
          >
            <SwiperSlide>
              <div className="card h-100 shadow-sm text-center p-4">
                <i className="bi bi-house-door-fill text-primary mb-3" style={{ fontSize: "2rem" }}></i>
                <h5>List Quickly</h5>
                <p className="text-secondary">List properties, vehicles, or stock in minutes.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card h-100 shadow-sm text-center p-4">
                <i className="bi bi-clipboard-check-fill text-success mb-3" style={{ fontSize: "2rem" }}></i>
                <h5>Set Your Terms</h5>
                <p className="text-secondary">Set your own terms and reserve prices.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card h-100 shadow-sm text-center p-4">
                <i className="bi bi-broadcast-pin text-warning mb-3" style={{ fontSize: "2rem" }}></i>
                <h5>Get Live Bids</h5>
                <p className="text-secondary">Receive live bids from verified buyers.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card h-100 shadow-sm text-center p-4">
                <i className="bi bi-shield-lock-fill text-danger mb-3" style={{ fontSize: "2rem" }}></i>
                <h5>Secure Deals</h5>
                <p className="text-secondary">Close deals securely through escrow.</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <style jsx>{`
            .card {
              border-radius: 12px;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .card:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }
          `}</style>
        </div>
      </section>

      {/* what we stand for */}
      <section
  className="py-5"
  style={{
    backgroundColor: "#E4F3FB",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
  }}
>
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="h1 mb-3">Our Reach</h2>
      <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
        Whether you're listing a warehouse in Karachi or bidding on equipment in
        Dubai, XpertBid gives you a better way to trade.
      </p>
    </div>
    <div className="row g-4">

      {/* Currently Active */}
      <div className="col-md-6">
        <div className="bg-white rounded shadow p-4 h-100">
          <h4 className="text-center mb-4">Currently Active</h4>
          <div className="row g-3 justify-content-center">
            {[
              {
                country: "Pakistan",
                flag: "https://flagcdn.com/w40/pk.png",
              },
              {
                country: "United Arab Emirates",
                flag: "https://flagcdn.com/w40/ae.png",
              },
            ].map((item, idx) => (
              <div className="col-6" key={idx}>
                <div className="card h-100 text-center border-0 shadow-sm p-3">
                  <img
                    src={item.flag}
                    alt={item.country}
                    style={{ width: "40px", marginBottom: "0.5rem" }}
                  />
                  <h6>{item.country}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Launching Soon */}
      <div className="col-md-6">
        <div className="bg-white rounded shadow p-4 h-100">
          <h4 className="text-center mb-4">Launching Soon</h4>
          <div className="row g-3 justify-content-center">
            {[
              {
                country: "Saudi Arabia",
                flag: "https://flagcdn.com/w40/sa.png",
              },
              {
                country: "China",
                flag: "https://flagcdn.com/w40/cn.png",
              },
              {
                country: "Africa",
                flag: "https://flagcdn.com/w40/za.png", // you can replace with a specific country
              },
            ].map((item, idx) => (
              <div className="col-4" key={idx}>
                <div className="card h-100 text-center border-0 shadow-sm p-3">
                  <img
                    src={item.flag}
                    alt={item.country}
                    style={{ width: "40px", marginBottom: "0.5rem" }}
                  />
                  <h6>{item.country}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="py-5 bg-light">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="h1 mb-4">What We Stand For</h2>
    </div>
    <div className="row g-4 justify-content-center">
      {/* Security */}
      <div className="col-md-4">
        <div className="card h-100 text-center border-0 shadow p-4">
          <i
            className="bi bi-shield-lock-fill mb-3"
            style={{ fontSize: "2.5rem", color: "#43ACE9" }}
          ></i>
          <h5>Security</h5>
          <p className="text-secondary">
            All transactions are protected by escrow. Funds are only released once everything checks out.
          </p>
        </div>
      </div>
      {/* Efficiency */}
      <div className="col-md-4">
        <div className="card h-100 text-center border-0 shadow p-4">
          <i
            className="bi bi-lightning-charge-fill mb-3"
            style={{ fontSize: "2.5rem", color: "#43ACE9" }}
          ></i>
          <h5>Efficiency</h5>
          <p className="text-secondary">
            Timed auctions and easy listings help sellers close deals quickly—no back and forth.
          </p>
        </div>
      </div>
      {/* Access */}
      <div className="col-md-4">
        <div className="card h-100 text-center border-0 shadow p-4">
          <i
            className="bi bi-universal-access mb-3"
            style={{ fontSize: "2.5rem", color: "#43ACE9" }}
          ></i>
          <h5>Access</h5>
          <p className="text-secondary">
            We make it easier for everyday sellers and regional businesses to reach verified buyers.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="py-5 bg-white">
  <div className="container text-center">
    <h2 className="h1 mb-4">Join Us</h2>
    <p className="text-secondary mb-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
      We’re building something practical and long-lasting—a platform that works for real people and real businesses. If you’ve got something to list, or you’re ready to explore new opportunities, we’re here to help you move forward.
    </p>
    <div className="row justify-content-center">
      <div className="col-md-3 mb-3 mb-md-0">
        <a href="/register" className="btn w-100 py-3" style={{ backgroundColor: "#43ACE9", color: "#fff" }}>
          Create an Account
        </a>
      </div>
      <div className="col-md-3 mb-3 mb-md-0">
        <a href="/contact" className="btn w-100 py-3" style={{ backgroundColor: "#43ACE9", color: "#fff" }}>
          Contact Our Team
        </a>
      </div>
      <div className="col-md-3">
        <a href="/auctions" className="btn w-100 py-3" style={{ backgroundColor: "#43ACE9", color: "#fff" }}>
          Browse Live Auctions
        </a>
      </div>
    </div>
  </div>
</section>

      
      <Footer />
    </>
  );
};

export default AboutUs;
