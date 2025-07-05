import React, { useState } from "react";
import axios from "axios";
import SuccessPopup from "@/components/SuccessPopup"; // adjust the path if needed
import ErrorPopup from "@/components/ErrorPopup"; // adjust the path if needed

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState("");
  const [successPopupSubMessage, setSuccessPopupSubMessage] = useState("");

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState("");
  const [errorPopupSubMessage, setErrorPopupSubMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setShowSuccessPopup(false);
    setShowErrorPopup(false);

    try {
      const response = await axios.post(
        "https://admin.xpertbid.com/api/contact",
        formData
      );
      setSuccessPopupMessage(response.data.message || "Message sent successfully!");
      setSuccessPopupSubMessage("");
      setShowSuccessPopup(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const combinedErrors = Object.values(error.response.data.errors)
          .flat()
          .join(" ");
        setErrorPopupMessage(combinedErrors);
      } else {
        setErrorPopupMessage("Something went wrong. Please try again.");
      }
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="container py-12">
      <div className="row">
        {/* LEFT SIDE INFORMATION */}
       

        {/* RIGHT SIDE FORM */}
        <div className="col-md-12">
          <div className="ms-md-auto contact-form shadow-lg ">
            <h2 className="fw-bolder my-4">Fill up form</h2>

            {showSuccessPopup && (
              <SuccessPopup
                isOpen={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                message={successPopupMessage}
                subMessage={successPopupSubMessage}
              />
            )}

            {showErrorPopup && (
              <ErrorPopup
                isOpen={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                message={errorPopupMessage}
                subMessage={errorPopupSubMessage}
              />
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="ps-4"
                  required
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="ps-4"
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type="number"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="ps-4"
                  required
                />
                {errors.subject && <p className="error">{errors.subject}</p>}
              </div>
              <div>
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="ps-4"
                  required
                />
                {errors.message && <p className="error">{errors.message}</p>}
              </div>
              <div className="text-center">
                <button type="submit" className="py-4">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
