import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import fetchAPI from "../index";

const signOut = async (): Promise<void> => {
  await fetchAPI("users/sign_out", { method: "delete" });
};

export const useSignOut = () => {
  const router = useRouter();

  return useMutation<void, Error>({
    mutationFn: signOut,
    onSuccess() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      router.push("/sign-in");
    },
    onError(error) {
      console.error(error, "error");
    },
  });
};
