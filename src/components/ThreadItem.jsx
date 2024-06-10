import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postedAt } from "@/utils";

function TextWithLimit({ text, limit }) {
  const words = text.split(" ");
  const truncatedText =
    words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;

  return <p>{truncatedText}</p>;
}

export default function ThreadItem({ title, body, fullname, username, date }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex items-start gap-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer"
    >
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src="" alt="Avatar" />
        <AvatarFallback>
          {fullname.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full">
        <header className="flex justify-between">
          <div className="flex flex-col mb-3">
            <p className="font-semibold">{fullname}</p>
            <p className="text-gray-500">@{username}</p>
          </div>
          <p className="text-gray-500">{postedAt(date)}</p>
        </header>
        <article>
          <h1 className="text-xl font-bold">{title}</h1>
          <TextWithLimit text={body} limit={20} />
        </article>
        {/* <div className="flex items-center mt-5">
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
        </div> */}
      </div>
    </div>
  );
}
