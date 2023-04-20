import React, { useEffect, useState } from "react";
import Branding from "../components/Branding";
import SignupLoginSVG from "../components/SignupLoginSVG";
import { signup } from "../helpers/api_helper";

const initSignupForm = {
  name: "",
  role: "trader",
  email: "",
  password: "",
  password_confirmation: "",
};

const Signup = () => {
  const [signupForm, setSignupform] = useState(initSignupForm);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSignupform({ ...signupForm, [name]: value });
  };

  const handleSignup = async () => {
    const signupAction = await signup(signupForm);

    if (signupAction.status === 200) {
      console.log("success", signupAction);
    } else {
      console.log("error", signupAction);
    }
  };

  useEffect(() => {
    console.log(signupForm);
  }, [signupForm]);

  return (
    <div className="min-w-screen min-h-screen bg-custom-yellow flex items-center justify-center px-5 py-5">
      <Branding />
      <div className="text-gray-500 rounded-3xl shadow-xl w-3/4 border-[1px] border-custom-cyan overflow-hidden backdrop-blur-sm z-20">
        <div className="md:flex w-full">
          <SignupLoginSVG />

          <div className="w-full md:w-1/2 py-10 px-5 md:px-10 ">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5 backdrop-blur-sm">
                  <label htmlFor="" className="text-xs font-semibold px-1">
                    Name
                  </label>
                  <div className="flex ">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-black outline-none focus:border-custom-cyan text-custom-red"
                      placeholder="V"
                      name="name"
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="" className="text-xs font-semibold px-1">
                    Account Type
                  </label>
                  <div className="flex text-xs ">
                    <input
                      id="trader"
                      className="peer/trader hidden"
                      type="radio"
                      name="role"
                      value="trader"
                      onChange={handleFormChange}
                      checked={signupForm.role === "trader"}
                    />
                    <label
                      htmlFor="trader"
                      className="w-1/2 cursor-pointer peer-checked/trader:bg-custom-red py-3 grow text-white bg-gray-400 rounded-l-lg text-center"
                    >
                      TRADER
                    </label>

                    <input
                      id="admin"
                      className="peer/admin hidden"
                      type="radio"
                      name="role"
                      value="admin"
                      onChange={handleFormChange}
                      checked={signupForm.role === "admin"}
                    />
                    <label
                      htmlFor="admin"
                      className="w-1/2 cursor-pointer peer-checked/admin:bg-custom-red py-3 grow text-white bg-gray-400 rounded-r-lg text-center"
                    >
                      ADMIN
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="" className="text-xs font-semibold px-1">
                    Email
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-black outline-none focus:border-custom-cyan text-custom-red"
                      placeholder="v.nightcity@cyberpunk.com"
                      name="email"
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="" className="text-xs font-semibold px-1">
                    Password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75zM6.157 5.739a.75.75 0 01.21 1.04A6.715 6.715 0 005.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 01-1.27-.8A6.715 6.715 0 003.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 011.04-.211zM12 7.5a3 3 0 00-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 11-1.112-1.008A10.459 10.459 0 007.5 10.5a4.5 4.5 0 119 0c0 .547-.022 1.09-.067 1.626a.75.75 0 01-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 00-3-3zm0 2.25a.75.75 0 01.75.75A15.69 15.69 0 018.97 20.738a.75.75 0 01-1.14-.975A14.19 14.19 0 0011.25 10.5a.75.75 0 01.75-.75zm3.239 5.183a.75.75 0 01.515.927 19.415 19.415 0 01-2.585 5.544.75.75 0 11-1.243-.84 17.912 17.912 0 002.386-5.116.75.75 0 01.927-.515z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-black outline-none focus:border-custom-cyan text-custom-red"
                      placeholder="************"
                      name="password"
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label htmlFor="" className="text-xs font-semibold px-1">
                    Confirm Password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75zM6.157 5.739a.75.75 0 01.21 1.04A6.715 6.715 0 005.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 01-1.27-.8A6.715 6.715 0 003.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 011.04-.211zM12 7.5a3 3 0 00-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 11-1.112-1.008A10.459 10.459 0 007.5 10.5a4.5 4.5 0 119 0c0 .547-.022 1.09-.067 1.626a.75.75 0 01-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 00-3-3zm0 2.25a.75.75 0 01.75.75A15.69 15.69 0 018.97 20.738a.75.75 0 01-1.14-.975A14.19 14.19 0 0011.25 10.5a.75.75 0 01.75-.75zm3.239 5.183a.75.75 0 01.515.927 19.415 19.415 0 01-2.585 5.544.75.75 0 11-1.243-.84 17.912 17.912 0 002.386-5.116.75.75 0 01.927-.515z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-black outline-none focus:border-custom-cyan text-custom-red"
                      placeholder="************"
                      name="password_confirmation"
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col -mx-3">
                <div className="w-full px-3 mb-3">
                  <button
                    className="block w-full max-w-xs mx-auto bg-custom-red hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold"
                    onClick={handleSignup}
                  >
                    REGISTER NOW
                  </button>
                </div>
                <span className="text-xs mx-auto cursor-pointer">
                  Already have an account? Login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
