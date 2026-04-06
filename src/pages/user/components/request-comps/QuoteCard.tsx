import { Rating } from "@material-tailwind/react";
import { apiClient } from "../../../../lib/services/api/serviceApi";
import { useDriver } from "../../new-request";
import { Quote } from "./all-quotes";
import { useRef } from "react";
import useModal from "../../../../lib/hooks/useModal";
import ProfileAvatar from "../../../../lib/components/ui/ProfileAvatar";

export default function QuoteCard(props: {
  quote: Quote;
  next?: (item?: Quote) => any;
  open: (item: Quote) => any;
}) {
  const { quote, open, setVendor } = props;
  const [driver, setDriver] = useDriver();
  const ref = useRef<HTMLDialogElement>(null);
  const { Modal: Modal, setShowModal, showModal } = useModal();
  return (
    <>
      <Modal title="Driver Information">
        <div className="p-6 flex flex-col items-center">
          <div className="size-24 mb-4">
            <ProfileAvatar url={quote.driver.photo}></ProfileAvatar>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {quote.driver.name}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg text-gray-700">Overall Rating:</span>
            {/*@ts-ignore*/}
            <Rating value={quote?.driver?.reviewsAvg || 3} readonly />
          </div>
          <p className="text-lg text-gray-700">Level: {quote.driver.level}</p>
          {/* Sensitive information like email, phone, and address are hidden */}
        </div>
      </Modal>
      <div
        key={quote.id}
        className="bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out"
      >
        <div className="flex-1 mb-4 sm:mb-0">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Quote:{" "}
            <span className="font-semibold text-primary">${quote.quote}</span>
          </h3>
          <p className="text-base text-gray-700 mt-2">
            Driver:{" "}
            <span className="font-medium text-gray-800">
              {quote.driver.name}
            </span>
          </p>
          <p className="text-base text-gray-700 mt-1">
            Distance:{" "}
            <span className="font-medium text-gray-800">{quote.distance}</span>
          </p>
          <p className="text-base text-gray-700 mt-1">
            Estimated Time:{" "}
            <span className="font-medium text-gray-800">
              {quote.timeTaken["City driving car speed"]}
            </span>
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-base text-gray-700">Driver Rating:</span>
            {/*@ts-ignore*/}
            <Rating value={quote?.driver?.reviewsAvg || 3} readonly />
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:ml-4 w-full sm:w-auto">
          <button
            onClick={async () => {
              try {
                let resp = await apiClient.post(
                  `/service-quote/select-driver-quote/${quote.id}`,
                );
                setDriver(quote);
                console.log(resp.data);
                props.next(quote);
              } catch (error: any) {
                let message = error.response.data.message;
                if (
                  message ==
                  "One other technician's quote has been selected initially."
                ) {
                  setDriver(quote);
                  props.next(quote);
                  return;
                }
              }
            }}
            title={"Select this quote"}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed w-full text-center"
          >
            Select Quote
          </button>
          <button
            onClick={async () => {
              return open(quote);
            }}
            title={"View driver location on map"}
            className="bg-blue-gray-50 hover:bg-blue-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed w-full text-center"
          >
            View On Map
          </button>
          {/*<button
            onClick={async () => {
              setShowModal(true);
            }}
            title={"View driver location on map"}
            className="bg-blue-gray-50 hover:bg-blue-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed w-full text-center"
          >
            Info
          </button>*/}
        </div>
      </div>
    </>
  );
}
