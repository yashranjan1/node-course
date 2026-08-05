// apps/web/src/lib/api-hooks.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  createUser,
  deletePostById,
  deleteUserById,
  listPosts,
  listUsers,
  login,
  PostBody,
  updatePost,
  updateUserById,
  type UserBody,
} from "@node-course/api-sdk";

const USERS_KEY = ["users"];

export function useUsers(search: string) {
  return useQuery({
    queryKey: [...USERS_KEY, search],
    queryFn: async () => {
      const { data, error } = await listUsers({
        query: search ? { search } : undefined,
      });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const { data, error } = await login({ body });
      if (error) throw error;
      return data!;
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: UserBody) => {
      const { data, error } = await createUser({ body });
      if (error) throw error;
      return data!;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: UserBody }) => {
      const { data, error } = await updateUserById({ path: { id }, body });
      if (error) throw error;
      return data!;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await deleteUserById({ path: { id } });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  });
}

const POST_KEY = ["posts"]

export function usePosts(search: string) {
  return useQuery({
    queryKey: [...POST_KEY, search],
    queryFn: async () => {
      const { data, error } = await listPosts({
        query: search ? { search } : undefined,
      });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: PostBody) => {
      const { data, error } = await createPost({ body });
      if (error) throw error;
      return data!;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POST_KEY }),
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PostBody }) => {
      const { data, error } = await updatePost({ path: { id }, body });
      if (error) throw error;
      return data!;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POST_KEY }),
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await deletePostById({ path: { id } });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POST_KEY }),
  });
}