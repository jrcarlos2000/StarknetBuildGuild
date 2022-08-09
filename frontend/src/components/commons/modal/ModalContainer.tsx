import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { PropsWithChildren } from "react";

export default function ModalContainer({
  title = "",
  onCloseClick,
  children,
}: PropsWithChildren<{
  title: string;
  onCloseClick: (...args: any[]) => void;
}>) {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>{title}</Title>
        <CancelButton>
          <AiOutlineClose onClick={onCloseClick} />
        </CancelButton>
      </TitleContainer>
      <ContentContainer>{children}</ContentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: "Open Sans", sans-serif;
  min-width: 350px;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0;
`;

const CancelButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
