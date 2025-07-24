import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Accordion from "react-bootstrap/Accordion"; // bootstrap accordion
import "bootstrap/dist/css/bootstrap.min.css";

const Faqs = () => {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">FREQUENTLY ASKED QUESTIONS</h1>
          <p className="text-secondary fs-5">
            Everything You Need to Know Before You List, Bid, or Buy
          </p>
        </div>
      </section>

      {/* SELLING SECTION */}
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
          <h2 className="fw-bold text-center mb-4">Selling on XpertBid</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What can I list on XpertBid?</Accordion.Header>
              <Accordion.Body>
                You can list properties (for sale or lease), vehicles, equipment, and bulk inventory. Additional categories will be added soon.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How do I create a listing?</Accordion.Header>
              <Accordion.Body>
                Simply go to the <a href="/sell-now">Sell Now</a> page, fill out the form, upload your images, and submit. Our team will review and approve your listing before it goes live.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Can I set a minimum price?</Accordion.Header>
              <Accordion.Body>
                Yes, you can set a reserve price to ensure the item doesn't sell below your desired value.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Do I need to pay to list?</Accordion.Header>
              <Accordion.Body>
                Listing is currently free. Optional features like boosted placements may be available later.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>How do I get paid?</Accordion.Header>
              <Accordion.Body>
                Payments are held in escrow and released once the transaction is completed and confirmed by both parties.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      {/* BUYING SECTION */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Buying & Bidding</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do I start bidding?</Accordion.Header>
              <Accordion.Body>
                Create a free account, complete your verification, and place a refundable deposit to unlock bidding access.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What happens if I win an auction?</Accordion.Header>
              <Accordion.Body>
                If you win, your deposit goes toward the payment. Funds are held securely until the seller completes the handover.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Can I cancel a bid?</Accordion.Header>
              <Accordion.Body>
                Bids are binding for the duration of the auction. Please place bids carefully.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What if the item doesn’t meet my expectations?</Accordion.Header>
              <Accordion.Body>
                If there's a dispute, our support team will assist you. Escrow payments won’t be released until both sides are satisfied.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      {/* ESCROW SECTION */}
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
          <h2 className="fw-bold text-center mb-4">Escrow & Security</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How does escrow work?</Accordion.Header>
              <Accordion.Body>
                When a buyer wins, their payment is held by XpertBid. The seller only receives it once the buyer confirms completion.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Is my information secure?</Accordion.Header>
              <Accordion.Body>
                Yes. All user data is encrypted and protected. We also require KYC verification to ensure trusted transactions.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What is KYC and why is it required?</Accordion.Header>
              <Accordion.Body>
                KYC (Know Your Customer) is a basic identity verification process that helps prevent fraud and unauthorised activity on the platform.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      {/* GENERAL QUESTIONS */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">General Questions</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Where is XpertBid available?</Accordion.Header>
              <Accordion.Body>
                We are currently active in Pakistan and the UAE, with Saudi Arabia, China, and Africa launching soon.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Can I use XpertBid on mobile?</Accordion.Header>
              <Accordion.Body>
                Yes, the platform is fully mobile-friendly. A dedicated app is in development.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>I need help. Who can I contact?</Accordion.Header>
              <Accordion.Body>
                Reach us any time at <a href="mailto:support@xpertbid.com">support@xpertbid.com</a> or visit our <a href="/contact">Contact Page</a>.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Faqs;
