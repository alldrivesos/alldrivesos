import { FC, PropsWithChildren } from "react";
import Button from "./Button";
import { BeatLoader } from "react-spinners";

interface Props extends PropsWithChildren {
  title: string;
  closeModal: () => void;
  action: () => void;
  cancelTitle: string;
  actionTitle: string;
  isBusy: boolean;
}
const ReusableModal: FC<Props> = ({
  title,
  closeModal,
  action,
  cancelTitle,
  actionTitle,
  isBusy,
  children,
}) => {
  return (
    <div className="px-4">
      <img
        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1705594002/rsh/transparent-warning-sign-triangle-sign-with-yellow-background-and-exclamati6571913b7d52b6.0212584217019415635133-removebg-preview_vedpnz.png"
        alt="warning"
        width={120}
        height={120}
        className="mx-auto"
      />
      <div className="px-6 text-black text-center">{title}</div>
      <div>{children}</div>
      <div className="w-full mt-8 flex justify-between">
        <Button
          altClassName="py-2 px-3 lg:px-6 rounded  bg-red-600 text-white"
          title={cancelTitle}
          onClick={closeModal}
        />
        <Button
          altClassName="py-2 px-3 lg:px-6 rounded bg-primary text-white"
          title={isBusy ? <BeatLoader size={10} color="white" /> : actionTitle}
          onClick={action}
        />
      </div>
    </div>
  );
};

export default ReusableModal;
