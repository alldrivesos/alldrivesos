import { FC } from "react";
import ReviewModal from "./ReviewModal";
import Tabs from "../../ui/Tabs";
import QueryModal from "./QueryModal";
import CancelModal from "./CancelJob";

interface Props {
  id: string;
  refetch: () => void;
  close: () => void;
  status: string;
}
const ActionModal: FC<Props> = ({ id, status, refetch, close }) => {
  const tabs = [
    ...(status == "fulfilled" || status == "ongoing"
      ? [
          {
            title: <p>Complete Action</p>,
            content: <ReviewModal id={id} close={close} refetch={refetch} />,
          },
        ]
      : []),
    {
      title: <p>Submit Query</p>,
      content: <QueryModal id={id} close={close} refetch={refetch} />,
    },
    {
      title: <p>Cancel Job</p>,
      content: <CancelModal id={id} close={close} refetch={refetch} />,
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} type="charts" />
    </div>
  );
};

export default ActionModal;
