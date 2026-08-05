// apps/web/src/app/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PostView } from "@node-course/api-sdk";
import {
  useCreatePost,
  useDeletePost,
  usePosts,
  useUpdatePost,
} from "@/lib/api-hooks";
import { clearId, clearToken, isAuthenticated } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { PostForm } from "@/components/post-form";

type Editing = { mode: "create" } | { mode: "edit"; post: PostView } | null;

export default function PostsPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Editing>(null);

  

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  const postsQuery = usePosts(search);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  if (!authChecked) return null;

  const logout = () => {
    clearToken();
    clearId();
    router.replace("/login");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <div className="flex gap-2">
          <Button onClick={() => setEditing({ mode: "create" })}>
            New post
          </Button>
          <Button variant="ghost" onClick={logout}>
            Log out
          </Button>
        </div>
      </header>

      <Input
        placeholder="Search by title, content or description…"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="mb-4"
      />
      <Card className="divide-y divide-slate-100">
        {postsQuery.isLoading && (
          <p className="p-4 text-sm text-slate-500">Loading…</p>
        )}
        {postsQuery.isError && (
          <p className="p-4 text-sm text-red-600">Failed to load posts.</p>
        )}
        {postsQuery.data?.length === 0 && (
          <p className="p-4 text-sm text-slate-500">No posts found.</p>
        )}
        {postsQuery.data?.map((post) => (
          
          <div key={post.id} className="flex items-center justify-between p-4">
            <AlertDialog>
              <AlertDialogTrigger render={
                <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-slate-500">{post.content}</p>
            </div>
              }>
                Show Dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{post.title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {post.description}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                  <AlertDialogDescription>
                    {post.content}
                  </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setEditing({ mode: "edit", post })}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                disabled={deletePost.isPending}
                onClick={() => {
                  if (confirm(`Delete ${post.title}?`)) {
                    deletePost.mutate(post.id);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </Card>

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="mb-4 text-lg font-semibold">
              {editing.mode === "create" ? "New post" : "Edit post"}
            </h2>
            <PostForm
              initialValues={
                editing.mode === "edit"
                  ? { title: editing.post.title, content: editing.post.content, description: editing.post.description }
                  : undefined
              }
              submitLabel={editing.mode === "create" ? "Create" : "Save"}
              pending={createPost.isPending || updatePost.isPending}
              onCancel={() => setEditing(null)}
              onSubmit={(body) => {
                console.log(body)
                if (editing.mode === "create") {
                  createPost.mutate(body, { onSuccess: () => setEditing(null) });
                } else {
                  updatePost.mutate(
                    { id: editing.post.id, body },
                    { onSuccess: () => setEditing(null) }
                  );
                }
              }}
            />
          </Card>
        </div>
      )}
    </main>
  );
}