import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Post } from "../../types/post";
import fetchAPI from "../index";

export const getPost = async (id: string): Promise<Post> => {
  const { data: response } = await fetchAPI(`posts/${id}`);

  return response.attributes;
};

export const usePost = () => {
  const params = useParams();
  return useQuery<Post>({
    queryKey: ["post"],
    queryFn: () => getPost(params.id as string),
  });
};
