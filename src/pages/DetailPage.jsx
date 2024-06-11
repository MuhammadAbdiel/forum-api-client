import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveThreadDetail } from "@/states/threadDetail/action";
import { useEffect } from "react";
import ThreadDetail from "@/components/ThreadDetail";

export default function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="container mx-auto lg:px-36 md:px-8 flex flex-1 flex-col gap-4 py-4 md:gap-8 md:py-8">
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
      <ThreadDetail threadDetail={threadDetail} />
    </div>
  );
}
