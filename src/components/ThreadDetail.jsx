import { postedAt } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ThreadCommentInput from "./ThreadCommentInput";
import CommentItem from "./CommentItem";

export default function ThreadDetail({
  threadId,
  threadDetail,
  onCommentThread,
  comments,
  onDeleteComment,
  onReplyComment,
  onDeleteReply,
}) {
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
      <h1 className="text-xl font-bold mt-10">Comments</h1>
      <div className="mt-5">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              threadId={threadId}
              comment={comment}
              onDeleteComment={onDeleteComment}
              onReplyComment={onReplyComment}
              commentId={comment.id}
              onDeleteReply={onDeleteReply}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <ThreadCommentInput onCommentThread={onCommentThread} />
    </div>
  );
}
