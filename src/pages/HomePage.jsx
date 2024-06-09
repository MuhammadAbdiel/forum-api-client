import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postedAt } from "@/utils";
import { useState } from "react";
import CardInformation from "@/components/CardInformation";

const createThreadSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  body: z
    .string()
    .min(1, { message: "Body is required" })
    .min(20, { message: "Body must be at least 20 characters" }),
});

function TextWithLimit({ text, limit }) {
  const words = text.split(" ");
  const truncatedText =
    words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;

  return <p>{truncatedText}</p>;
}

export default function HomePage() {
  const [like, isLike] = useState(false);

  const form = useForm({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  function onSubmit(values) {
    Swal.fire({
      title: "Success!",
      text: "Create Thread Successful",
      icon: "success",
    });
    console.log(values);
  }

  const title = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, aspernatur? Recusandae doloribus repellat
                      sapiente, ratione ipsam voluptate at. Nostrum delectus,
                      dicta corporis officiis et quidem itaque velit excepturi
                      eaque debitis dignissimos laborum officia esse ea in quos
                      quisquam doloribus adipisci. Corrupti itaque incidunt in
                      eos asperiores ducimus sunt non? Iusto atque adipisci
                      iste, ut aut, magnam fuga maxime porro non esse veritatis
                      expedita. Mollitia, provident dolores! Exercitationem
                      doloremque eligendi obcaecati dignissimos assumenda
                      nesciunt a, inventore, quaerat quia autem blanditiis.
                      Accusamus iure vero vel maxime placeat fugiat error, nemo
                      quae ipsam dolor tenetur voluptatum, porro magnam maiores
                      atque rerum perspiciatis quas?`;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="container mx-auto lg:px-36 md:px-8 flex flex-1 flex-col gap-4 py-4 md:gap-8 md:py-8">
        <CardInformation />
        <div className="grid">
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Threads</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div
                role="button"
                tabIndex={0}
                className="flex items-start gap-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer"
              >
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                  <header className="flex justify-between">
                    <div className="flex flex-col mb-3">
                      <p className="font-semibold">
                        Muhammad Abdiel Firjatullah
                      </p>
                      <p className="text-gray-500">@muhammadabdiel</p>
                    </div>
                    <p className="text-gray-500">{postedAt("2022-01-01")}</p>
                  </header>
                  <article>
                    <TextWithLimit text={title} limit={50} />
                  </article>
                  <div className="flex items-center mt-5">
                    <button
                      type="button"
                      aria-label="like"
                      className="mr-1"
                      onClick={() => isLike(!like)}
                    >
                      {like ? (
                        <Heart fill="red" strokeWidth={0} />
                      ) : (
                        <Heart strokeWidth={1} />
                      )}
                    </button>{" "}
                    <p>{like ? 1 : 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="fixed bottom-4 right-4">
              <Button
                size="icon"
                className="rounded-full"
                style={{ width: "70px", height: "70px" }}
              >
                <Plus className="h-9 w-9" />
                <span className="sr-only">Add</span>
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Create New Thread</DialogTitle>
              <DialogDescription>
                Create a new thread or start a new discussion.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-5"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Type your title here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={8}
                          id="body"
                          placeholder="Type your body here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Save Thread
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
