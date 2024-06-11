import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postedAt } from "@/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const commentSchema = z.object({
  content: z
    .string()
    .max(320, { message: "Comment cannot exceed 320 characters" }),
});

function CommentForm() {
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Comment this thread"
                  {...field}
                  className="w-full border border-gray-300 rounded-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-right text-sm text-gray-500 mt-3">
          {form.watch("content")?.length || 0}/320
        </p>
        <Button type="submit" className="w-full text-white mt-5">
          Comment
        </Button>
      </form>
    </Form>
  );
}

export default function ThreadDetail({ threadDetail }) {
  return (
    <div className="border border-gray-300 p-4 rounded-md mb-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>
            {threadDetail.fullname.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{threadDetail.fullname}</p>
              <p className="text-gray-500">@{threadDetail.username}</p>
            </div>
            <p className="text-gray-500">{postedAt(threadDetail.date)}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-bold">{threadDetail.title}</h1>
        <p className="mt-2">{threadDetail.body}</p>
      </div>
      <CommentForm />
    </div>
  );
}
