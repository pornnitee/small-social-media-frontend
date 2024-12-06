import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import fetchAPI from "../index";
import { AxiosError } from "axios";

interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  user_name: string;
}

type User = {
  id: string;
  user_name: string;
};

type Response = {
  token: string;
  user: User;
};

export type ErrorResponse = AxiosError<{
  error: string | string[];
  error_description: { [key: string]: string[] };
}>;

const register = async (data: RegisterData): Promise<Response> => {
  const response = await fetchAPI("users/register", {
    method: "post",
    data: { user: { ...data } },
  });
  return response;
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation<Response, Error, RegisterData>({
    mutationFn: register,
    onSuccess: (response: Response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user_id", response.user.id);
      localStorage.setItem("user_name", response.user.user_name);
      router.push("/");
    },
  });
};
