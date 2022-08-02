import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
export default function NewBuildModal({ setIsOpen }: { setIsOpen: any }) {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>New Build</Title>
        <CancelButton>
          <AiOutlineClose
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </CancelButton>
      </TitleContainer>
      <SectionContainer>
        <SectionTitle>Build name</SectionTitle>
        <SectionInput placeholder="Build name" />
        <SectionTitle>Description</SectionTitle>
        <SectionInput placeholder="Write a short description for this build. (Please include searchable keywords)" />
        <SectionTitle>Public Repo URL</SectionTitle>
        <SectionInput placeholder="https://..." />
        <SectionTitle>Live Demo URL</SectionTitle>
        <SectionInput placeholder="https://..." />
        <SectionTitle>YouTube URL</SectionTitle>
        <SectionInput placeholder="https://..." />
        <SectionTitle>Co-Builders</SectionTitle>
        <SectionTitle>Image</SectionTitle>
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
