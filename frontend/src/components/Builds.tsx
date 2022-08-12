import styled from "styled-components";
import { useState } from "react";
import NewBuildModal, { NewBuildFormData } from "./NewBuildModal";
import Project from "./Project";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";
import { useCoreContract } from "~/hooks/Core";
import {
  useStarknet,
  useStarknetInvoke,
  useStarknetTransactionManager,
} from "@starknet-react/core";
import { NFTStorage } from "nft.storage";
import { divideLongString, getCurrentDateStr } from "src/utils/core";
import { encodeShortString } from "starknet/dist/utils/shortString";

export default function Builds({ projects }: { projects: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { account } = useStarknet();
  const { contract: cCore } = useCoreContract();
  const { transactions } = useStarknetTransactionManager();
  const { invoke: callAddBuidl } = useStarknetInvoke({
    contract: cCore,
    method: "add_buidl",
  });
  const { invoke: callAddBuildToPool } = useStarknetInvoke({
    contract: cCore,
    method: "add_buidl_to_pool",
  });

  const onSubmit = async (data: NewBuildFormData) => {
    // UNCOMMENT HERE
    const nftStorageClient = new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
    });
    const currDateStr = getCurrentDateStr();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const nftMetadata = await nftStorageClient.store({
      image: data.images ? data.images[0] : blob,
      name: data.name ? data.name : "",
      description: data.description ? data.description : "",
      repoUrl: data.repoUrl,
      liveDemoUrl: data.liveDemoUrl,
      youtubeUrl: data.youtubeUrl,
      dateAdded: currDateStr,
    });
    //COMMENT HERE
    let metadataURI = divideLongString(nftMetadata["url"]).map((item) => {
      return encodeShortString(item);
    });
    await callAddBuidl({
      args: [metadataURI],
      metadata: { method: "add_buidl", message: "adding build" },
    });
  };

  return (
    <Wrapper>
      {/* Modal */}
      <NewBuildModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={onSubmit}
      />

      {/* Contents */}
      <TitleContainer>
        <Title>Builds</Title>
        <PrimaryBlueButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Submit New Build
        </PrimaryBlueButton>
      </TitleContainer>
      {!projects || projects.length === 0 ? (
        <NoBuilds />
      ) : (
        <BuildsContainer>
          {projects.map((p) => (
            <Project key={p.id} project={p} />
          ))}
        </BuildsContainer>
      )}
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
  width: 100%;
`;

const NoBuildsText = styled.p`
  text-align: center;
  width: 100%;
  color: #4a5568;
`;
