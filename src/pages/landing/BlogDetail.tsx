import { useNavigate, useSearchParams } from "react-router-dom";
import LandingLayout from "../../lib/components/layout/landing";
import { useQuery } from "@tanstack/react-query";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import dayjs from "dayjs";
import { TbArrowBackUpDouble } from "react-icons/tb";
import RelatedNews from "../../lib/components/landing/blog/related-news";
import useAuth from "../../lib/hooks/authUser";
import BlogComments from "./BlogComments";
import { BsClock } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { apiClient } from "../../lib/services/api/serviceApi";

const BlogDetail = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["getSinglePost", title],
    queryFn: async () => {
      let resp = await apiClient.get(
        `/blog-post/by-title/` + encodeURIComponent(title.replaceAll("-", " ")),
      );
      return resp.data;
    },
    enabled: !!title,
  });

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
        {isLoading && (
          <div className="place-center py-16">
            <div>
              <div className="flex place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">Fetching Blog post...</p>
            </div>
          </div>
        )}
        <div>
          {data && (
            <div className="box py-12 lg:flex items-top gap-x-10">
              <div className="lg:w-[70%]">
                <div className="mb-3 flex">
                  <p
                    className="flex items-center fw-600 border-b border-black gap-x-1"
                    onClick={() => navigate("/blog")}
                  >
                    <TbArrowBackUpDouble /> Return
                  </p>
                </div>
                <p className="text-gray-600 fw-500 fs-500">
                  {dayjs(data?.data?.createdDate).format("dddd DD, MMMM YYYY.")}
                </p>
                <div>
                  <p className="text-2xl fw-600 !syne">{data?.data?.title}</p>
                  <div className="flex gap-x-2 items-center mt-3">
                    <p className="px-2 py-[2px] bg-blue-50 fw-500 rounded-xl fs-400">
                      {data?.data?.category?.name}
                    </p>
                  </div>
                </div>
                <div className="mt-7">
                  <div>
                    <img
                      src={data?.data?.coverImage}
                      alt="coverImage"
                      className="w-full xl:h-[450px] 2xl:h-[550px] object-contain"
                    />
                  </div>
                  <div className="mt-16 prose prose-sm max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-img:rounded-lg">
                    <div
                      dangerouslySetInnerHTML={{ __html: data.data.body }}
                    ></div>
                    {/*<ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {data?.data?.body}
                    </ReactMarkdown>*/}
                  </div>
                  <div className="mt-3">
                    {user.token !== "" && <BlogComments id={data?.data?.id} />}
                  </div>
                </div>
              </div>
              <div className="lg:w-[30%] lg:pt-12">
                <RelatedNews id={data?.data?.categoryId} />
              </div>
            </div>
          )}
        </div>
      </LandingLayout>
    </>
  );
};

export default BlogDetail;
