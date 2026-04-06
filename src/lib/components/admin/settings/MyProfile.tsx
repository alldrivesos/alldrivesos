// "use client";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/authUser";
import useModal from "../../../hooks/useModal";
import ProfileAvatar from "../../ui/ProfileAvatar";
import UpdateProfile from "./UpdateProfile";
import { useMutation } from "@tanstack/react-query";
import { adminUpdateAvatar } from "../../../services/api/authApi";

const MyProfileSettings = () => {
  const { user, firstName, lastName, saveUser } = useAuth();
  const { Modal, setShowModal } = useModal();
  const [isBusy, setIsBusy] = useState(false);
  const mutation = useMutation({
    mutationFn: adminUpdateAvatar,
    onSuccess: (data) => {
      const payload = {
        ...user,
        image: data.user.photo,
      };
      toast.success(data.message);
      saveUser(payload);
      setIsBusy(false);
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });
  const handleChangePicture = async (
    e: React.ChangeEvent<HTMLInputElement | null>,
  ) => {
    setIsBusy(true);
    if (!e.target.files) return;
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("photo", files);
    mutation.mutate(fd);
  };
  return (
    <>
      <div className="bg-gray-100 rounded p-4 lg:p-5">
        <p className="text-lg fw-600">My Profile</p>
        <div className="mt-4 border-2 border-[#808080] px-8 py-4 lg:py-6 flex justify-between rounded-[15px]">
          <div className="flex items-center">
            <div className="flex">
              <ProfileAvatar
                size={102}
                url={user.image}
                name={user.name}
                font={28}
              />
              <div className="relative overflow-hidden bg-gray-600 h-9 w-9 flex items-center justify-center circle top-[73px] -left-7 ">
                {!isBusy && <FaCamera className="text-lg text-white mb-1" />}
                <input
                  type="file"
                  accept="image/*"
                  name="profile"
                  id="profile"
                  onChange={handleChangePicture}
                  className="absolute top-0 -left-6 opacity-0"
                />
              </div>
            </div>
            <div>
              <p className="fw-500">{`${user.name}`}</p>
              <p className="text-gray-500">{user.account}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:my-8 border-2 border-[#808080] overflow-hidden px-8 py-4 lg:pt-6 lg:pb-10 rounded-[15px]">
          <div className="w-full flex justify-between items-center">
            <p className="fw-500 ">Personal Information</p>
            <button
              className="font-light flex gap-x-1 items-center px-3 py-1 text-gray-400 border border-gray-400 rounded-[15px]"
              onClick={() => setShowModal(true)}
            >
              Edit <BiEditAlt />
            </button>
          </div>
          <div className="mt-5 lg:w-11/12 2xl:w-10/12 grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-[#808080]">First Name</p>
              <p className="mt-3 fw-500">{firstName}</p>
            </div>
            <div>
              <p className="text-[#808080]">Last Name</p>
              <p className="mt-3 fw-500">{lastName}</p>
            </div>
            <div>
              <p className="text-[#808080]">Email Address</p>
              <p className="mt-3 fw-500">{user.email}</p>
            </div>
            <div>
              <p className="text-[#808080]">Phone</p>
              <p className="mt-3 fw-500">{user.phone}</p>
            </div>
            <div>
              <p className="text-[#808080]">Address</p>
              <p className="mt-3 fw-500">{user.state && user.state}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal title="Update Profile" size="md" type="withCancel">
        <UpdateProfile close={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default MyProfileSettings;
