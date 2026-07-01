import React, { useRef } from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
const Register = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 relative">
        <img
          src="/auth.jpg"
          alt="auth banner"
          className="h-screen brightness-50 w-full object-cover"
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
      <div className="pt-16 px-16">
        <div className="flex gap-2 items-center">
          <div className="bg-red-500 h-px w-8"></div>
          <p className="uppercase tracking-[2px] text-sm barlow-condensed-semibold text-black/50">
            create account
          </p>
        </div>
        <div className="mt-8">
          <h1 className="uppercase text-4xl barlow-condensed-extrabold">
            register
          </h1>
        </div>
        {/* Form */}
        <div className="mt-10">
          <div className="bg-black/5 border border-black/10 p-3 flex gap-3">
            <div className="w-20 h-20 border border-black/30 flex justify-center items-center">
              <UserOutlined className="text-5xl! text-black/80!" />
            </div>
            <div>
              <button className="border border-black/30 py-0.5 px-2 text-black barlow-condensed-regular tracking-wider cursor-pointer">
                <UploadOutlined /> Upload Photo
              </button>
              <p className="text-black/50 barlow-condensed-regular text-sm mt-2">
                JPG or PNG. Max size: 5MB
              </p>
            </div>
          </div>
          <div className="mt-5">
            <form className="barlow-condensed-semibold">
              <div className="my-2">
                <label
                  className="block text-sm tracking-wider uppercase"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="mt-1 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="my-2">
                <label
                  className="block text-sm tracking-wider uppercase"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="mt-1 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                />
              </div>
              <div className="my-2">
                <label
                  className="block text-sm tracking-wider uppercase"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mt-1 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
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
                  className="mt-1 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log(value);
                    e.target.value = value.replace(/[^\d]/g, "");
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
                  className="mt-1 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="password"
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
                  className="mt-1 w-full h-12 px-3 placeholder:tracking-wider outline-0 border border-black/20"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="mt-5">
                <button className="bg-red-500 w-full py-3 text-white">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
