"use client";

import { useState } from "react";
import { useSignIn } from "../../api/auth/signIn";
import SignInForm from "../../components/auth/SignInForm";

type Payload = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { mutate } = useSignIn();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = (data: Payload) => {
    mutate(data, {
      onError: (err: any) => {
        setError(err.response?.data?.error_description);
      },
    });
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <SignInForm onSubmit={handleSubmit} errorMessage={error} />
    </div>
  );
};

export default SignIn;
