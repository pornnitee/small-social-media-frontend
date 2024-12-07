import React, { useState } from "react";

type SignInData = {
  email: string;
  password: string;
};

type Props = {
  errorMessage?: string;
  onSubmit: (value: SignInData) => void;
};

const SignInForm = ({ onSubmit, errorMessage }: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Sign In to Your Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errorMessage && (
            <div className="text-red-400 text-sm mt-2">{errorMessage}</div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-indigo-600 hover:underline">
          Sign up
        </a>
        .
      </p>
    </div>
  );
};

export default SignInForm;
