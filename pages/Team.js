import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  return (
    <>
      <Header />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1 mb-3">Meet Our Team</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="row g-0 align-items-center">
                  <div className="col-4 text-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Ali Abdul Karim"
                      className="img-fluid rounded-circle m-3"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h4 className="card-title">Ali Abdul Karim — Co-Founder</h4>
                      <p className="card-text text-secondary">
                        Ali holds a degree in Economics from the University of Indianapolis and has spent over 8 years building and managing fast-growing e-commerce ventures. His practical mindset and deep industry knowledge shape XpertBid’s commitment to secure, transparent trading.
                      </p>
                      <p className="card-text text-secondary">
                        Ali is passionate about designing digital tools that help everyday sellers reach genuine buyers, unlock fair value, and grow their businesses with confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="row g-0 align-items-center">
                  <div className="col-4 text-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                      alt="Haniya Yasin Dhedhi"
                      className="img-fluid rounded-circle m-3"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h4 className="card-title">Haniya Yasin Dhedhi — Co-Founder</h4>
                      <p className="card-text text-secondary">
                        Haniya is an experienced lawyer and an Accredited Civil/Commercial Mediator. She earned her LLB from the University of London and is registered with the Sindh District Court.
                      </p>
                      <p className="card-text text-secondary">
                        Alongside her work as a legal advisor, she has organised national and international mediation programmes and consulted on cross-border trade and policy.
                      </p>
                      <p className="card-text text-secondary">
                        Haniya’s vision is to build a marketplace where real estate transactions are accessible, trustworthy, and free from hidden barriers for everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
