import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import Account from "./Account";

type SocialMediaProps = {
  name: string;
  link: string;
  icon: any;
};

export type UserProps = {
  image: string;
  status: string;
  joined: string;
  socialMedia: SocialMediaProps[];
};

export default function Profile({
  account,
  user,
  className,
}: {
  account: any;
  user: UserProps;
  className?: string;
}) {
  if (!account) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper className={className}>
      <ProfilePictureWrapper>
        <ProfilePicture src={user.image} />
      </ProfilePictureWrapper>
      <Account copyable/>
      <SocialMediaContainer>
        {user.socialMedia.map((item) => (
          <SocialMediaItem>{item.icon}</SocialMediaItem>
        ))}
      </SocialMediaContainer>
      <DateJoined>
        <p>Joined {user.joined}</p>
      </DateJoined>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #cacbcb;
  border-radius: 0.5rem;
  padding: 14px;
  height: fit-content;
`;

const ProfilePictureWrapper = styled.div`
  display: flex;
  width: 208px;
  height: 208px;
  object-fit: cover;
  border-radius: 0.5rem;
  overflow: hidden;
  align-items: center;
  background: #f2f2f2;
`;

const ProfilePicture = styled.img`
  width: 100%;
`;

const AddressContainer = styled.div`
  display: flex;
`;

const Address = styled.p``;

const CopyButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
  display: flex;
`;

const Status = styled.div`
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 0 1rem;
  margin: 0 2rem;
`;

const UpdateButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
`;

const SocialMediaItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const DateJoined = styled.div`
  color: #4a5568;
`;
