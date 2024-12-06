import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PostFormInput } from "../../types/post";
import fetchAPI from "../index";

type Payload = {
  id: string;
  post: PostFormInput;
};

const updatePost = async ({ id, post }: Payload): Promise<string> => {
  const { data: response } = await fetchAPI(`/posts/${id}`, {
    method: "put",
    data: post,
  });

  return response.id;
};

export const useUpdatePost = () => {
  const router = useRouter();
  return useMutation<string, Error, Payload>({
    mutationFn: updatePost,
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      console.error("Error Updating post");
    },
  });
};
