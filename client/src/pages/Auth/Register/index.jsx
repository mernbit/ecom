import React, { useState } from "react";
import {
  GoogleOutlined,
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Divider, message } from "antd";
import axios from "axios";
const initState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [state, setState] = useState(initState);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { firstName, lastName, email, phone, password, confirmPassword } =
      state;
    if (!firstName) return message.error("First Name is required");
    if (!lastName) return message.error("Last Name is required");
    if (!email) return message.error("Email is required");
    if (!phone) return message.error("Phone Number is required");
    if (!password) return message.error("Password is required");
    if (!confirmPassword) return message.error("Confirm Password is required");
    if (password !== confirmPassword)
      return message.error("Passwords do not match");
    if (!image) return message.error("Profile Picture is required");
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    phone = phone.trim();

    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("profileImage", image);

    console.log("Sending request");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        formData,
      );
      console.log(res);
    } catch (error) {
      console.error(error);
      message.error(res.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 relative">
        <img
          src="/auth.jpg"
          alt="auth banner"
          className="h-screen select-none brightness-50 w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 pl-14 pb-12">
          <p className="py-1 text-white uppercase text-7xl barlow-condensed-extrabold">
            join the
          </p>
          <p className="py-1 text-white uppercase text-7xl barlow-condensed-extrabold">
            community
          </p>
          <p className="py-1 mb-5 text-red-500 uppercase text-7xl barlow-condensed-extrabold">
            today
          </p>
          <p className="text-white/50">
            Free account. No credit card required. <br />
            Browse without signup.
          </p>
        </div>
      </div>
      <div className="pt-12 px-12">
        <div className="flex gap-2 items-center">
          <div className="bg-red-500 h-px w-8"></div>
          <p className="uppercase tracking-[2px] text-sm barlow-condensed-semibold text-black/80">
            create account
          </p>
        </div>
        <div className="mt-6">
          <h1 className="uppercase text-4xl barlow-condensed-extrabold">
            register
          </h1>
        </div>
        {/* Form */}
        <div className="mt-8">
          <div className="bg-black/5 border border-black/10 p-3 flex gap-3">
            <div className="w-20 h-20 border border-black/30 flex justify-center items-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserOutlined className="text-5xl! text-black/80!" />
              )}
            </div>
            <div>
              <button
                onClick={() => document.getElementById("photoInput").click()}
                className="border border-black/30 py-0.5 px-2 text-black barlow-condensed-regular tracking-wider cursor-pointer"
              >
                <UploadOutlined /> Upload Photo
              </button>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                  }
                }}
                type="file"
                accept="image/*"
                id="photoInput"
                className="hidden"
              />
              {image == null ? (
                <p className="text-black/50 barlow-condensed-regular text-sm mt-2">
                  JPG or PNG. Max size: 5MB
                </p>
              ) : (
                <p className="text-black/50 barlow-condensed-regular text-sm mt-2">
                  {image.name}
                </p>
              )}
            </div>
          </div>
          <form className="mt-5">
            <div className="barlow-condensed-semibold">
              <div className="flex gap-4 my-3">
                <div className="">
                  <label
                    className="block text-sm tracking-wider uppercase"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="mt-1 bg-black/5 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                    type="text"
                    name="firstName"
                    autoComplete="off"
                    id="firstName"
                    placeholder="First Name"
                    value={state.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label
                    className="block text-sm tracking-wider uppercase"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="mt-1 bg-black/5 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                    type="text"
                    name="lastName"
                    autoComplete="off"
                    id="lastName"
                    placeholder="Last Name"
                    value={state.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-3">
                <label
                  className="block text-sm tracking-wider uppercase"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mt-1 bg-black/5 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="email"
                  name="email"
                  autoComplete="off"
                  id="email"
                  placeholder="Email"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <label
                  className="block text-sm tracking-wider uppercase"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="mt-1 bg-black/5 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={state.phone}
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log(value);
                    e.target.value = value.replace(/[^\d]/g, "");
                    handleChange(e);
                  }}
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                />
              </div>
              <div className="my-2">
                <label
                  className="block text-sm tracking-wider uppercase"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="mt-1 bg-black/5 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="password"
                  value={state.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="my-2">
                <label
                  className="block text-sm tracking-wider uppercase"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="mt-1 bg-black/5 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="password"
                  value={state.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="mt-4">
                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="bg-red-500 cursor-pointer disabled:cursor-progress w-full py-3 text-white"
                >
                  {loading ? <LoadingOutlined /> : "Register"}
                </button>
                <p className="mt-2 tracking-wide text-center text-lg barlow-condensed-regular">
                  Already have an account?{" "}
                  <Link
                    className="text-red-500 font-bold underline"
                    to="/auth/login"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
            <Divider
              // style={{ borderColor: "#222222" }}
              className="border-black/50!"
            >
              <span className="barlow-condensed-semibold text-base text-black/50">
                OR
              </span>
            </Divider>
            <div>
              <button
                // onClick={handleGoogleLogin}
                className="border w-full border-black/30 py-3 text-black barlow-condensed-regular tracking-wider cursor-pointer"
              >
                <GoogleOutlined /> Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
