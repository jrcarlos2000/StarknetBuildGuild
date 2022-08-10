import { User } from "src/models/User";
import styled from "styled-components";



export default function Profile({
  account,
  user,
  className,
}: {
  account: any;
  user: User;
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
      <AccountWrapper>
        <Address>{user.name}</Address>
      </AccountWrapper>
      <Description>{user.description}</Description>
      <SocialMediaContainer>
        {user.socialMedia.map((item) => (
          <SocialMediaItem key={item.name}>{item.icon}</SocialMediaItem>
        ))}
      </SocialMediaContainer>
      <DateJoined>
        <p>Joined {user.joinDate}</p>
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
  margin-top: 5rem;
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

const Description = styled.div`
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 1.3rem;
  padding: 1rem 0.3rem;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const SocialMediaItem = styled.div`
  font-size: 1.3rem;
  margin-right: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;
const DateJoined = styled.div`
  color: #cacbcb;
`;
const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Address = styled.p`
  margin-left: 1rem;
  font-size: 1rem;
`;
