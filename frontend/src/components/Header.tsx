import Connect from "./Connect";
import styled from "styled-components";
import Link from "next/link";

const NavItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Builds", href: "/builds" },
];

export default function Header({ account }: any) {
  return (
    <Wrapper>
      <NavContainer>
        <LogoContainer>
          <Link href="/">
            <Logo>BuidlGuidl</Logo>
          </Link>
        </LogoContainer>
        <Nav>
          {NavItems.map((item) => (
            <Link href={item.href}>
              <NavItem>{item.title}</NavItem>
            </Link>
          ))}
        </Nav>
      </NavContainer>
      <Connect account={account} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Nav = styled.div``;

const NavItem = styled.a`
  &:hover {
    cursor: pointer;
  }
`;
