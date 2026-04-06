import { FC } from "react";
import { ReviewItem } from "../../../types/routine";
import { Rating } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { est_day } from "../services/RequestList";

interface Props {
  data: any[];
}
const ReviewList: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const colors: string[] = [
    "border-purple-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
    "border-red-500",
    "border-brown-500",
  ];
  // return <>{JSON.stringify(data)}</>;
  return (
    <div>
      {data.length &&
        data.map((item: ReviewItem, index) => {
          const colorIndex = index % colors.length;
          const color = colors[colorIndex];
          return (
            <div
              key={index}
              className={`border-l-[8px] relative flex items-center justify-between ${color}  p-3 mb-5`}
            >
              <div className="lg:flex w-full justify-end gap-x-5">
                <div className="w-8/12">
                  <p
                    className="fw-600 cursor-pointer"
                    onClick={() => navigate(`/admin/users/${item?.userId}`)}
                  >{`${item?.user?.fname} ${item?.user?.lname}`}</p>
                  <p>{item?.comment}</p>
                  <div>
                    <Rating value={5} readonly />
                  </div>
                  <p>
                    {est_day(item?.createdAt)
                      .tz("America/New_York")
                      .format("ddd DD, MMM YYYY")}
                  </p>
                </div>
                <div className="hidden lg:block border-l pl-4 w-4/12 p-2">
                  <p
                    className="fw-600 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/providers/staff/${item.vendorId}`)
                    }
                  >{`${item?.vendor?.fname} ${item?.vendor?.lname}`}</p>
                  <div className="mt-2">
                    {item?.vendor?.reviewsAvg && (
                      <Rating
                        count={5}
                        value={Number(item?.vendor?.reviewsAvg)}
                        readonly
                      />
                    )}
                    {/*<Rating
                      count={5}
                      value={Number(item?.vendor?.reviewsAvg)}
                      readonly
                    />*/}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ReviewList;
