import styled from "styled-components";
import { PropsWithChildren, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import {
  useStarknet,
  useStarknetInvoke,
  useStarknetTransactionManager,
} from "@starknet-react/core";
import { NFTStorage } from "nft.storage";
import process from "process";
import { useUserRegistryContract } from "~/hooks/UserRegistry";
import { encodeShortString } from "starknet/dist/utils/shortString";
import { divideLongString } from "../utils/core";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";

export type RegisterFormData = {
  name?: string;
  description?: string;
  github?: string;
  telegram?: string;
  twitter?: string;
  file?: File;
};

export default function Registration() {
  const [formData, setFormData] = useState<RegisterFormData>();
  const { account } = useStarknet();
  const [buttonMsg, setButtonMsg] = useState("Register");
  const { contract: cUserRegistry } = useUserRegistryContract();
  const { transactions } = useStarknetTransactionManager();
  const { invoke: callRegister } = useStarknetInvoke({
    contract: cUserRegistry,
    method: "register",
  });
  const submitForm = async () => {
    if (
      formData === undefined ||
      !formData?.name ||
      !formData?.description ||
      !formData?.github ||
      !formData?.file
    ) {
      alert("Please fill in all required data!");
    } else {
      setButtonMsg("Storing in Ipfs ...");
      const nftStorageClient = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
      });
      const nftMetadata = await nftStorageClient.store({
        image: formData.file,
        name: formData.name,
        description: formData.description,
      });
      setButtonMsg("Loading...");

      //github usernames can have up to 39 characters
      //second part of the string is hardcoded to "." if the string is less than 31

      //parse github username
      let githubPrefix, githubSuffix;
      if (formData.github.length > 31) {
        githubPrefix = formData.github.slice(0, 31);
        githubSuffix = formData.github.slice(31, formData.github.length);
        githubSuffix.concat(".");
      } else {
        githubPrefix = formData.github;
        githubSuffix = ".";
      }
      //parse nft metadata url
      let metadataURI = divideLongString(nftMetadata["url"]).map((item) => {
        return encodeShortString(item);
      });

      console.log(githubPrefix, githubSuffix, metadataURI);

      await callRegister({
        args: [
          encodeShortString(githubPrefix),
          encodeShortString(githubSuffix),
          metadataURI,
        ],
        metadata: { method: "register", message: "register user" },
      });
      setButtonMsg("Register");
    }
  };

  const fileChangeHandler = (file: File) => {
    setFormData((prevState) => ({
      ...prevState,
      file,
    }));
  };

  const makeChangeHandler = (keyName: string) => (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [keyName]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Title>Registration</Title>
      </TitleContainer>
      <SectionContainer>
        <SectionTitle required>Name</SectionTitle>
        <SectionInput
          placeholder="Your name"
          onChange={makeChangeHandler("name")}
          required
        />
        <SectionTitle required>Description</SectionTitle>
        <SectionTextarea
          placeholder="Write a short description to introduce yourself."
          rows={4}
          maxLength={50}
          required
          onChange={makeChangeHandler("description")}
        />
        <SectionTitle required>Github</SectionTitle>
        <SectionInput
          placeholder="Your github account"
          onChange={makeChangeHandler("github")}
        />
        <SectionTitle>Telegram Handle</SectionTitle>
        <SectionInput
          placeholder="Your telegram handle"
          onChange={makeChangeHandler("telegram")}
        />
        <SectionTitle>Website</SectionTitle>
        <SectionInput
          placeholder="Your twitter handle"
          onChange={makeChangeHandler("twitter")}
        />
        <SectionTitle required>Image</SectionTitle>
        <FileUploaderContainer>
          <FileUploader
            handleChange={fileChangeHandler}
            types={["jpg", "png", "gif"]}
          />
        </FileUploaderContainer>
      </SectionContainer>
      <PrimaryBlueButton onClick={submitForm}>Register</PrimaryBlueButton>
    </Wrapper>
  );
}

const SectionTitle = ({
  children,
  required = false,
}: PropsWithChildren<{ required?: boolean }>) => {
  return (
    <SectionTitleText>
      {children} {required ? <span style={{ color: "red" }}>*</span> : <></>}
    </SectionTitleText>
  );
};

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

const SectionContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const SectionTitleText = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

const SectionInput = styled.input`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #cccccc;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  ::placeholder {
    color: #9a9b9c;
  }
`;

const SectionTextarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #cccccc;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  ::placeholder {
    color: #9a9b9c;
  }
`;

const FileUploaderContainer = styled.div`
  label {
    border: dashed 2px #ccc;
  }
  margin-bottom: 1.5rem;
`;
