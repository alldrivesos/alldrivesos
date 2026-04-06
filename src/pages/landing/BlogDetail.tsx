import { useNavigate, useParams } from "react-router-dom";
import LandingLayout from "../../lib/components/layout/landing";
import { getSingleBlogPost } from "../../lib/services/api/blogApi";
import { useQuery } from "@tanstack/react-query";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import dayjs from "dayjs";
import { TbArrowBackUpDouble } from "react-icons/tb";
import RelatedNews from "../../lib/components/landing/blog/related-news";
import useAuth from "../../lib/hooks/authUser";
import BlogComments from "./BlogComments";

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: () => getSingleBlogPost(`${id}`),
  });

  return (
    <>
      <LandingLayout>
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
                  {/* <div>
                    <p className="f-500">
                      By: {data?.user.firstName} {data?.user.lastName}
                    </p>
                  </div> */}
                  <div className="flex gap-x-2 items-center mt-3">
                    {/* {data?.tags.map((item: any) => ( */}
                    <p
                      className="px-2 py-[2px] bg-blue-50 fw-500 rounded-xl fs-400"
                    // key={item.id}
                    >
                      {data?.data?.category?.name}
                    </p>
                    {/* ))} */}
                  </div>
                </div>
                <div className="mt-7">
                  <div>
                    <img
                      src={data?.data?.coverImage}
                      alt="coverImage"
                      className="w-full xl:h-[450px] 2xl:h-[550px] object-cover"
                    />
                  </div>
                  <div className="mt-16">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${data?.data?.body}`,
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    {user.token !== '' &&
                      <BlogComments id={id} />
                    }
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
