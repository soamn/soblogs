import Link from "next/link";
import React from "react";

const BlogCard = (props: any) => {
  return (
    <Link href={"posts/" + props.slug}>
      <div className="bg-slate-100 gap-5 flex flex-col shadow-xl w-[500px] h-fit rounded-xl p-4">
        <div className="rounded-lg overflow-clip">
          <img loading="lazy" src={`${props.coverPhoto}`} />
        </div>

        <div>
          <h1 className="text-lg font-bold">{props.title}</h1>

          <div className="flex justify-between ">
            <div className="flex gap-4 text-sm text-teal-500">
              <img
                loading="lazy"
                className="w-[25px] h-[25px] rounded-full"
                src={props.author.avatar.url}
              />
              {props.author.name}
            </div>
            <div className="text-xs italic text-gray-600">
              published-{props.datePublished}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
