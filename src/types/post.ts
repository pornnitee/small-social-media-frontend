export interface User {
  id: number | string;
  user_name: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  user: User;
  created_at: string;
}

export type RawPost = {
  id: string;
  type: "post";
  attributes: Post;
};

export interface PostFormInput {
  title: string;
  body: string;
}
