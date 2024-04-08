import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";


const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Majime Content Verifier Dashboard</title>
        <meta
          name="description"
          content="Majime Content Verifier Dashboard"
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Basics;