import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBlogPosts } from "../../lib/services/api/blogApi";
import BlogItem from "../../lib/components/landing/blog/blog-item";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";

const FeaturedBlogPage = () => {
  const [activeTag] = useState("");
  const [page] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["getPosts", page, activeTag],
    queryFn: () => getBlogPosts(page, activeTag),
  });

  return (
    <>
      <div className="section p-20 mt-32">
        <div className="">
          <div className="w-full flex">
            <p className="flex w-full text-2xl fw-600">Featured News</p>
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
            <div className="grid lg:grid-cols-1 gap-6 lg:gap-20">
              {!isLoading &&
                data &&
                data?.data
                  ?.slice(0, 10)
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

export default FeaturedBlogPage;
