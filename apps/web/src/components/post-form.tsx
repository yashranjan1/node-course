"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { PostBody, UserBody } from "@node-course/api-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getId } from "@/lib/auth";
import { Textarea } from "./ui/textarea";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  authorId: z.string()
});

type PostFormValues = z.infer<typeof schema>;

export function PostForm({
  initialValues,
  submitLabel,
  pending,
  onSubmit,
  onCancel,
}: {
  initialValues?: { title: string; content: string, description: string };
  submitLabel: string;
  pending: boolean;
  onSubmit: (body: PostBody) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? "",
      content: initialValues?.content ?? "",
      description: initialValues?.description ?? "",
      authorId: getId()!
    },
  });

  const errors = formState.errors

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className="space-y-4"
      noValidate
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" {...register("description")} />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          The example API requires all fields on update.
        </p>
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" {...register("content")} />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}