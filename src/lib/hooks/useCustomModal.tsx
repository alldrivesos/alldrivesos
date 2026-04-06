// "use client";
import React, { useState } from "react";
interface ModalProps {
  title: string;
  children: JSX.Element;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
const useCustomModal = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal = (state: boolean) => setModal(state);
  const closeModal = () => setModal(false);

  const Dialog: React.FC<ModalProps> = ({ title, children }) => {
    return (
      <>
        {showModal && (
          <div
            className="relative z-[2000]"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>

            <div
              className="fixed inset-0 z-10 h-screen w-screen overflow-y-auto"
              onClick={closeModal}
            >
              <div className="place-center min-h-full p-4 text-center sm:items-center sm:p-0">
                <div
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[90vw] lg:w-[75vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-lg fw-500">{title}</div>
                  <div>{children}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return { Dialog, showModal, setShowModal };
};

export default useCustomModal;
