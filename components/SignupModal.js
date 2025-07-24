import  { useState , useEffect} from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useGoogleLogin } from '@react-oauth/google';
import Link from "next/link";


const SignupModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState("step1");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    countryCode: "+1",
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  // const [passwordStrength, setPasswordStrength] = useState({
  //   length: false,
  //   uppercase: false,
  //   lowercase: false,
  //   number: false,
  // });
  // Resend Code State
          const [showValidation, setShowValidation] = useState(false);
       const [validations, setValidations] = useState({
    lower: false,
    upper: false,
    number: false,
    length: false,
  });

    // update validations whenever password changes
  useEffect(() => {
    setValidations({
      lower: /[a-z]/.test(formData.password),
      upper: /[A-Z]/.test(formData.password),
      number: /\d/.test(formData.password),
      length: formData.password.length >= 8,
    });
  }, [formData.password]);
  const rules = [
    { key: "lower", label: "At least one lowercase letter" },
    { key: "upper", label: "At least one uppercase letter" },
    { key: "number", label: "At least one number" },
    { key: "length", label: "Minimum 8 characters" },
  ];
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const closeHandler = () => {
    onClose();
    setActiveStep("step1");
    setFormData({
      email: "",
      password: "",
      phone: "",
      countryCode: "+1",
    });
    
    setErrorMessage("");
    setVerificationCode("");
    setSuccessMessage("");
    setIsResendDisabled(false);
    setResendTimer(60);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const registerWithEmail = async () => {
    if (!formData.name ||!formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        // `http://127.0.0.1:8000/api/register`,
        `http://127.0.0.1:8000/api/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      setSuccessMessage("Registration successful! Sending verification code...");
      await sendVerificationCode();
    } catch (error) {
      //sconsole.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  const verifyCode = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        //`http://127.0.0.1:8000/api/verify-code`,
          `http://127.0.0.1:8000/api/verify-code`,

        {
          email: formData.email,
          code: verificationCode,
        }
      );

      setSuccessMessage("Verification successful! Logging you in...");
      await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      router.push("/userDashboard");
    } catch (error) {
      setErrorMessage("Invalid verification code. Please try again.",error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async () => {
    try {
      await axios.post(
        //`http://127.0.0.1:8000/api/send-verification-code`,
        `http://127.0.0.1:8000/api/send-verification-code`,
        { email: formData.email }
      );
      setSuccessMessage("Verification code sent to your email.");
      handleStepChange("verifyCode");
    } catch (error) {
      setErrorMessage("Failed to send verification code. Please try again.",error);
    }
  };

  // Resend Code Functionality
  const handleResendCode = async () => {
    try {
      setIsResendDisabled(true);
      setResendTimer(60);

      await axios.post(
        //`http://127.0.0.1:8000/api/send-verification-code`,
        `http://127.0.0.1:8000/api/send-verification-code`,

        { email: formData.email }
      );

      setSuccessMessage("Verification code resent to your email.");

      // Start countdown timer
      const timerInterval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timerInterval);
            setIsResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setErrorMessage("Failed to resend verification code. Try again.", error);
      setIsResendDisabled(false);
    }
  };
  // const togglePasswordVisibility = () => {
  //   setPasswordVisible((prev) => !prev);
  // };
  const registerWithPhone = async () => {
    if (!formData.name || !formData.phone) {
      setErrorMessage("Name and phone number are required.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register-phone`,
        {
          name: formData.name,
          phone: `${formData.countryCode}${formData.phone}`,
        }
      );
      setSuccessMessage(
        "Registration successful! Please verify the OTP sent to your phone."
      );
      handleStepChange("otpVerification");
    } catch {
      setErrorMessage("An error occurred during phone registration.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginWithGoogleTap = useGoogleLogin({
    flow: "implicit",
    onSuccess: async resp => {
      console.log("Google response:", resp);
      const accessToken = resp?.access_token;
      if (!accessToken) {
        console.error("No access_token returned:", resp);
        return;
      }

      const result = await signIn("google-tap", {
        token:    accessToken,
        redirect: false,
      });

      if (result?.error) {
        console.error("Google-tap signIn error:", result.error);
      } else {
        router.push("/userDashboard");
      }
    },
    onError: err => {
      console.error("Google Tap failed:", err);
    },
  });
  
  const handleAppleSignUp = async () => {
    try {
      const result = await signIn("apple", { redirect: false });
      if (result?.error) {
        setErrorMessage("Apple Sign-Up failed. Please try again.");
      } else {
        setSuccessMessage("Apple Sign-Up successful!");
        handleStepChange("success");
        router.push("/userDashboard");
      }
    } catch {
      setErrorMessage("An error occurred during Apple Sign-Up.");
    }
  };

  if (!isOpen) return null;
  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }
    setFormData({ ...formData, password: generatedPassword });
  };


  return (
    <div
      id="SignupModal"
      className="modal signupModal loginModal"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="loginModal-content">
        <span id="closeLoginModal" className="close-btn" onClick={closeHandler}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {activeStep === "step1" && (
          <div id="loginStep" className=" login-form-step active ms-auto" style={{backgroudColor:"transparent"}}>
            <h3 className="pop-head mb-3">Sign Up</h3>
            <hr></hr>
            <button onClick={() => loginWithGoogleTap()} className="loginContinueIcon mt-4 ms-auto">
              <img src="/assets/images/googleLogo.svg" alt="Google Logo" />
              Continue with Google
            </button>
            <button className="loginContinueIcon ms-auto" onClick={handleAppleSignUp}>
              <img src="/assets/images/appleLogo.svg" alt="Apple Logo" />
              Continue with Apple
            </button>
            <button
              className="loginContinueIcon ms-auto "
              onClick={() => handleStepChange("emailSignup")}
            >
              <img src="/assets/images/smsLogo.svg" alt="Email Logo" />
              Sign Up with Email
            </button>
           <p className="loginp mt-3"> By continue, I agree to ExpertBid 
          <span className="logina"><Link href="./Terms_Conditions"> Terms of service </Link></span>
           and 
            <span className="logina">
            <Link href="./Privacy_Policy" > privacy policy. </Link></span></p>
          </div>
          
        )}

{activeStep === "emailSignup" && (
        <div id="loginEmail" className="login-form-step">
  <div className="d-flex justify-content-center step-heading-and-back">
    <button
      id="backPhoneLogin"
      className="d-block ms-0"
      onClick={() => handleStepChange("step1")}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
    <h3>Sign Up with Email</h3>
  </div>

  <h3 className="pop-head text-start mb-4 ms-2">Continue with Email</h3>

  <input
    type="text"
    id="name"
    className="pop-"
    placeholder="Enter your name here"
    value={formData.name}
    onChange={handleInputChange}
  />
  <input
    type="email"
    id="email"
    placeholder="Enter your email here"
    value={formData.email}
    onChange={handleInputChange}
  />

  {/* Tier Selection */}
  <div className="tier-section mt-4">
    <h5 className="pop-head text-start mb-3 ms-2">Choose Your Tier</h5>
    <div className="d-flex gap-3 flex-wrap justify-content-start ms-2">
      {["corporate", "individual", "free"].map((tier) => (
        <label
          key={tier}
          className={`p-3 rounded border flex-fill text-center ${
            formData.tier === tier ? "border-primary bg-light" : "border-secondary"
          }`}
          style={{ cursor: "pointer", minWidth: "130px" }}
        >
          <input
            type="radio"
            name="tier"
            value={tier}
            checked={formData.tier === tier}
            onChange={handleInputChange}
            className="d-none"
          />
          <strong>{tier.charAt(0).toUpperCase() + tier.slice(1)}</strong>
          <p className="small text-muted mb-0">
            {tier === "corporate"
              ? "Business teams"
              : tier === "individual"
              ? "Personal use"
              : "Basic plan"}
          </p>
        </label>
      ))}
    </div>
  </div>

  {/* Conditional Form Fields Based on Tier */}
  <div className="tier-form-fields mt-3 ms-2">
    {formData.tier === "corporate" && (
      <>
        <input
          type="text"
          placeholder="Company Name"
          value={formData.companyName || ""}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Company Website"
          value={formData.companyWebsite || ""}
          onChange={(e) =>
            setFormData({ ...formData, companyWebsite: e.target.value })
          }
          className="form-control mb-2"
        />
      </>
    )}

    {formData.tier === "individual" && (
      <>
        <input
          type="text"
          placeholder="Your Occupation"
          value={formData.occupation || ""}
          onChange={(e) =>
            setFormData({ ...formData, occupation: e.target.value })
          }
          className="form-control mb-2"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.dob || ""}
          onChange={(e) =>
            setFormData({ ...formData, dob: e.target.value })
          }
          className="form-control mb-2"
        />
      </>
    )}

    {formData.tier === "free" && (
      <>
        <input
          type="text"
          placeholder="Reason for Joining"
          value={formData.reason || ""}
          onChange={(e) =>
            setFormData({ ...formData, reason: e.target.value })
          }
          className="form-control mb-2"
        />
      </>
    )}
  </div>

  {/* Password Field */}
  <div className="password-field">
    <input
      type={passwordVisible ? "text" : "password"}
      id="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={(e) => {
        handleInputChange(e);
        if (!showValidation) setShowValidation(true);
      }}
      required
      style={styles.input}
    />
    <button
      type="button"
      className="toggle-password"
      onClick={() => setPasswordVisible(!passwordVisible)}
    >
      {/* Eye Icon here - you already have it */}
      {passwordVisible ? (
        <span>👁️</span>
      ) : (
        <span>🙈</span>
      )}
    </button>
  </div>

  {/* Error Message */}
  {errorMessage && (
    <p className="alert-message text-start">{errorMessage}</p>
  )}

  {/* Password Rules */}
  <div style={{ marginTop: 16 }}>
    <ul className="mb-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {rules.map(({ key, label }) => {
        const passed = validations[key];
        const itemStyle = !showValidation
          ? styles.defaultItem
          : passed
          ? styles.validItem
          : styles.invalidItem;

        return (
          <li key={key} style={itemStyle}>
            {/* Status Icon */}
            <span className="me-2">
              {!showValidation ? "🟡" : passed ? "✅" : "❌"}
            </span>
            <span>{label}</span>
          </li>
        );
      })}
    </ul>
  </div>

  {/* Generate Password */}
  <div className="">
    <button
      type="button"
      className="form-button-1 ms-auto mb-1 text-decoration-none"
      onClick={generatePassword}
    >
      Generate Password
    </button>
  </div>

  {/* Submit Button */}
  <button
    className="form-button-1 ms-auto"
    onClick={registerWithEmail}
    disabled={isLoading}
  >
    {isLoading ? "Registering..." : "Submit"}
  </button>
