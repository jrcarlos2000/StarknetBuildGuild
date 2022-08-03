import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";

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
}: {
  account: any;
  user: UserProps;
}) {
  const [copied, setCopied] = useState(false);
  if (!account) {
    return <div>Loading...</div>;
  }
  function onCopy() {
    setCopied(true);
    alert("Copied to clipboard");
  }
  return (
    <Wrapper>
      <ProfilePicture src={user.image} />
      <AddressContainer>
        <Address>{account}</Address>
        <CopyToClipboard text={account} onCopy={onCopy}>
          <CopyButtonContainer>
            <FiCopy />
          </CopyButtonContainer>
        </CopyToClipboard>
      </AddressContainer>
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
  border: 1px solid black;
`;

const ProfilePicture = styled.img`
  width: 30%;
`;

const AddressContainer = styled.div`
  display: flex;
`;

const Address = styled.p``;

const CopyButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
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

const DateJoined = styled.div``;
