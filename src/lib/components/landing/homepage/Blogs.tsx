import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CurveLoader from "../../ui/loader/curveLoader/CurveLoader";
import BlogItem from "../blog/blog-item";
import { getBlogPosts, getBlogTags } from "../../../services/api/blogApi";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [activeTag, setActiveTag] = useState("");
  const [page] = useState(1);

  const { data: tags } = useQuery({
    queryKey: ["getTags"],
    queryFn: getBlogTags,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getPosts", page, activeTag],
    queryFn: () => getBlogPosts(page, activeTag),
  });

  return (
    <>
      <div className="section bg-[#C97833] mb-16">
        <div className="box">
          <div className="w-full flex justify-between">
            <p className="flex w-full text-2xl fw-600 text-white">
              Latest News
            </p>
            <div className="flex w-full justify-end">
              {!isLoading && data && (
                <div className="flex justify-end">
                  <div className="flex gap-x-4 items-center">
                    <p className="fw-600 text-white">
                      <Link to="/blog">View All</Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="flex gap-x-2 items-center w-full scroll-pro overflow-x-auto relative z-10">
              {tags?.data?.map((item: any, i: number) => (
                <p
                  className={`px-3 py-1 bg-blue-50 rounded-xl fs-400 cursor-pointer hover:bg-blue-400 whitespace-nowrap ${
                    activeTag === item.id && "bg-blue-400"
                  }`}
                  key={i}
                  onClick={() => setActiveTag(item.id)}
                >
                  {item.name}
                </p>
              ))}
            </div>
            <div></div>
          </div>
          <div className="mt-6 pb-16">
            {isLoading && (
              <div className="py-12 flex justify-center items-center text-black">
                <div>
                  <div className="flex place-center">
                    <CurveLoader />
                  </div>
                  <p className="text-center mt-5 fw-500">
                    Fetching Blog posts...
                  </p>
                </div>
              </div>
            )}
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-9">
              {!isLoading &&
                data &&
                data?.data
                  ?.slice(0, 3)
                  .map((item: any, i: number) => (
                    <BlogItem data={item} key={i} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
