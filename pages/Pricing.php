// pages/pricing.js
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Pricing() {
  return (
    <>
      <Header />

      <div className="pricing-container">
        <h1 className="text-center mb-5">Our Pricing Plans</h1>

        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="card basic">
            <h2>Basic (Free)</h2>
            <p>✅ Open Access to Marketplace</p>
            <p>✅ 1000 PKR / 10 Million Credit</p>
          </div>

          {/* Gold Plan */}
          <div className="card gold">
            <h2>Gold (PKR 2500 / Year)</h2>
            <p>✅ 24 Hour Early Access</p>
            <p>✅ 12 Million Credit / Year</p>
          </div>

          {/* Premium Plan */}
          <div className="card premium">
            <h2>Premium (PKR 5000 / Year)</h2>
            <p>✅ 48 Hour Early Access</p>
            <p>✅ 30 Million Credit / Year</p>
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

        .text-center {
          text-align: center;
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