</div>

        )}
   {/* Step: Verify Email */}
   {activeStep === "verifyCode" && (
          <div id="loginEmail" className="login-form-step">
            <button className="d-block ms-1" onClick={() => handleStepChange("step1")}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h3 className="pop-head text-start my-3 mt-5">Verify Email</h3>
            <p className="liss text-start mb-5" style={{fontSize:"16px"}}>A verification code has been sent to your email. Please enter it below:</p>

            <input
              type="text"
              id="verificationCode"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            {errorMessage && <p className="alert-message">{errorMessage}</p>}

            {/* Resend Code Section */}
            <div className="resend-code-container">
              <button className=" mb-1 form-button-1 ms-auto" onClick={handleResendCode} disabled={isResendDisabled}>
                {isResendDisabled ? `Resend in ${resendTimer}s` : "Resend Code"}
              </button>
            </div>

            <button className="form-button-1 ms-auto" onClick={verifyCode} disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        )}






        {activeStep === "phoneSignup" && (
          <div id="loginStep2" className="login-form-step">
            <div className="d-flex justify-content-center step-heading-and-back">
              <button
                id="backPhoneLogin"
                onClick={() => handleStepChange("Step1")}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <h3>Sign Up with Phone</h3>
            </div>

            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <select
              value={formData.countryCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  countryCode: e.target.value,
                }))
              }
            >
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
              <option value="+91">+91 India</option>
              <option value="+92">+92 PK</option>
            </select>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errorMessage && <p className="alert-message ">{errorMessage}</p>}
            <button
              className="form-button-1 "
              onClick={registerWithPhone}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Submit"}
            </button>
          </div>
        )}

        {activeStep === "success" && (
          <div className="form-step">
            <span id="closeLoginModal" className="close-btn" onClick={closeHandler}>
          <i className="fa-solid fa-xmark"></i>
        </span>
            {/* <h3>Registration Complete Please login.</h3> */}
            <br></br>
            {successMessage ? (
              <h4 className="alert alert-success" style={{ fontWeight: "bold", marginTop: "10px" }}>{successMessage}</h4>
            ) : (
              <h4 className="alert alert-danger" style={{ fontWeight: "bold", marginTop: "10px" }}>{errorMessage}</h4>
            )}
          
          </div>
        )}
      </div>
      {/* CSS for styling the strength indicators */}
      <style jsx>{`
        .password-strength p {
          font-size: 14px;
          margin: 5px 0;
        }
        .valid {
          color: green;
        }
        .invalid {
          color: red;
        }
      `}</style>
    </div>
  );
};
const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    paddingRight: "40px",     // make room for the icon
  },
  eyeBtn: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },// …your existing styles…
  defaultItem: {
    display: "flex",
    alignItems: "center",
    borderRadius: "6px",
    marginBottom: "8px",
    color: "#999",
  },
  defaultIcon: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    marginRight: "8px",
  },
  validItem: {
    display: "flex",
    alignItems: "center",
    borderRadius: "6px",
    marginBottom: "8px",
    color: "#12D18E",
  },
  invalidItem: {
    display: "flex",
    alignItems: "center",
    borderRadius: "6px",
    marginBottom: "8px",
    color: "#FF4242",
  },
  icon: {
    marginRight: "8px",
  },
  invalidCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    backgroundColor: "#FF4242",
    borderRadius: "50%",
    marginRight: "8px",
  },
};

export default SignupModal;
