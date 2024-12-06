"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PostFormInput } from "../types/post";

type Props = {
  handleSubmit: (value: PostFormInput) => void;
  value?: PostFormInput;
  label: string;
};

const PostForm = ({ handleSubmit, value, label }: Props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!value) return;
    setBody(value.body);
    setTitle(value.title);
  }, [value]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit({ title, body });
  };

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold">{label}</h1>
      <form onSubmit={onSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-sm font-medium">
            Body
          </label>
          <textarea
            id="body"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded mr-3 w-20"
        >
          Submit
        </button>
        <Link href={"/"}>
          <button
            type="button"
            className="bg-gray-200 w-20 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

export default PostForm;
