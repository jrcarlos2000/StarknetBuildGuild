import styled from "styled-components";
import { BigNumber, utils } from "ethers";
import { useState } from "react";
import { CustomModal } from "./commons/modal";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";
import { FormInput } from "./commons/FormInput";

export default function DonateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [value, setValue] = useState<any>();
  const onChangeValue = (e: any) => {
    setValue(utils.parseEther(e));
  };
  return (
    <CustomModal title="Donate" isOpen={isOpen} onClose={onClose}>
      <AmountFormInput
        placeholder="ETH"
        value={value}
        onChange={onChangeValue}
      />
      <PrimaryBlueButton>Submit</PrimaryBlueButton>
    </CustomModal>
  );
}

const AmountFormInput = styled(FormInput)`
  margin-bottom: 0.5rem;
`;
