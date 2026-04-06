import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import { BsClock } from "react-icons/bs";
import BlogItem from "../../lib/components/landing/blog/blog-item";
import { getBlogPosts, getBlogTags } from "../../lib/services/api/blogApi";
import LandingLayout from "../../lib/components/layout/landing";

const BlogPage = () => {
  const [activeTag, setActiveTag] = useState("");
  const [page, setPage] = useState(1);

  const { data: tags } = useQuery({
    queryKey: ["getTags"],
    queryFn: getBlogTags,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getPosts", page, activeTag],
    queryFn: () => getBlogPosts(page, activeTag),
  });

  const handleNext = () => {
    if (page * 6 <= data?.count) {
      setPage((old) => old + 1);
    } else {
      toast.success("This is the last page");
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((old) => old - 1);
    } else {
      toast.success("This is the first page");
    }
  };

  return (
    <>
      <LandingLayout>
        <div className="h-[250px] lg:h-[300px]  bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705679269/rsh/Group_59_7_fv41oc.png')] bg-cover lg:bg-fit">
          <div className="box h-full text-white flex items-center">
            <div>
              <div className="flex">
                <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                  <BsClock className="text-[#FEB470] text-[14px]" />
                  <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                    Available 24/7 for emergency road service
                  </p>
                </div>
              </div>
              <p className="text-4xl fw-700 mt-5">Latest News</p>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="box">
            <p className="text-2xl fw-600">All Latest News</p>
            <div className="mt-4">
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
            <div className="mt-6 pb-24">
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
                  data?.data?.map((item: any, i: number) => (
                    <BlogItem data={item} key={i} />
                  ))}
              </div>
              <div>
                {!isLoading && data && (
                  <div className="box mt-6 flex justify-end">
                    <div className="flex gap-x-4 items-center">
                      <p className="fw-600">Page {page}</p>
                      <div className="flex gap-x-2 items-center">
                        <div
                          onClick={handlePrev}
                          className={`px-2 py-1 rounded ${
                            page === 1
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-primary text-white cursor-pointer"
                          }`}
                        >
                          Prev
                        </div>
                        <div
                          onClick={handleNext}
                          className={`px-2 py-1 rounded ${
                            page * 6 >= data?.count
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-primary text-white cursor-pointer"
                          }`}
                        >
                          Next
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LandingLayout>
    </>
  );
};

export default BlogPage;
