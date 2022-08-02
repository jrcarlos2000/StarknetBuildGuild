import type { NextPage } from "next";

import Main from "~/components/Main";
import Header from "~/components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default Home;
