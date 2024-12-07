import React, { useState } from "react";

interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  user_name: string;
}

type Props = {
  onSubmit: (value: RegisterData) => void;
  errors?: ErrorResponse;
};

type ErrorResponse = {
  error: string | string[];
  error_description: { [key: string]: string[] };
};

const RegisterForm = ({ onSubmit, errors }: Props) => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
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

  const renderErrors = (field: string) => {
    if (!errors?.error_description?.[field]) return;
    return (
      <div className="text-red-400 text-sm mt-2">
        {errors.error_description[field].join(",")}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Create an Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            User Name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {renderErrors("user_name")}
        </div>

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
          {renderErrors("email")}
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
          {renderErrors("password")}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {renderErrors("password_confirmation")}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="/sign-in" className="text-indigo-600 hover:underline">
          Sign in
        </a>
        .
      </p>
    </div>
  );
};

export default RegisterForm;
