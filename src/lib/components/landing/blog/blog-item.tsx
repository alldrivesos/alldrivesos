import { FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatName } from "../../../utils";
import { useNavigate } from "react-router-dom";

interface Props {
  data: {
    [key: string]: any;
    title: string;
    id: string;
  };
}
const BlogItem: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() =>
          navigate(`/blog/detail?title=${encodeURIComponent(data.title.replaceAll(" ", "-"))}`)
        }
        className="cursor-pointer"
      >
        <img
          src={data?.coverImage}
          alt="blog-img"
          className="w-full h-[200px] rounded-t-lg lg:h-[220px] object-contain"
        />
      </div>
      <div className="p-4 rounded-b-lg shadow-lg bg-white">
        <div className="h-40 2xl:h-36">
          <p className="text-lg lg:text-xl fw-500 !syne">{data?.title}</p>
          <div className="mt-2">
            {data.body && (
              <div
                dangerouslySetInnerHTML={{
                  __html: `${formatName(data.body, 74)}`,
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="flex gap-x-3 items-center !syne hover:fw-600 hover:text-primary"
            onClick={() => navigate(`/blog/detail?title=${encodeURIComponent(data.title.replaceAll(" ", "-"))}`)}
          >
            View <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
