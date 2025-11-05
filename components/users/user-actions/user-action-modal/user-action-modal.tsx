"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { ReactNode } from "react";

export interface UserActionModalProps {
  title: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UserActionModal({
  children,
  title,
  isOpen,
  onOpenChange,
}: UserActionModalProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="dark text-white"
      >
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
