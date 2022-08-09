import styled from "styled-components";
import { PropsWithChildren, useState } from "react";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";
import { FileUploader } from "react-drag-drop-files";
import { CustomModal } from "./commons/modal";
import { FormInput } from "./commons/FormInput";
import { FormTextArea } from "./commons/FormTextArea";

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
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
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
      onClose();
    }
  };

  const makeChangeHandler = (keyName: string) => (e: any) => {
    let newValue = e.target.value;
    if (keyName === "coBuilders") {
      newValue = (newValue as string).split(",").map((v) => v.trim());
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
    <CustomModal title="New Build" isOpen={isOpen} onClose={onClose}>
      <SectionTitle required>Build name</SectionTitle>
      <FormInput
        placeholder="Build name"
        required
        onChange={makeChangeHandler("name")}
      />
      <SectionTitle required>Description</SectionTitle>
      <FormTextArea
        placeholder="Write a short description for this build. (Please include searchable keywords)"
        rows={4}
        required
        onChange={makeChangeHandler("description")}
      />
      <SectionTitle required>Public Repo URL</SectionTitle>
      <FormInput
        placeholder="https://..."
        required
        onChange={makeChangeHandler("repoUrl")}
      />
      <SectionTitle>Live Demo URL</SectionTitle>
      <FormInput
        placeholder="https://..."
        onChange={makeChangeHandler("liveDemoUrl")}
      />
      <SectionTitle>YouTube URL</SectionTitle>
      <FormInput
        placeholder="https://..."
        onChange={makeChangeHandler("youtubeUrl")}
      />
      <SectionTitle>Co-Builders</SectionTitle>
      <FormTextArea
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
      <PrimaryBlueButton onClick={submitForm}>Submit</PrimaryBlueButton>
    </CustomModal>
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

const SectionTitleText = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

const FileUploaderContainer = styled.div`
  label {
    border: dashed 2px #ccc;
  }
  margin-bottom: 1.5rem;
`;
