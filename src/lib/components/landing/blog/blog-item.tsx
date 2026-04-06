import { FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatName } from "../../../utils";
import { useNavigate } from "react-router-dom";

interface Props {
  data: any;
}
const BlogItem: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/blog/${data.id}`)}
      >
        <img
          src={data?.coverImage}
          alt="blog-img"
          className="w-full h-[200px] rounded-t-lg lg:h-[220px] object-cover"
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
            onClick={() => navigate(`/blog/${data.id}`)}
          >
            View <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
