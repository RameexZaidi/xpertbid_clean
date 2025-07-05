import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ correct way
import "swiper/css";

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
     <section
  className="py-5 mission-section"
>
  <div className="container">
    <div className="row g-4">
      {[
        {
          icon: "bi-bullseye",
          title: "Our Mission",
          content:
            "To bring structure, speed, and trust to property and asset trading in regions where traditional systems fall short.",
        },
        {
          icon: "bi-eye",
          title: "Our Vision",
          content:
            "To become the leading digital auction platform across the Middle East, South Asia, and emerging markets—where individuals and businesses can trade confidently, access broader markets, and unlock the full value of their assets.",
        },
        {
          icon: "bi-lightning-charge",
          title: "What We Do",
          content:
            "We provide a digital auction platform focused on real estate—residential, commercial, plots, and rentals—plus vehicles, equipment, and inventory. Timed auctions, KYC-verified buyers, escrow-secured payments, and an easy dashboard create real opportunities for growth.",
        },
      ].map((item, idx) => (
        <div className="col-md-4" key={idx}>
          <div
            className="mission-card position-relative text-center"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={`Hover to see ${item.title}`}
          >
            <div className="icon-heading">
              <i
                className={`bi ${item.icon}`}
                style={{ fontSize: "2rem", color: "#43ACE9" }}
              ></i>
              <h3 className="my-2">{item.title}</h3>
            </div>
            <div className="overlay-content">
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style jsx>{`
    .mission-section {
      background-color: #E4F3FB;
      background-image: url("https://www.transparenttextures.com/patterns/concrete-wall.png");
      background-attachment: fixed;
      background-position: center center;
    }
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
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[
              {
                icon: "bi-house-door-fill",
                color: "primary",
                title: "List Quickly",
                desc: "List properties, vehicles, or stock in minutes.",
              },
              {
                icon: "bi-clipboard-check-fill",
                color: "success",
                title: "Set Your Terms",
                desc: "Set your own terms and reserve prices.",
              },
              {
                icon: "bi-broadcast-pin",
                color: "warning",
                title: "Get Live Bids",
                desc: "Receive live bids from verified buyers.",
              },
              {
                icon: "bi-shield-lock-fill",
                color: "danger",
                title: "Secure Deals",
                desc: "Close deals securely through escrow.",
              },
            ].map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="card h-100 shadow-sm text-center p-4">
                  <i
                    className={`bi ${item.icon} text-${item.color} mb-3`}
                    style={{ fontSize: "2rem" }}
                  ></i>
                  <h5>{item.title}</h5>
                  <p className="text-secondary">{item.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
              Whether you're listing a warehouse in Karachi or bidding on
              equipment in Dubai, XpertBid gives you a better way to trade.
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
                      flag: "https://flagcdn.com/w40/za.png",
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

      {/* join us */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="h1 mb-4">Join Us</h2>
          <p
            className="text-secondary mb-5"
            style={{ maxWidth: "700px", margin: "0 auto" }}
          >
            We’re building something practical and long-lasting—a platform that
            works for real people and real businesses. If you’ve got something
            to list, or you’re ready to explore new opportunities, we’re here to
            help you move forward.
          </p>
          <div className="row justify-content-center">
            {[
              { text: "Create an Account", link: "/register" },
              { text: "Contact Our Team", link: "/contact" },
              { text: "Browse Live Auctions", link: "/auctions" },
            ].map((item, idx) => (
              <div className="col-md-3 mb-3 mb-md-0" key={idx}>
                <a
                  href={item.link}
                  className="btn w-100 py-3"
                  style={{ backgroundColor: "#43ACE9", color: "#fff" }}
                >
                  {item.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
