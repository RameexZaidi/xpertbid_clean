import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { FaEnvelopeOpenText } from "react-icons/fa";

export default function VerifyCodeForm() {
  const router = useRouter();
  const { email } = router.query;

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://127.0.0.1:8000/api/verify-code", {
        email,
        code,
      });
      setMessage("✅ Verification successful! Redirecting...");
      setTimeout(() => router.push("/userDashboard"), 2000);
    } catch (err) {
      setMessage("❌ Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/resend-code", { email });
      setResendMessage("✅ Verification code resent to your email.");
    } catch (err) {
      setResendMessage("❌ Failed to resend code.");
    }
  };

  const handleEditEmail = () => {
    router.push("/signup");
  };

  return (
    <>
      <Header />

      <div style={{ background: "#f0f4f8", minHeight: "100vh", padding: "60px 0" }}>
        <div className="container">
          <div
            className="card shadow-lg border-0 rounded-4 p-5 mx-auto animate-fade-in"
            style={{ maxWidth: "520px", background: "#ffffff" }}
          >
            <div className="text-center mb-4">
              <FaEnvelopeOpenText size={40} className="text-primary mb-2" />
              <h3 className="fw-bold text-primary">Verify Your Email</h3>
              <p className="text-muted small">
                We’ve sent a 6-digit verification code to <br />
                <strong>{email}</strong>
              </p>
            </div>

            <div className="mb-4">
              <label className="form-label">Enter Verification Code</label>
             <input
                    type="text"
                    className="form-control form-control-lg"
                    style={{
                        border: "2px solid rgb(13, 13, 14)",
                        borderRadius: "0.5rem",
                        padding: "12px",
                        backgroundColor: "#fff",      // ✅ Ensures visibility
                        color: "#000",                // ✅ Ensures text is visible
                    }}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. 123456"
                    />

            </div>

            {message && (
              <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}>
                {message}
              </div>
            )}

            <button
              className="btn btn-primary w-100 py-2 mb-3"
              onClick={handleVerify}
              disabled={loading || code.trim() === ""}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>

            <div className="d-flex justify-content-between small text-muted">
              <button className="btn btn-link p-0 text-decoration-none" onClick={handleResend}>
                🔄 Resend Code
              </button>
              <button className="btn btn-link p-0 text-decoration-none" onClick={handleEditEmail}>
                ✏️ Edit Email
              </button>
            </div>

            {resendMessage && (
              <div className="alert alert-info mt-3">{resendMessage}</div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
