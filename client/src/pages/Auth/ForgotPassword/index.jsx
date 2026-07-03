import React from "react";
import Button from "../../../components/ui/Button";

const ForgotPassword = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="p-10">
        <div className="">
          <h1 className="text-4xl barlow-condensed-extrabold text-red-500">
            Forgot Password
          </h1>
          <p className="text-lg barlow-condensed-regular mt-2">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>
        <form className="mt-5">
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
              />
            </div>
            <Button variant="red" className={"w-full!"}>
              Send Reset Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
