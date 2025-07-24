// pages/pricing.js
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Pricing() {
  return (
    <>
      <Header />

      <div className="pricing-container">
        <h1 className="text-center mb-2">Our Pricing Plans For Buyers</h1>
        <p className="text-center tagline">
          These are our packages – choose the one that fits your needs!
        </p>

        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="card basic">
            <h2>Basic (Free)</h2>
            <p>✅ Open access to the marketplace</p>
            <p>✅ 1000 PKR / 10 million credit</p>
           <a href="/buy?plan=basic" className="buy-btn">Buy Now</a>
          </div>

          {/* Gold Plan */}
          <div className="card gold">
            <h2>Gold (PKR 2500 / Year)</h2>
            <p>✅ 24-hour early access</p>
            <p>✅ 12 million credit / year</p>
            <a href="/buy?plan=gold" className="buy-btn">Buy Now</a>
          </div>

          {/* Premium Plan */}
          <div className="card premium">
            <h2>Premium (PKR 5000 / Year)</h2>
            <p>✅ 48-hour early access</p>
            <p>✅ 30 million credit / year</p>
            <a href="/buy?plan=premium" className="buy-btn">Buy Now</a>
          </div>
        </div>
      </div>

      <Footer />

      {/* Styles */}
      <style jsx>{`
        .pricing-container {
          padding: 60px 20px;
          background: #f9f9f9;
          min-height: 100vh;
        }

        .text-center {
          text-align: center;
        }

        .tagline {
          font-size: 16px;
          color: #555;
          margin-bottom: 40px;
        }

        .pricing-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
        }

        .card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 30px;
          width: 300px;
          text-align: center;
        }

        .card h2 {
          margin-bottom: 20px;
          color: #333;
        }

        .card p {
          font-size: 16px;
          margin: 10px 0;
        }

        .basic {
          border-top: 5px solid #3498db;
        }

        .gold {
          border-top: 5px solid #f1c40f;
        }

        .premium {
          border-top: 5px solid #e67e22;
        }

        .buy-btn {
          margin-top: 20px;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        .buy-btn:hover {
          background-color: #0056b3;
        }

        @media (max-width: 768px) {
          .pricing-grid {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}
