import { useConnectors } from "@starknet-react/core";
import styled from "styled-components";
import Modal from "react-modal";
import ConnectModal from "./ConnectModal";
import { useRouter } from "next/router";
import Link from "next/link";
Modal.setAppElement("#__next");

type ConnectWalletProps = { account: string | undefined };

export default function ConnectWallet({ account }: ConnectWalletProps) {
  const { disconnect } = useConnectors();
  const router = useRouter();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#0a0b0d",
      padding: 0,
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(10, 11, 13, 0.75)",
    },
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Account: {account}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <div>
          <Link href={"/?connect=1"}>
            <Button>Connect Wallet</Button>
          </Link>
          <Modal
            isOpen={!!router.query.connect}
            onRequestClose={() => router.push("/")}
            style={customStyles}
          >
            <ConnectModal />
          </Modal>
        </div>
      )}
    </div>
  );
}

const Button = styled.div`
  border: 1px solid #282b2f;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.4rem;
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;
