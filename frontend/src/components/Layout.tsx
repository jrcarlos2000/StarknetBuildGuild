import Header from "./Header";
import {
  useStarknet,
  useConnectors,
  StarknetProvider,
} from "@starknet-react/core";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
