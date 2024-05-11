"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
//zod used for form schema validation
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editRoomAction } from "./actions";
import { useRouter, useParams } from "next/navigation";
import { Room } from "@/db/schema";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  githubRepo: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
});

export function EditRoomForm({ room }: { room: Room }) {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description ?? "",
      githubRepo: room.githubRepo ?? "",
      tags: room.tags,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.name);
    await editRoomAction({
      id: params.roomId as string,
      ...values,
    });
    toast({
      title: "Room successfully updated.",
      description: "Your room has been created.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormDescription>This is your public room name.</FormDescription>
              <FormControl>
                <Input {...field} placeholder="The Best Project" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormDescription>
                Please provide what you will be coding on.
              </FormDescription>
              <FormControl>
                <Input {...field} placeholder="Working on a new project" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormDescription>
                Please provide the link to your project github repo.
              </FormDescription>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/username/repo"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormDescription>
                Please list the progamming languages, frameworks, and libraries
                you will be using.
              </FormDescription>
              <FormControl>
                <Input {...field} placeholder="typescript, nextjs, tailwind" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
