"use client";

import React from "react";
import PostForm from "../../components/posts/PostForm";
import { useCreatePost } from "../../api/post/addPost";
import { PostFormInput } from "../../types/post";

const AddPost = () => {
  const { mutate } = useCreatePost();

  const handleSubmit = (data: PostFormInput) => {
    mutate(data);
  };

  return <PostForm handleSubmit={handleSubmit} label="Add New Post" />;
};

export default AddPost;
