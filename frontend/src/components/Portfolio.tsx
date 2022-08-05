import styled from "styled-components";
import Modal from "react-modal";
Modal.setAppElement("#__next");
import { useState } from "react";
import NewBuildModal from "./NewBuildModal";
import Project from "./Project";

const BuildsList = [
  // { name: "Build 1", id: 1 },
  // { name: "Build 2", id: 2 },
  // { name: "Build 3", id: 3 },
];

export default function Builds() {
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "1rem",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(168, 180, 202, 0.75)",
    },
  };
  return (
    <Wrapper>
      <TitleContainer>
        <Title>Builds</Title>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Submit New Build
        </Button>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <NewBuildModal setIsOpen={setIsOpen} />
        </Modal>
      </TitleContainer>
      <BuildsContainer>
        {BuildsList.length === 0 ? (
          <NoBuilds />
        ) : (
          BuildsList.map((item) => <Project key={item.id}>{item.name}</Project>)
        )}
      </BuildsContainer>
    </Wrapper>
  );
}
const NoBuilds = () => (
  <NoBuildsContainer>
    <NoBuildsText>This builder doesn&apos;t have any builds.</NoBuildsText>
  </NoBuildsContainer>
);

const Wrapper = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 1rem;
  color: #ffffff;
  background-color: #073898;
  border-radius: 7px;
  border: none;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const BuildsContainer = styled.div`
padding-top: 8px;
`;

const NoBuildsContainer = styled.div`
  display: flex;
  border: 1px solid #cacbcb;
  border-radius: 0.5rem;
  min-height: 200px;
  align-items: center;
`;

const NoBuildsText = styled.p`
  text-align: center;
  width: 100%;
  color: #4a5568;
`;
