import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Post, PostFormInput } from "../../types/post";
import fetchAPI from "../index";

interface CreatePostData {
  title: string;
  body: string;
}

const createPost = async (post: PostFormInput): Promise<Post> => {
  const { data: response } = await fetchAPI("posts", {
    method: "post",
    data: post,
  });

  return response;
};

export const useCreatePost = () => {
  const router = useRouter();

  return useMutation<Post, Error, CreatePostData>({
    mutationFn: createPost,
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      console.error("Error creating post:");
    },
  });
};
