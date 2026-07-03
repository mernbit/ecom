import React, { useState } from "react";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Divider, message } from "antd";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import Button from "../../../components/ui/Button";
const initState = {
  email: "",
  password: "",
};

const Login = () => {
  const [state, setState] = useState(initState);
  const [loading, setLoading] = useState(false);
  const { fetchUser } = useAuthContext();
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { email, password } = state;
    if (!email) return message.error("Email is required");
    if (!password) return message.error("Password is required");
    email = email.trim();

    let formData = {
      email,
      password,
    };
    console.log("Sending request");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        formData,
      );
      console.log(res);
      localStorage.setItem("authToken", res.data.token);
      message.success("Login successful");
    } catch (error) {
      console.error(error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    fetchUser();
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
            Your
          </p>
          <p className="py-1 text-white uppercase text-7xl barlow-condensed-extrabold">
            premium
          </p>
          <p className="py-1 mb-5 text-red-500 uppercase text-7xl barlow-condensed-extrabold">
            marketplace
          </p>
          <p className="text-white/50">
            Thousands of curated products. <br />
            Free shipping on every order.
          </p>
        </div>
      </div>
      <div className="pt-12 px-12 flex items-center justify-center">
        <div className="w-full">
          <div className="flex gap-2 items-center">
            <div className="bg-red-500 h-px w-8"></div>
            <p className="uppercase tracking-[2px] text-sm barlow-condensed-semibold text-black/80">
              Log in
            </p>
          </div>
          <div className="mt-6">
            <h1 className="uppercase text-4xl barlow-condensed-extrabold">
              Welcome Back
            </h1>
          </div>
          {/* Form */}
          <form className="mt-8">
            <div className="mt-5">
              <div className="barlow-condensed-semibold">
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
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleChange}
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
                    name="password"
                    autoComplete="new-password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="block text-red-500 text-end w-full cursor-pointer my-2"
                >
                  Forgot Password?
                </Link>

                <div className="mt-4">
                  {/* <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="bg-red-500 cursor-pointer disabled:cursor-progress w-full py-3 text-white"
                  >
                    {loading ? <LoadingOutlined /> : "Login"}
                    </button> */}
                  <Button
                    variant="red"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={"w-full!"}
                  >
                    {loading ? <LoadingOutlined /> : "Login"}
                  </Button>
                  <p className="mt-2 tracking-wide text-center text-lg barlow-condensed-regular">
                    Don't have an account?{" "}
                    <Link
                      className="text-red-500 font-bold underline"
                      to="/auth/register"
                    >
                      Register
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
