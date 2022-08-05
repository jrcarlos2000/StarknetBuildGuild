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
  width: calc(100%);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #282b2f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #0f0f0f;
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
  font-size: 1.3rem;
  font-weight: 600;
`;

const Nav = styled.div``;

const NavItem = styled.a`
  margin-left: 1.3rem;

  &:hover {
    cursor: pointer;
  }
`;
