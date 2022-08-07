import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { PropsWithChildren, useState } from "react";
import { Button } from "./commons/Button";
import { FileUploader } from "react-drag-drop-files";

export type NewBuildFormData = {
  name?: string;
  description?: string;
  repoUrl?: string;
  liveDemoUrl?: string;
  youtubeUrl?: string;
  coBuilders?: string[];
  images?: FileList;
};

export type SubmitCallback = (data: NewBuildFormData) => void;

export default function NewBuildModal({
  setIsOpen,
  onSubmit,
}: {
  setIsOpen: any;
  onSubmit: SubmitCallback;
}) {
  const [formData, setFormData] = useState<NewBuildFormData>();

  const submitForm = () => {
    if (
      formData === undefined ||
      !formData?.name ||
      !formData?.description ||
      !formData?.repoUrl
    ) {
      alert("Please fill in all required data!");
    } else {
      onSubmit(formData);
      setIsOpen(false);
    }
  };

  const makeChangeHandler = (keyName: string) => (e: any) => {
    let newValue = e.target.value;
    if(keyName === 'coBuilders') {
      newValue = (newValue as string).split(',').map(v => v.trim());
    }
    setFormData((prevState) => ({
      ...prevState,
      [keyName]: newValue,
    }));
  };

  const multiFileUploadHandler = (files: FileList) => {
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

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
        <SectionTitle required>Build name</SectionTitle>
        <SectionInput
          placeholder="Build name"
          required
          onChange={makeChangeHandler("name")}
        />
        <SectionTitle required>Description</SectionTitle>
        <SectionTextarea
          placeholder="Write a short description for this build. (Please include searchable keywords)"
          rows={4}
          required
          onChange={makeChangeHandler("description")}
        />
        <SectionTitle required>Public Repo URL</SectionTitle>
        <SectionInput
          placeholder="https://..."
          required
          onChange={makeChangeHandler("repoUrl")}
        />
        <SectionTitle>Live Demo URL</SectionTitle>
        <SectionInput
          placeholder="https://..."
          onChange={makeChangeHandler("liveDemoUrl")}
        />
        <SectionTitle>YouTube URL</SectionTitle>
        <SectionInput
          placeholder="https://..."
          onChange={makeChangeHandler("youtubeUrl")}
        />
        <SectionTitle>Co-Builders</SectionTitle>
        <SectionTextarea
          placeholder="Seperate your co-builder's wallet address seperated by commas. E.g. 0x0..2132, 0x2..231"
          rows={3}
          onChange={makeChangeHandler("coBuilders")}
        />
        <SectionTitle>Images</SectionTitle>
        <FileUploaderContainer>
          <FileUploader
            handleChange={multiFileUploadHandler}
            types={["jpg", "png", "gif"]}
            multiple={true}
          />
        </FileUploaderContainer>
      </SectionContainer>
      <Button onClick={submitForm}>Submit</Button>
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

const CancelButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const SectionContainer = styled.div`
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
