import {
  useStarknet,
  useConnectors,
  StarknetProvider,
} from "@starknet-react/core";
import ConnectWallet from "./ConnectWallet/connect";
import styled from "styled-components";

const NavItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
];

export default function Header() {
  const { account } = useStarknet();
  const { available, connect, disconnect } = useConnectors();

  return (
    <Wrapper>
      <LogoContainer>
        <Logo src="" />
        <h3>BuidlGuidl</h3>
      </LogoContainer>
      <Nav>
        {NavItems.map((item) => (
          <NavItem>{item.title}</NavItem>
        ))}
      </Nav>
      <>Header</>
      {account ? (
        <div>
          <p>Account: {account}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <ConnectWallet />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const LogoContainer = styled.div``;

const Logo = styled.img``;

const Nav = styled.nav``;

const NavItem = styled.div``;
