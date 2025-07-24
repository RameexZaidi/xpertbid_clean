import React from 'react';
import Image from 'next/image';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <>
      <Header />

      {/* =============== Hero Banner =============== */}
      <section className="py-5 text-white" style={{ background: '#43ACE9' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1 className="display-4 fw-bold mb-3">Let’s Talk</h1>
              <p className="fs-5">
                Questions? We're Here to Help.<br/>
                Whether you're looking to list your first property, need support with bidding, 
                or simply want to know more about how XpertBid works — our team is ready to assist.
              </p>
            </div>
            <div className="col-md-5 text-center">
              <Image
                src="/assets/images/about_main.png"
                alt="Support Image"
                width={500}
                height={350}
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =============== Get in Touch Section =============== */}
      <section
        className="py-5 text-dark"
        style={{
          backgroundColor: '#E4F3FB',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")'
        }}
      >
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Get in Touch</h2>
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="border rounded-4 p-4 shadow bg-white h-100">
                <h5 className="fw-bold mb-2">Email</h5>
                <p className="mb-0">For general enquiries and support:</p>
                <a href="mailto:support@expertbid.com" className="fw-semibold text-decoration-none text-primary">
                  support@expertbid.com
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded-4 p-4 shadow bg-white h-100">
                <h5 className="fw-bold mb-2">Phone</h5>
                <p className="mb-0">Customer Service:</p>
                <p className="mb-0">🇺🇸 +1 818-787-3393</p>
                <p className="mb-0">🇦🇪 +971-XXX-XXXX</p>
                <p className="mb-0">🇵🇰 +92-XXX-XXXXXXX</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded-4 p-4 shadow bg-white h-100">
                <h5 className="fw-bold mb-2">Offices</h5>
                <p className="mb-0">Dubai, UAE</p>
                <p className="mb-0">Karachi, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== Enquiry Form Section =============== */}
           {/* =============== Enquiry Form Section =============== */}
      <section
        className="py-5"
        style={{
          backgroundColor: '#F8F9FA',
          borderTop: '1px solid #dee2e6'
        }}
      >
        <div className="container-fluid px-0">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="bg-white rounded-4 shadow p-5 mx-2 mx-md-0">
                <h3 className="fw-bold mb-3 text-primary text-center">
                  Questions? We're Here to Help.
                </h3>
                <p className="text-center text-muted mb-4">
                  Prefer to write to us directly? Use the form below and we’ll be in touch shortly.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =============== Need Help With? Section =============== */}
      <section
  className="py-5 border-top"
  style={{
    backgroundColor: "#E4F3FB",
    backgroundImage: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
  }}
>
  <div className="container">
    <h3 className="fw-bold text-center mb-5">Need Help With?</h3>
    <div className="row g-4">
      {[
        {
          icon: "fa-home",
          title: "Listing or managing your property",
        },
        {
          icon: "fa-user-check",
          title: "Bidding or account verification",
        },
        {
          icon: "fa-handshake",
          title: "Escrow payments or transaction updates",
        },
        {
          icon: "fa-cogs",
          title: "Technical issues or login assistance",
        },
        {
          icon: "fa-briefcase",
          title: "Business partnerships or onboarding",
        },
      ].map((item, idx) => (
        <div className="col-md-6 col-lg-4" key={idx}>
          <div className="card h-100 border-0 shadow-sm p-4">
            <i
              className={`fas ${item.icon} fa-2x mb-3`}
              style={{ color: "#43ACE9" }}
            ></i>
            <h5 className="fw-semibold text-dark">{item.title}</h5>
            <p className="text-muted small mb-0">
              Just send us a message — we'll get back to you within 1 working day.
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      <Footer />
    </>
  );
};

export default Contact;
