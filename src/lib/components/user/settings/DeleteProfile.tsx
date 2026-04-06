import { toast } from "react-toastify";
import useModal from "../../../hooks/useModal";
import useAuthStore from "../../../store/userStore";
import Button from "../../ui/Button";
import ReusableModal from "../../ui/ReusableModal";
import TextInput, { InputType } from "../../ui/TextInput";
import { useNavigate } from "react-router-dom";
import { deleteMe } from "../../../services/api/usersApi";

const DeleteProfile = () => {
  const navigate = useNavigate();
  const { Modal, setShowModal } = useModal();
  const resetUser = useAuthStore((state) => state.clearUser);
  const deleteUser = async () => {
    await deleteMe()
    .then(() => {
        resetUser();
        localStorage.clear();
        toast.success("Successfully Deleted your account");
        navigate("/");
    })
    .catch(() => {
        toast.error("Something went wrong");
    })
  };
  return (
    <div>
      <div className="bg-gray-100 p-4 rounded">
        <div>
          <p className="text-lg lg:text-2xl fw-600">Delete Profile</p>
          <div className="mt-6">
            <p>
              We&apos;re sorry to see you go! Before you delete your account, we
              would appreciate it if you could take a moment to let us know the
              reason for your decision. Your feedback helps us improve our
              services and better serve our users in the future. Thank you!
            </p>
          </div>
          <div className="mt-12">
            <TextInput type={InputType.textarea} placeholder="Write here...." />
          </div>
          <div className="flex justify-end mt-6">
            <Button
              title={"Delete Account"}
              altClassName="btn-primary px-6 py-2"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </div>
      <Modal title="" size="md">
        <ReusableModal
          title="Are you sure you want to delete your account, you are about to delete all of the data in your AllDrive account"
          cancelTitle="Close"
          closeModal={() => setShowModal(false)}
          actionTitle="Yes, Delete"
          action={() => deleteUser()}
          isBusy={false}
        />
      </Modal>
    </div>
  );
};

export default DeleteProfile;
