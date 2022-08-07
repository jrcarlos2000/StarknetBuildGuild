import styled, { css } from "styled-components";
import { useStarknet } from "@starknet-react/core";
import Image from "next/image";
import castle from "../../assets/image/castle.png";
import { FiCopy } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function Account({
  thumbnail = false,
  copyable = false,
  size = "small",
}: {
  thumbnail?: boolean;
  copyable?: boolean;
  size?: "small" | "large";
}) {
  const { account } = useStarknet();
  const [copied, setCopied] = useState<boolean>(false);

  function onCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Wrapper>
      {thumbnail ? <Picture src={castle} width="45px" height="45px" /> : <></>}
      <Address size={size}>
        {account?.slice(0, 6)}...{account?.slice(-4)}
      </Address>
      {copyable && account ? (
        <CopyToClipboard text={account} onCopy={onCopy}>
          <CopyButtonContainer>
            {copied ? <TiTick fill="green" size={24} /> : <FiCopy size={20} />}
          </CopyButtonContainer>
        </CopyToClipboard>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

const sizeStyles = css<{ size: string }>`
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 1.8rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1rem;
    `}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Picture = styled(Image)`
  border-radius: 20%;
`;

const Address = styled.p`
  margin-left: 1rem;
  ${sizeStyles}
`;

const CopyButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
  margin-left: 0.75rem;
  display: flex;
`;
