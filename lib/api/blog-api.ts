import { apiClient } from "@/lib/api/axios-instance";
import { StoredUser } from "@/lib/auth-storage";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type CreatePostPayload = {
  title: string;
  content: string;
  image: string;
};

export type PostComment = {
  id: string | number;
  content: string;
  createdAt?: string;
  postId?: string;
  authorId?: string;
  author?: {
    username?: string;
  };
};

export type PaginatedCommentsData = {
  items: PostComment[];
  total: number;
};

export type PostListItem = {
  id: string;
  title: string;
  excerpt?: string;
  image?: string;
  createdAt: string;
  author: { username: string };
};

export type PostDetailData = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  image?: string;
  author: {
    username: string;
  };
};

export async function login(payload: LoginPayload) {
  const res = await apiClient.post<{ token: string; user: StoredUser }>(
    "/auth/login",
    payload,
  );
  return res.data;
}

export async function logout() {
  await apiClient.post("/auth/logout");
}

export async function register(payload: RegisterPayload) {
  const res = await apiClient.post<StoredUser>("/auth/register", payload);
  return res.data;
}

export async function getPaginatedPosts(
  page: number,
  keyword: string,
  pageSize: number,
) {
  const skip = (page - 1) * pageSize;
  const params = {
    skip: String(skip),
    limit: String(pageSize),
    order: "createdAt DESC",
    ...(keyword && { q: keyword }),
  };

  const res = await apiClient.get<{ items: PostListItem[]; total: number }>(
    "/posts/paginated",
    { params },
  );
  return res.data;
}

export async function getPostById(id: string) {
  const res = await apiClient.get<PostDetailData>(`/posts/${id}`);
  return res.data;
}

export async function getPostComments(
  postId: string,
  skip: number,
  limit: number,
  order: string = "createdAt DESC",
) {
  const res = await apiClient.get<PaginatedCommentsData>(
    `/posts/${postId}/comments`,
    {
      params: {
        skip: String(skip),
        limit: String(limit),
        order,
      },
    },
  );
  console.log("Fetched comments for post", postId, ":", res.data);
  return res.data
}

export async function getUserPosts(userId: string) {
  const res = await apiClient.get<PostListItem[]>(`/users/${userId}/posts`);
  return res.data;
}

export async function deletePostById(postId: string) {
  await apiClient.delete(`/posts/${postId}`);
}

export async function createPost(payload: CreatePostPayload) {
  const res = await apiClient.post<{ id: string | number }>("/posts", payload);
  return res.data;
}

export async function createComment(payload: {
  content: string;
  postId: string;
}) {
  const res = await apiClient.post<{
    id: string | number;
    content: string;
  }>("/comments", payload);
  return res.data;
}
