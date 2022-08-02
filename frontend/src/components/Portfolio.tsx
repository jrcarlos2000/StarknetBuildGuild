import styled from "styled-components";
import Link from "next/link";
import Modal from "react-modal";
import { useRouter } from "next/router";
Modal.setAppElement("#__next");
import { useState } from "react";
import NewBuildModal from "./NewBuildModal";

const BuildsList = [
  { name: "Build 1", id: 1 },
  { name: "Build 2", id: 2 },
  { name: "Build 3", id: 3 },
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
        <>
          {BuildsList.map((item) => (
            <BuildsItem>{item.name}</BuildsItem>
          ))}
        </>
      </BuildsContainer>
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

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const BuildsContainer = styled.div`
  border: 1px solid black;
`;

const BuildsItem = styled.div``;
