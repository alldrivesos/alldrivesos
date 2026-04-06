import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { ReviewItem } from "../../../../types/routine";
import { Rating } from "@material-tailwind/react";
import dayjs from "dayjs";
import { apiClient } from "../../../../services/api/serviceApi";

interface Props {
  id: string;
}
const ViewReviewsModal: FC<Props> = ({ id }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["driverReview", id],
    queryFn: async () => {
      let resp = await apiClient.get("/review/fetch-service-reviews/" + id);
      return resp.data;
    },
  });
  const colors: string[] = [
    "border-purple-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
    "border-red-500",
    "border-brown-500",
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading reviews...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500">Error loading reviews.</p>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">No reviews available yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-h-[400px] overflow-y-auto">
        {data?.data?.map((item: ReviewItem, index: number) => {
          const colorIndex = index % colors.length;
          const color = colors[colorIndex];
          return (
            <div
              key={index}
              className={`border-l-[8px] relative flex items-center justify-between ${color}  p-2 mb-3`}
            >
              <div className="">
                <div className="">
                  <p className="fw-600 fs-500">{`${item.user.fname} ${item.user.lname}`}</p>
                  <p className="fs-500">{item.comment}</p>
                  <div>
                    <Rating value={Number(item.rating)} readonly />
                  </div>
                  <p className="fs-300">
                    {dayjs(item.createdAt).format("ddd DD, MMM YYYY")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewReviewsModal;
