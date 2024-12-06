import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import fetchAPI from "../index";

type Payload = {
  email: string;
  password: string;
};

type User = {
  id: string;
  user_name: string;
};

type Response = {
  token: string;
  user: User;
};

const signIn = async (data: Payload): Promise<Response> => {
  const response = await fetchAPI("users/sign_in", {
    method: "post",
    data: { user: data },
  });
  return response;
};

export const useSignIn = () => {
  const router = useRouter();

  return useMutation<Response, Error, Payload>({
    mutationFn: signIn,
    onSuccess(response: Response) {
      console.error(response, "responsesss");
      localStorage.setItem("token", response.token);
      localStorage.setItem("user_id", response.user.id);
      localStorage.setItem("user_name", response.user.user_name);
      router.push("/");
    },
    onError(error) {
      console.error(error, "error");
    },
  });
};
