import { Rating } from "@material-tailwind/react";
import { ChangeEvent, FC, useState } from "react";
import TextInput, { InputType } from "../../ui/TextInput";
import {
  apiClient,
  clientUpdateService,
  submitReview,
} from "../../../services/api/serviceApi";
import { toast } from "react-toastify";
import { ScaleSpinner } from "../../ui/Loading";
import Button from "../../ui/Button";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useMutation, useMutationState } from "@tanstack/react-query";

interface Props {
  id: string;
  close: () => void;
  refetch: () => void;
}
const ReviewModal: FC<Props> = ({ id, close, refetch }) => {
  const [ratings, setRatings] = useState(0);
  const [showRev, setShowRev] = useState(false);
  const [review, setReview] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  // const review_mutation = useMutation({

  // })
  // const handleSubmit = async () => {
  //   const payload = {
  //     serviceRequestId: id,
  //     rating: ratings,
  //     comment: review,
  //   };
  //   return console.log(payload);
  //   await submitReview(payload)
  //     .then((res) => {
  //       toast.success(res.message);
  //       setIsBusy(false);
  //       close();
  //     })
  //     .catch((err: any) => {
  //       toast.error(err.response.data.message);
  //       setIsBusy(false);
  //     });
  // };

  // const handleAction = async () => {
  //   setIsBusy(true);
  //   const payload = {
  //     status: "completed",
  //   };
  //   await clientUpdateService(id, payload)
  //     .then((res) => {
  //       if (review || ratings) {
  //         handleSubmit();
  //       } else {
  //         toast.success(res.message);
  //         setIsBusy(false);
  //         close();
  //       }
  //     })
  //     .catch((err: any) => {
  //       toast.error(err.response.data.message);
  //       console.log(err);
  //       setIsBusy(false);
  //     });
  // };
  //
  //
  const review_mutation = useMutation({
    mutationFn: async (payload: any) => {
      let resp = await apiClient.patch(
        "/service-request/client-update/" + payload.id,
        payload,
      );
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      close();
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  const handleAction = () => {
    const payload = {
      id: id,
      status: "completed",
      rating: ratings,
      comment: review,
    };
    toast.promise(review_mutation.mutateAsync(payload), {
      pending: "Submitting review...",
      success: "Review submitted successfully!",
      error: "Failed to submit review",
    });
  };
  return (
    <div>
      <p className="fw-500 text-black">
        Thank you for choosing us! Your service is complete — we’d love to hear
        how your technician did.
      </p>
      <div>
        {/*<div className="mb-4 mt-3">
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              className="w-5 h-5"
              onChange={() => setShowRev(!showRev)}
            />
            <label className="text-black">Submit Provider Review</label>
          </div>
        </div>*/}

        <div>
          <div>
            <TextInput
              label="Review (Required)"
              type={InputType.textarea}
              onChange={(
                e: ChangeEvent<
                  HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
                >,
              ) => setReview(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <p className="mb-1">Rating</p>
            <Rating
              value={ratings}
              onChange={(value: number) => setRatings(value)}
              ratedIcon={<FaStar className="!text-5xl" />}
              unratedIcon={<FaRegStar className="!text-5xl" />}
              className="gap-x-2 text-2xl"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button
          onClick={handleAction}
          title={
            review_mutation.isPending ? (
              <ScaleSpinner size={14} color="white" />
            ) : (
              "Complete"
            )
          }
        />
      </div>
    </div>
  );
};

export default ReviewModal;
