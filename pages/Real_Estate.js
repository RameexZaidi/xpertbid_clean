import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const Real_Estate = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h1 className="mb-4">
            Sell, Lease, or Bid on Property — the Smarter Way
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
            Whether you're a landlord, developer, or investor, <span>
  <span style={{ color: "#43ACE9" }}>Xpert</span>
  <span style={{ color: "#333333" }}>Bid</span>
</span>
 gives you a
            streamlined way to list, lease, or purchase property through secure,
            timed auctions. No agents. No delays. Just verified buyers and
            competitive offers.
          </p>
        </div>
      </section>

      {/* Why Use <span>
  <span style={{ color: "#43ACE9" }}>Xpert</span>
  <span style={{ color: "#333333" }}>Bid</span>
</span>
 */}
      <section
        className="py-5"
        style={{
          backgroundColor: "#E4F3FB",
          backgroundImage: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center"
        }}
      >
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="h1">Why Use <span>
  <span style={{ color: "#43ACE9" }}>Xpert</span>
  <span style={{ color: "#333333" }}>Bid </span>
</span>
  for Real Estate?</h2>
            <p className="text-secondary mt-2">
              Traditional property deals are slow, uncertain, and often tied up in negotiations.
              <span>
  <span style={{ color: "#43ACE9" }}>Xpert</span>
  <span style={{ color: "#333333" }}>Bid</span>
</span>
 simplifies the process and puts you in control.
            </p>
          </div>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 3 }
            }}
          >
            {[
              "Set your own reserve price",
              "List in minutes — no agent needed",
              "Bidders are verified through KYC",
              "Funds are held securely through escrow",
              "Results are often faster than conventional sales"
            ].map((text, idx) => (
              <SwiperSlide key={idx}>
                <div className="card h-100 p-4 shadow text-center">
                  <h5>{text}</h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* What Can You List */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1">What Can You List?</h2>
            <p className="text-secondary">
              All listings are visible to a wide pool of verified buyers across Pakistan,
              the UAE, and other emerging markets.
            </p>
          </div>
          <div className="row g-4">
            {[
              { icon: "bi-building", text: "Commercial spaces (shops, offices, warehouses)" },
              { icon: "bi-house-door", text: "Residential units (flats, villas, buildings)" },
              { icon: "bi-map", text: "Land and plots" },
              { icon: "bi-key", text: "Rental properties (monthly or yearly lease options)" }
            ].map((item, idx) => (
              <div className="col-md-3" key={idx}>
                <div
                  className="card h-100 text-center p-4 shadow wow fadeInUp"
                  data-wow-delay={`${idx * 0.2}s`}
                >
                  <i className={`bi ${item.icon} mb-3`} style={{ fontSize: "2rem", color: "#43ACE9" }}></i>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1">How It Works</h2>
          </div>
          <div className="row g-4">
            {[
              {
                title: "Create Your Listing",
                text: "Upload the property details, images, and documents. Set your auction duration and reserve price."
              },
              {
                title: "Buyers Place Bids",
                text: "Once the auction goes live, verified users can place bids in real time. You can view activity and interest throughout."
              },
              {
                title: "Accept the Best Offer",
                text: "When the auction closes, you choose whether to accept the highest bid. If accepted, the buyer’s funds are held in escrow."
              },
              {
                title: "Complete the Deal",
                text: "Documents are finalised and the property is handed over. Funds are released only after both parties confirm the transaction."
              }
            ].map((step, idx) => (
              <div className="col-md-3" key={idx}>
                <div className="card h-100 p-4 text-center shadow-sm">
                  <h4>{idx + 1}</h4>
                  <h5 className="mt-2">{step.title}</h5>
                  <p className="text-secondary">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy + Who Can Use */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <h3>Why Buy Through <span>
  <span style={{ color: "#43ACE9" }}>Xpert</span>
  <span style={{ color: "#333333" }}>Bid</span>
</span>
?</h3>
              <ul className="text-secondary mt-3">
                <li>View verified property details and documents before bidding</li>
                <li>Bid at your own pace within set auction timelines</li>
                <li>Your deposit is refundable if your bid doesn’t win</li>
                <li>All transactions are secured through escrow</li>
                <li>Avoid lengthy negotiations and hidden fees</li>
                <li>Real-time bidding, track auction activity, and set your own limits</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h3>Who Can Use It?</h3>
              <ul className="text-secondary mt-3">
                <li>Landlords looking to lease out units directly</li>
                <li>Developers ready to sell properties without broker fees</li>
                <li>Investors seeking fair deals through a competitive process</li>
                <li>Businesses with commercial real estate to offload</li>
                <li>Agents who want to maximise reach and close faster</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Real_Estate;
