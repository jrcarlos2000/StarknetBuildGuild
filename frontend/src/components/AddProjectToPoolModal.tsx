import { ComponentProps, useState } from "react";
import { CustomModal } from "./commons/modal";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";

export const AddProjectToPoolModal = ({
  isOpen,
  onClose,
}: Omit<ComponentProps<typeof CustomModal>, "title">) => {
  return (
    <CustomModal title="Add Project to Pool" isOpen={isOpen} onClose={onClose}>
      <PrimaryBlueButton>Submit</PrimaryBlueButton>
    </CustomModal>
  );
};
