import { useQuery } from "@tanstack/react-query";
import { Post, RawPost } from "../../types/post";
import fetchAPI from "../index";

export const getPosts = async (): Promise<Post[]> => {
  const { data: response } = await fetchAPI("posts");

  return response.map((data: RawPost) => data.attributes);
};

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};
