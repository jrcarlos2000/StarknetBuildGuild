import Connect from "./connect";
import styled from "styled-components";
import Link from "next/link";

const NavItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Builds", href: "/builds" },
];

export default function Header({ account }: any) {
  return (
    <Wrapper>
      <LogoContainer>
        <Logo src="" />
        <h3>BuidlGuidl</h3>
      </LogoContainer>
      <Nav>
        {NavItems.map((item) => (
          <Link href={item.href}>
            <NavItem>{item.title}</NavItem>
          </Link>
        ))}
      </Nav>
      <Connect account={account} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const LogoContainer = styled.div``;

const Logo = styled.img``;

const Nav = styled.div``;

const NavItem = styled.a`
  &:hover {
    cursor: pointer;
  }
`;
