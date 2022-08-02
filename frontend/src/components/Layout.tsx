import { useStarknet } from "@starknet-react/core";
import Header from "./Header";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const { account } = useStarknet();
  return (
    <>
      <Header account={account} />
      <main>{children}</main>
    </>
  );
}
