import { useParams } from "react-router-dom";
import { getSingleBlog } from "../../lib/services/api/blogApi";
import { useQuery } from "@tanstack/react-query";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import EditBlogPost from "../../lib/components/admin/blog-post/EditBlogPost";

const EditBlog = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: () => getSingleBlog(`${id}`),
  });

  return (
    <div>
      <div>
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
      </div>
      <div className='bg-white p-6 rounded-lg shadow min-h-[80vh]'>
        {
            data && <EditBlogPost item={data?.data} />
        }
      </div>
    </div>
  );
};

export default EditBlog;
