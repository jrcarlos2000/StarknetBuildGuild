import styled from "styled-components";
import Modal from "react-modal";
import { useState } from "react";
import NewBuildModal, { NewBuildFormData } from "./NewBuildModal";
import Project from "./Project";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";

Modal.setAppElement("#__next");

export default function Builds({ projects }: { projects: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingBottom: "2.5rem",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(168, 180, 202, 0.75)",
    },
  };

  const onSubmit = (data: NewBuildFormData) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Builds</Title>
        <PrimaryBlueButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Submit New Build
        </PrimaryBlueButton>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <NewBuildModal setIsOpen={setIsOpen} onSubmit={onSubmit} />
        </Modal>
      </TitleContainer>
      <BuildsContainer>
        {projects.length === 0 ? (
          <NoBuilds />
        ) : (
          projects.map((p) => <Project key={p.id} project={p} />)
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

const Wrapper = styled.div`
  margin-bottom: 3rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
`;

const BuildsContainer = styled.div`
  padding-top: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  margin: auto;
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
