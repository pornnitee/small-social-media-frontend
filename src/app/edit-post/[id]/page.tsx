"use client";

import { usePost } from "@/api/post/getPost";
import { useUpdatePost } from "@/api/post/updatePost";
import PostForm from "@/components/PostForm";
import { useParams } from "next/navigation";
import React from "react";
import { PostFormInput } from "../../../types/post";

const EditPost = () => {
  const { data, isLoading } = usePost();
  const { mutate, isError, isSuccess } = useUpdatePost();
  const params = useParams();

  const handleSubmit = (data: PostFormInput) => {
    mutate({ id: params.id as string, post: { ...data } });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <PostForm handleSubmit={handleSubmit} label="Edit Post" value={data} />
  );
};

export default EditPost;
