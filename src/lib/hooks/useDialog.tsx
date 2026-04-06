import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  export interface ModalProps {
    title: string;
    children: JSX.Element;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  }
const useDialog = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal = (state:boolean) => setModal(state);
  const closeModal = () => setModal(false)

  const Dialog: React.FC<ModalProps> = ({ title, children, size}) => {
    return (
        <>
          <Modal size={size} blockScrollOnMount={false} isCentered motionPreset='slideInBottom' isOpen={showModal} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent className="pb-4">
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                    {children}
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
  };

  return { Dialog, showModal, setShowModal };
};

export default useDialog;
