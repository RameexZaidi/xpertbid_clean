import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { FaGoogle, FaApple } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    account_type: "",
    companyName: "",
    companyWebsite: "",
    occupation: "",
    dob: "",
    reason: "",
  });

  const [userRole, setUserRole] = useState(""); // seller or buyer
  const [validations, setValidations] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const { password } = formData;
    setValidations({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      digit: /\d/.test(password),
    });
  }, [formData.password]);

  const getStrengthPercentage = () => {
    const total = Object.values(validations).filter(Boolean).length;
    return (total / 4) * 100;
  };

  const getStrengthColor = () => {
    const score = getStrengthPercentage();
    if (score === 100) return "bg-success";
    if (score >= 50) return "bg-warning";
    return "bg-danger";
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlanSelect = (plan) => {
    setFormData((prev) => ({ ...prev, account_type: plan }));
  };

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        ...formData,
        role: userRole,
      });
      setMessage("Signup successful!");
      router.push(`/Verification-page?email=${formData.email}`);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message || err);
      setMessage("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "50px 0" }}>
        <div className="container">
          <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "720px" }}>
            {!showForm ? (
              <>
                <h2 className="text-center fw-bold mb-4 text-primary">Create Your Account</h2>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-outline-danger px-3 py-2" onClick={() => signIn("google")}> <FaGoogle className="me-2" /> Signup with Google </button>
                  <button className="btn btn-outline-dark px-3 py-2"> <FaApple className="me-2" /> Signup with iPhone </button>
                  <button className="btn text-white px-3 py-2" style={{ backgroundColor: "#43ACE9" }} onClick={() => setShowForm(true)}> Continue with Email </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-center fw-bold mb-4 text-primary">Complete Your Signup</h2>

                {/* Role Selection */}
                <div className="d-flex justify-content-between gap-3 mb-4">
                  {["seller", "buyer"].map((role) => (
                    <div
                      key={role}
                      className={`flex-fill text-center p-3 rounded-3 plan-box ${userRole === role ? "active" : ""}`}
                      onClick={() => setUserRole(role)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="fs-4 mb-2">{role === "seller" ? "🛒" : "🧍‍♂️"}</div>
                      <div className="fw-semibold text-capitalize">{role}</div>
                    </div>
                  ))}
                </div>

                {/* Selected Role Textbox */}
                <div className="mb-3">
                  <label className="form-label">Selected Role</label>
                  <input type="text" className="form-control" value={userRole.charAt(0).toUpperCase() + userRole.slice(1)} readOnly placeholder="Select a role" />
                </div>

                {/* Seller Plan Selection */}
                {userRole === "seller" && (
                  <>
                    <div className="d-flex justify-content-between gap-3 mb-4">
                      {["corporate", "individual", "free"].map((plan) => (
                        <div
                          key={plan}
                          className={`flex-fill text-center p-3 rounded-3 plan-box ${formData.account_type === plan ? "active" : ""}`}
                          onClick={() => handlePlanSelect(plan)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="fs-4 mb-2">
                            {plan === "corporate" && "🏢"}
                            {plan === "individual" && "👤"}
                            {plan === "free" && "🆓"}
                          </div>
                          <div className="fw-semibold text-capitalize">{plan}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Selected Plan</label>
                      <input type="text" className="form-control" value={formData.account_type} readOnly />
                    </div>
                  </>
                )}

                {/* Name & Email */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Full Name</label>
                    <input type="text" id="name" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email Address</label>
                    <input type="email" id="email" className="form-control" onChange={handleChange} />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" id="password" className="form-control" onChange={handleChange} />
                  <div className="progress mt-2" style={{ height: "8px" }}>
                    <div className={`progress-bar ${getStrengthColor()}`} role="progressbar" style={{ width: `${getStrengthPercentage()}%` }}></div>
                  </div>
                  <div className="d-flex flex-wrap gap-3 mt-2 small">
                    <span className={validations.length ? "text-success" : "text-secondary"}>8+ characters</span>
                    <span className={validations.upper ? "text-success" : "text-secondary"}>1 uppercase</span>
                    <span className={validations.lower ? "text-success" : "text-secondary"}>1 lowercase</span>
                    <span className={validations.digit ? "text-success" : "text-secondary"}>1 number</span>
                  </div>
                </div>

                {/* Seller Conditional Fields */}
                {userRole === "seller" && (
                  <>
                    {formData.account_type === "corporate" && (
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Company Name</label>
                          <input type="text" id="companyName" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Company Website</label>
                          <input type="text" id="companyWebsite" className="form-control" onChange={handleChange} />
                        </div>
                      </div>
                    )}
                    {formData.account_type === "individual" && (
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Occupation</label>
                          <input type="text" id="occupation" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label">Date of Birth</label>
                          <input type="date" id="dob" className="form-control" onChange={handleChange} />
                        </div>
                      </div>
                    )}
                    {formData.account_type === "free" && (
                      <div className="mb-3">
                        <label className="form-label">Why are you joining?</label>
                        <input type="text" id="reason" className="form-control" onChange={handleChange} />
                      </div>
                    )}
                  </>
                )}

                {message && <div className="alert alert-info mt-3">{message}</div>}

                <button className="btn w-100 mt-3 text-white" style={{ backgroundColor: "#0D6EFD" }} onClick={handleSignup} disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .plan-box {
          border: 1px solid #dee2e6;
          transition: all 0.3s ease;
        }
        .plan-box:hover {
          border-color: #0d6efd;
          background-color: #f0f8ff;
        }
        .plan-box.active {
          border-color: #0d6efd;
          background-color: #e7f1ff;
        }
        .form-control {
          border: 2px solid #495057 !important;
          border-radius: 0.375rem;
          box-shadow: none;
        }
        .form-control:focus {
          border-color: #0d6efd !important;
          box-shadow: 0 0 0 0.1rem rgba(13, 110, 253, 0.25);
        }
      `}</style>
    </>
  );
}
