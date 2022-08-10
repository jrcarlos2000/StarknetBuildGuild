import { MouseEventHandler } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import styled from "styled-components";
import { OutlineButton } from "./OutlineButton";

export const LikeButton = ({
  likeCount = 0,
  isLiked = false,
  onClick,
}: {
  likeCount: number;
  isLiked?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <OutlineButtonWithoutUnderline onClick={onClick}>
      {isLiked ? (
        <BsSuitHeartFill size={16} style={{ color: "red" }} />
      ) : (
        <BsSuitHeart size={16} />
      )}
      <LikeButtonText>31</LikeButtonText>
    </OutlineButtonWithoutUnderline>
  );
};

const OutlineButtonWithoutUnderline = styled(OutlineButton)`
  :hover {
    text-decoration: none;
  }
  display: flex;
`;

const LikeButtonText = styled.p`
  margin: 0;
  padding: 0;
  margin-left: 0.5rem;
`;
