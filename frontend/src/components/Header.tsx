import Connect from "./Connect";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const NavItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Builds", href: "/builds" },
];

export default function Header({ account }: any) {
  const router = useRouter();
  const makeStyle = (href: string) => ({
    color: router.asPath === href ? "blue" : "black",
  });
  const makeHandleClick = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Wrapper>
      <NavContainer>
        <LogoContainer>
          <Link href="/">
            <Logo>
              <strong>StarkGuild</strong>
            </Logo>
          </Link>
        </LogoContainer>
        {account && (
          <>
            {NavItems.map((item: any) => (
              <NavItem
                href={item.href}
                onClick={makeHandleClick(item.href)}
                style={makeStyle(item.href)}
              >
                {item.title}
              </NavItem>
            ))}
          </>
        )}
      </NavContainer>
      <Connect account={account} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100%);
  padding: 1rem 2rem;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #0f0f0f;
  background-color: #ffffff;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
`;

const LogoContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.a`
  font-size: 1.2rem;
`;

const NavItem = styled.a`
  text-decoration: none;
  margin-left: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;
