"use client";

import Link from "next/link";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import { useEffect, useState } from "react";
import { usePosts } from "../../api/post/getPosts";
import { useDeletePost } from "../../api/post/deletePost";
import Spinner from "../Spinner";

export default function PostsList() {
  const { data, isLoading } = usePosts();
  const { mutate: onDelete } = useDeletePost();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["posts"] });
    };
  }, [queryClient]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user_id");
      setUserId(userId);
    }
  }, []);

  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      onDelete(id);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div
      className="flex flex-col px-12 py-8 overflow-x-auto relative"
      style={{ height: " calc(100vh - 56px)" }}
    >
      <div className="self-end fixed bottom-4">
        <Link href={userId ? "/add-post" : "/sign-in"}>
          <button
            type="button"
            className="text-white text-xl font-sm bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  rounded-full w-12 h-12 flex items-center justify-center  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            +
          </button>
        </Link>
      </div>
      <div className="grid gap-3">
        {data?.map((post: Post) => {
          return (
            <div
              key={post.id}
              className=" hover:bg-sky-50 rounded-md p-4 bg-white"
            >
              <div className="flex justify-between">
                <div className="flex">
                  <div>
                    <span className="text-xs text-gray-500">Post by: </span>
                    {post.user.id == userId ? "Me" : post.user.user_name}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div>
                    <span className="text-sm text-gray-500 ml-5">
                      {moment(
                        post.created_at,
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                      ).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{post.title}</div>
                  <div>{post.body}</div>
                </div>
                {userId == post.user.id ? (
                  <div className="flex w-24 gap-2 justify-end">
                    <Link href={`/edit-post/${post.id}`}>
                      <span className="text-gray-700 hover:text-blue-700 cursor-pointer flex items-center space-x-1">
                        <span>Edit</span>
                      </span>
                    </Link>
                    <div>|</div>
                    <div className=" text-gray-700 hover:text-red-700 cursor-pointer ">
                      <span onClick={() => handleDelete(post.id.toString())}>
                        Delete
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
