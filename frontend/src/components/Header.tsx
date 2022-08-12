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
                selected={router.asPath === item.href}
                key={item.href}
                href={item.href}
                onClick={makeHandleClick(item.href)}
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
  margin-top: 0.5rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #0d122b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #7753f6;
  background-color: #0d122b;
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

const NavItem = styled.a<{ selected: boolean }>`
  text-decoration: none;
  color: ${(props) =>
    props.selected ? props.theme.purple : props.theme.white};
  margin-left: 1.3rem;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.lightPurple};
  }
`;
