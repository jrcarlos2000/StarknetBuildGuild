import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { BigNumber, utils } from "ethers";
import { useState } from "react";

export default function DonateModal({
  setIsOpenModal,
}: {
  setIsOpenModal: any;
}) {
  const [value, setValue] = useState<any>();
  const onChangeValue = (e: any) => {
    setValue(utils.parseEther(e));
  };
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Donate</Title>
        <CancelButton>
          <AiOutlineClose
            onClick={() => {
              setIsOpenModal(false);
            }}
          />
        </CancelButton>
      </TitleContainer>
      <SectionContainer>
        <SectionTitle>Amount</SectionTitle>
        <SectionInput
          placeholder="ETH"
          value={value}
          onChange={onChangeValue}
        />
      </SectionContainer>
      <Button>Submit</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p``;

const CancelButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const SectionContainer = styled.div``;

const SectionTitle = styled.p``;

const SectionInput = styled.input``;

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`;
