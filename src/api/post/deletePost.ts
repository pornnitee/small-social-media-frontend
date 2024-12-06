import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchAPI from "../index";

const deletePost = async (id: string): Promise<void> => {
  await fetchAPI(`/posts/${id}`, {
    method: "delete",
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => deletePost(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      console.error("Error deleting post");
    },
  });
};
