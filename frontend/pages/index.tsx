import type { NextPage } from "next";
import { ConnectWallet } from "~/components/ConnectWallet";

const Home: NextPage = () => {
  return (
    <div>
      <h2>Wallet</h2>
      <ConnectWallet />
    </div>
  );
};

export default Home;
