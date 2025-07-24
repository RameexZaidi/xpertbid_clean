import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Seller_Account() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    companyName: "",
    companyWebsite: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    businessRegNo: "",
  });

  const [logo, setLogo] = useState(null);
  const [validations, setValidations] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Auto-generate username & password
  useEffect(() => {
    const trimmedName = formData.name.trim().replace(/\s+/g, "").toLowerCase();
    const trimmedCompany = formData.companyName.trim().replace(/\s+/g, "").toLowerCase();
    const autoUsername = `${trimmedCompany}_${trimmedName}`;
    const autoPassword = `${trimmedCompany}@123`;

    setFormData((prev) => ({
      ...prev,
      username: autoUsername,
      password: autoPassword,
    }));
  }, [formData.name, formData.companyName]);

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

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      payload.append("role", "seller");
      if (logo) payload.append("company_logo", logo);

      await axios.post("http://127.0.0.1:8000/api/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Registration successful!");
      router.push(`/Verification-page?email=${formData.email}`);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message || err);
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-light py-5">
        <div className="container">
          <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "100%" }}>
  <div className="text-center mb-4">
    <Image
      src="/assets/images/header-logo.png"
      alt="XpertBid Logo"
      width={180}
      height={60}
      priority
    />
  </div>

  <h2 className="text-center fw-bold text-primary mb-4">Seller Registration</h2>

  {/* Personal Info */}
  <h5 className="mb-3">Personal Information</h5>
  <div className="row">
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-user me-2"></i> Full Name</label>
      <input type="text" id="name" className="form-control" onChange={handleChange} placeholder="Fullname" />
    </div>
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-envelope me-2"></i> Email</label>
      <input type="email" id="email" className="form-control" onChange={handleChange} placeholder="Email" />
    </div>
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-phone me-2"></i> Phone</label>
      <input type="text" id="phone" className="form-control" onChange={handleChange} placeholder="Phone" />
    </div>
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-map-marker-alt me-2"></i> Address</label>
      <input type="text" id="address" className="form-control" onChange={handleChange} placeholder="Address" />
    </div>
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-city me-2"></i> City</label>
      <input type="text" id="city" className="form-control" onChange={handleChange} placeholder="City" />
    </div>
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-flag me-2"></i> Country</label>
      <input type="text" id="country" className="form-control" onChange={handleChange} placeholder="Country" />
    </div>
  </div>

  {/* Business Info */}
  <h5 className="mb-3 mt-4">Business Information</h5>
  <div className="row">
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-building me-2"></i> Company Name</label>
      <input type="text" id="companyName" className="form-control" onChange={handleChange} placeholder="Company Name" />
    </div>
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-globe me-2"></i> Company Website</label>
      <input type="text" id="companyWebsite" className="form-control" onChange={handleChange} placeholder="Company Website" />
    </div>
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-id-card me-2"></i> Business Registration No</label>
      <input type="text" id="businessRegNo" className="form-control" onChange={handleChange} placeholder="Business Registration No" />
    </div>
    <div className="mb-3 col-md-4">
      <label className="form-label"><i className="fas fa-image me-2"></i> Company Logo</label>
      <input type="file" accept="image/*" className="form-control" onChange={(e) => setLogo(e.target.files[0])} />
    </div>
  </div>

  {/* Username & Password */}
  <h5 className="mb-3 mt-4">Login Credentials</h5>
  <div className="row">
    <div className="mb-3 col-md-6">
      <label className="form-label"><i className="fas fa-user-tag me-2"></i> Username</label>
      <input type="text" id="username" className="form-control" value={formData.username} readOnly />
    </div>
    <div className="mb-3 col-md-6">
      <label className="form-label"><i className="fas fa-lock me-2"></i> Password</label>
      <input type="text" id="password" className="form-control" value={formData.password} readOnly />
    </div>
  </div>

  {/* Password strength */}
  <div className="mb-3">
    <div className="progress mt-1" style={{ height: "8px" }}>
      <div className={`progress-bar ${getStrengthColor()}`} role="progressbar" style={{ width: `${getStrengthPercentage()}%` }}></div>
    </div>
    <div className="d-flex flex-wrap gap-3 mt-2 small">
      <span className={validations.length ? "text-success" : "text-secondary"}>8+ characters</span>
      <span className={validations.upper ? "text-success" : "text-secondary"}>1 uppercase</span>
      <span className={validations.lower ? "text-success" : "text-secondary"}>1 lowercase</span>
      <span className={validations.digit ? "text-success" : "text-secondary"}>1 number</span>
    </div>
  </div>

  {message && <div className="alert alert-info mt-3">{message}</div>}

  <button className="sellnow  " onClick={handleSignup} disabled={loading}>
    {loading ? "Registering..." : "Register as Seller"}
  </button>
</div>

        </div>
      </div>

      <Footer />

      <style jsx>{`
        .form-control {
          border: 2px solid #495057 !important;
          border-radius: 0.375rem;
        }
        .form-control:focus {
          border-color: #0d6efd !important;
          box-shadow: 0 0 0 0.1rem rgba(13, 110, 253, 0.25);
        }
      `}</style>
    </>
  );
}
