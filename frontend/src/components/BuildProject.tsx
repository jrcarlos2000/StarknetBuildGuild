import styled, { css, keyframes } from "styled-components";
import { BiLinkExternal, BiAddToQueue, BiMoney } from "react-icons/bi";
import Link from "next/link";
import Account from "./Account";
import Image from "next/image";
import castle from "../../assets/image/castle.png";
import { useEffect, useState } from "react";
import { FaDonate } from "react-icons/fa";
import DonateModal from "./DonateModal";
import { LikeButton } from "./commons/LikeButton";
import { OutlineButton } from "../components/commons/OutlineButton";
import { Button } from "./commons/Button";
import { AiFillCheckCircle } from "react-icons/ai";
import { AddProjectToPoolModal } from "./AddProjectToPoolModal";

export default function BuildProject({
  filteredProject,
  pools,
  isProjectOwner,
}: {
  filteredProject: any;
  pools: any[];
  isProjectOwner: boolean;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedToPool, setIsAddedToPool] = useState(true);
  const [isDonateModalOpen, setDonateModalOpen] = useState(false);
  const [isAddProjectToPoolModalOpen, setAddProjectToPoolModalOpen] =
    useState(false);

  const myProject = filteredProject[0];
  if (!myProject) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      {/* Modals */}
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setDonateModalOpen(false)}
      />
      <AddProjectToPoolModal
        pools={pools}
        isOpen={isAddProjectToPoolModalOpen}
        onClose={() => setAddProjectToPoolModalOpen(false)}
      />

      {/* Contents */}
      <MainContainer>
        <ProjectInfo>
          <Flex>
            <TitleContainer>
              <Title>{myProject.title}</Title>
              {isProjectOwner ? (
                <></>
              ) : (
                <FaDonate
                  onClick={() => {
                    setDonateModalOpen(true);
                  }}
                />
              )}
            </TitleContainer>
            {isProjectOwner ? (
              <PoolButtonContainer>
                {isAddedToPool ? (
                  <ClaimButton>
                    <ButtonContent>
                      Claim <BiMoney size={20} />
                    </ButtonContent>
                  </ClaimButton>
                ) : (
                  <></>
                )}
                <AddProjectToPoolButton
                  isAddedToPool={isAddedToPool}
                  onClick={() => setAddProjectToPoolModalOpen(true)}
                >
                  {isAddedToPool ? (
                    <ButtonContent>
                      Project Added <AiFillCheckCircle />
                    </ButtonContent>
                  ) : (
                    <ButtonContent>
                      Add Project To Pool <BiAddToQueue />
                    </ButtonContent>
                  )}
                </AddProjectToPoolButton>
              </PoolButtonContainer>
            ) : (
              <></>
            )}
          </Flex>
          <ButtonContainer>
            <Link href="/">
              <CodeButton onClick={() => console.log("code clicked")}>
                Code
                <BiLinkExternal />
              </CodeButton>
            </Link>
            <Link href="/">
              <DemoButton onClick={() => console.log("demo clicked")}>
                Live Demo
                <BiLinkExternal />
              </DemoButton>
            </Link>
            <LikeButton
              likeCount={31}
              isLiked={isLiked}
              onClick={() => setIsLiked(!isLiked)}
            />
          </ButtonContainer>
          <Description>{myProject.description}</Description>
        </ProjectInfo>
        <Account />
      </MainContainer>
      <Link href={myProject.link}>
        <ThumbnailContainer>
          <Thumbnail src={castle} layout="fill" objectFit="cover" />
        </ThumbnailContainer>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  border: 1px solid #e5e6e6;
  border-radius: 5px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const ThumbnailContainer = styled.div`
  border: 1px solid #e5e6e6;
  width: 200px;
  height: 240px;
  position: relative;
`;
const Thumbnail = styled(Image)``;

const MainContainer = styled.div`
  width: 100%;
  margin-right: 2rem;
`;
const ProjectInfo = styled.div``;

const flashing = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const flashIcon = css`
  animation: ${flashing} 1500ms linear infinite;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled(Flex)`
  & > svg {
    font-size: 1.3rem;
    ${flashIcon}
    &:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.strong`
  font-size: 1.3rem;
  margin-right: 1.3rem;
`;

const Description = styled.p``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1.5rem 0;
  &:hover {
    cursor: pointer;
  }
`;

const CodeButton = styled(OutlineButton)`
  margin-right: 0.5rem;
  & > svg {
    margin-left: 0.3rem;
  }
`;

const DemoButton = styled(OutlineButton)`
  margin-right: 0.5rem;
  & > svg {
    margin-left: 0.3rem;
  }
`;

const poolButtonStyle = css<{ isAddedToPool: boolean }>`
  ${(props) =>
    props.isAddedToPool === true &&
    css`
      color: #7853f7;
      border: 1px solid #7853f7;
      background-color: #fff;
    `}
`;

const AddProjectToPoolButton = styled(Button)`
  ${poolButtonStyle}
  margin-left: 1rem;
`;

const ClaimButton = styled(Button)``;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  & > p {
    line-height: 0;
    margin-right: 0.5rem;
  }
  & > svg {
    margin-left: 0.3rem;
  }
`;

const PoolButtonContainer = styled.div``;
