"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleX, SearchIcon } from "lucide-react";

const formSchema = z.object({
  search: z.string().min(0).max(50),
});

export function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // await createRoomAction(values);
    if (values.search) {
      router.push(`/?search=${values.search}`);
    } else {
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-[36rem]"
                  placeholder="Filter rooms by keywords, (e.g., typescript, nextjs, etc.)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {query.get("search") && (
          //if there is a search entered in the homepage tags search
          //create a button to clear the search
          <Button
            variant="link"
            onClick={() => {
              form.setValue("search", "");
              router.push("/");
            }}
          >
            <CircleX />
          </Button>
        )}
        <Button type="submit">
          <SearchIcon className="mr-2" />
          Search
        </Button>
      </form>
    </Form>
  );
}
