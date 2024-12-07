"use client";

import { usePost } from "@/api/post/getPost";
import { useUpdatePost } from "@/api/post/updatePost";
import PostForm from "@/components/posts/PostForm";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { PostFormInput } from "../../../types/post";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const EditPost = () => {
  const { data, isError, isLoading } = usePost();
  const { mutate } = useUpdatePost();
  const params = useParams();
  const router = useRouter();

  const handleSubmit = (data: PostFormInput) => {
    mutate({ id: params.id as string, post: { ...data } });
  };

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
  }, [isError]);

  if (isLoading) return <Spinner />;

  return (
    <PostForm handleSubmit={handleSubmit} label="Edit Post" value={data} />
  );
};

export default EditPost;
