import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import ReCAPTCHA from "react-google-recaptcha";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
// import { auth } from "./firebase.config";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";


const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [recaptcha, setRecaptch] = useState(false)



  function onChange(value) {
    setRecaptch(true)
  }

  // function onCaptchVerify() {
  //   // if (!window.recaptchaVerifier) {
  //   //   window.recaptchaVerifier = new RecaptchaVerifier(
  //   //     "recaptcha-container",
  //   //     {
  //   //       size: "invisible",
  //   //       callback: (response) => {
  //   //         onSignup();
  //   //       },
  //   //       "expired-callback": () => { },
  //   //     },
  //   //     // auth
  //   //   );
  //   // }
  // }

  async function onSignup() {
    if (!recaptcha) {
      alert("Select reCAPTCHA")
      // If reCAPTCHA is not filled, prevent sending OTP
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/send/otp/', { number: ph });
      // Handle response
      if (response.data.type === "success") {
        setLoading(false);
        setShowOTP(true)
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setLoading(false);
    }


  }
  // onCaptchVerify();

  // const appVerifier = window.recaptchaVerifier;

  // const formatPh = "+" + ph;

  // signInWithPhoneNumber(formatPh, appVerifier)
  //   .then((confirmationResult) => {
  //     window.confirmationResult = confirmationResult;
  //     setLoading(false);
  //     setShowOTP(true);
  //     toast.success("OTP sended successfully!");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     setLoading(false);
  //   });
  // }

  async function onOTPVerify() {
    setLoading(true);
    try {
      const response = await axios.post('/verify/otp/', { otp: otp, number: ph });
      // Handle response
      console.log(response.data);
      if (response.data.type === "success") {
        alert("Mobile Number Verified successfully")
        // setUser(response.data);
        setLoading(false);
        setShowOTP(false)
        setPh("");
        setOtp("");
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setLoading(false);
    }

    // window.confirmationResult
    //   .confirm(otp)
    //   .then(async (res) => {
    //     console.log(res);
    //     setUser(res.user);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //   });
  }

  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {/* {user ? (
         
          <h2 style={{ textAlign: 'center', fontWeight: 'medium', fontSize: '1.25rem' }}>
            👍Login Success
          </h2>
        ) : ( */}
        <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '1rem', borderRadius: '0.5rem', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.3)', margin: 'auto' }}>
          {showOTP ? (
            <>
              <div style={{ backgroundColor: 'white', color: '#38a169', width: 'fit-content', margin: 'auto', padding: '1rem', borderRadius: '50%' }}>
                <BsFillShieldLockFill size={30} />
              </div>
              <label
                htmlFor="otp"
                style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}
              >
                Enter your OTP
                , sent out to {ph}.
              </label>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
              </div>
              <button
                onClick={onOTPVerify}
                style={{ backgroundColor: '#38a169', width: '100%', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', padding: '0.625rem 0', color: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}
              >
                {loading && (
                  <CgSpinner size={20} style={{ marginTop: '0.25rem', animation: 'spin 1s linear infinite' }} />
                )}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <div style={{ backgroundColor: 'white', color: '#38a169', width: 'fit-content', margin: 'auto', padding: '1rem', borderRadius: '50%' }}>
                <BsTelephoneFill size={30} />
              </div>
              <label
                htmlFor=""
                style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}
              >
                Verify Mobile Number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
              />
              <button
                disabled={!recaptcha}
                onClick={onSignup}
                style={{ backgroundColor: '#38a169', width: '100%', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', padding: '0.625rem 0', color: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}
              >
                {loading && (
                  <CgSpinner size={20} style={{ marginTop: '0.25rem', animation: 'spin 1s linear infinite' }} />
                )}
                <span>Send OTP</span>
              </button>
            </>

          )}
        </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default VerifyOtp;
