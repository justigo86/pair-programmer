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
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string().min(0).max(50),
});

export function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();
  const search = query.get("search");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") ?? "",
    },
  });

  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // await createRoomAction(values);
    if (values.search) {
      router.push(`/browse?search=${values.search}`);
    } else {
      router.push("/browse");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center md:grid md:grid-cols-10 gap-1 md:gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full md:col-span-8">
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
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
        <Button type="submit" className="w-fit md:col-span-2">
          <SearchIcon className="mr-2" />
          Search
        </Button>
      </form>
    </Form>
  );
}
