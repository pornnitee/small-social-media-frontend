"use client";

import { useState } from "react";
import { useRegister } from "../../api/auth/register";
import RegisterForm from "../../components/auth/RegisterForm";

interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  user_name: string;
}

type ErrorResponse = {
  error: string | string[];
  error_description: { [key: string]: string[] };
};

const SignUp = () => {
  const { mutate } = useRegister();
  const [errors, setErrors] = useState<ErrorResponse>();

  const handleSignUp = async (data: RegisterData) => {
    mutate(data, {
      onError: (err: any) => {
        setErrors(err.response?.data);
      },
    });
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <RegisterForm onSubmit={handleSignUp} errors={errors} />
    </div>
  );
};

export default SignUp;
