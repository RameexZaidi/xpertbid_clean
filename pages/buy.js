import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import swal from 'sweetalert';

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Rndn4AnAT1AOXNBi6QLbJVpXv7Q3tN0oFKKXbwD0RmrHKpsLfRQfccrDtOHcgJUi1Ycgrv2Kwg65Y5EAbHyJ0nA00HeM2C2e4"); // Replace with your Stripe key

const StripePaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleStripeSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      alert("Payment failed: " + error.message);
    } else {
      alert("Stripe Payment Success! Check console.");
      console.log("PaymentMethod", paymentMethod);
      onPaymentSuccess(paymentMethod); // Send to backend
    }
  };

  return (
    <form onSubmit={handleStripeSubmit} className="mt-3">
      <div className="mb-3">
        <label className="form-label">Card Details</label>
        <div className="form-control p-3">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
      </div>
      <button type="submit" className="btn btn-success">Pay Now</button>
    </form>
  );
};

export default function Buy() {
  const router = useRouter();
  const [plan, setPlan] = useState("");
  const [buyerType, setBuyerType] = useState("individual");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    cnic: "",
    email: "",
    phone: "",
    purpose: "",
    heard_from: "",
    company_name: ""
  });

  const selectedPlanName = {
    basic: "Basic",
    gold: "Gold",
    premium: "Premium",
  }[router.query.plan] || "";


  useEffect(() => {
    const queryPlan = router.query.plan;
    if (queryPlan) {
      setPlan(queryPlan);
      setShowPayment(queryPlan !== "basic");
    }
  }, [router.query.plan]);

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);
    setShowPayment(selectedPlan !== "basic");
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const submitToBackend = async (paymentData = null) => {
  const fullData = new FormData();
  fullData.append("plan", plan);
  fullData.append("buyer_type", buyerType);
  fullData.append("payment_method", paymentMethod);

  Object.entries(formData).forEach(([key, val]) => {
    fullData.append(key, val || "");
  });

  if (receiptFile) fullData.append("receipt", receiptFile);
  if (paymentData) fullData.append("stripe_payment_id", paymentData.id);

  try {
    const res = await fetch("http://localhost:8000/api/register-user", {
      method: "POST",
      body: fullData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      swal("Success", "Registration complete! Check your email.", "success")
        .then(() => {
          // 👇 Redirect to code verification page after clicking "OK"
          window.location.href = "/Verification-page";
        });
    } else {
      swal("Error", data.message || "Failed to register.", "error");
    }
  } catch (err) {
    console.error(err);
    swal("Error", "Something went wrong while submitting the form.", "error");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === "stripe") return;
    submitToBackend(); // For manual or basic plan
  };

  return (
    <>
      <Header />
      <div className="bg-light py-5">
        <div className="container">
          <div className="form-wrapper">
            <h2 className="text-center mb-4"> Select  Package {selectedPlanName && `(${selectedPlanName})`}</h2>

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                {!router.query.plan && (
                  <div className="col-md-4">
                    <label className="form-label">Select Package</label>
                    <select
                      className="form-select"
                      value={plan}
                      onChange={handlePlanChange}
                      required
                    >
                      <option value="">-- Choose a Plan --</option>
                      <option value="basic">Basic (Free)</option>
                      <option value="gold">Gold (PKR 2500/year)</option>
                      <option value="premium">Premium (PKR 5000/year)</option>
                    </select>
                  </div>
                )}
                <div className="col-md-4">
                  <label className="form-label">Buyer Type</label>
                  <select
                    className="form-select"
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    required
                  >
                    <option value="">-- Select Buyer Type --</option>
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    onChange={(e) => updateForm("first_name", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    onChange={(e) => updateForm("last_name", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">CNIC</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    onChange={(e) => updateForm("cnic", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    onChange={(e) => updateForm("email", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    onChange={(e) => updateForm("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">How Did You Hear About Us?</label>
                  <select
                    className="form-select form-select-lg"
                    onChange={(e) => updateForm("heard_from", e.target.value)}
                    required
                  >
                    <option value="">-- Select Source --</option>
                    <option value="google">Google</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="facebook">Facebook</option>
                    <option value="others">Others</option>
                  </select>
                </div>


                {buyerType === "corporate" && (
                  <div className="col-md-4">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      onChange={(e) => updateForm("company_name", e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Purpose of Joining</label>
                  <textarea
                    className="form-control form-control-lg"
                    rows="3"
                    onChange={(e) => updateForm("purpose", e.target.value)}
                    required
                  ></textarea>
                </div>
                
              </div>

              {showPayment && (
                <div className="border rounded p-4 mb-3 bg-white">
                  <h5 className="mb-3">Payment Method</h5>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="stripe"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={handlePaymentChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="stripe">
                      Pay with Stripe
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id="manual"
                      value="manual"
                      checked={paymentMethod === "manual"}
                      onChange={handlePaymentChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="manual">
                      Upload Payment Receipt
                    </label>
                  </div>

                  {paymentMethod === "manual" && (
                    <div>
                      <label className="form-label">Upload Receipt</label>
                      <input
                        type="file"
                        className="form-control form-control-lg"
                        accept="image/*,application/pdf"
                        onChange={(e) => setReceiptFile(e.target.files[0])}
                      />
                    </div>
                  )}

                  {paymentMethod === "stripe" && (
                    <Elements stripe={stripePromise}>
                      <StripePaymentForm onPaymentSuccess={submitToBackend} />
                    </Elements>
                  )}
                </div>
              )}

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary px-5 py-2">
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
  .form-wrapper {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  }

  .form-control,
  .form-select,
  .form-control-lg,
  .form-select-lg {
    border: 2px solid rgb(128, 132, 136); /* light gray border */
    border-radius: 8px;
    background-color: #f8f9fa;
    padding: 12px 15px;
    font-size: 16px;
    color: #212529;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .form-control:focus,
  .form-select:focus {
    border-color: #0d6efd;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
    background-color: #fff;
    outline: none;
  }

  label.form-label {
    font-weight: 600;
    color: #343a40;
    margin-bottom: 6px;
    display: inline-block;
  }

  .btn-primary {
    background-color: #0d6efd;
    border: none;
    padding: 12px 30px;
    font-weight: 600;
    border-radius: 6px;
  }

  .btn-primary:hover {
    background-color: #0b5ed7;
  }
`}</style>


      <Footer />
    </>
  );
}
