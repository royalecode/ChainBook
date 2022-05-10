import Head from "next/head"
import Navbar from "../components/navbar"
import Downloads from "../components/Downloads"
import Solidity from "../components/Solidity"
import Farming from "../components/Farming"
import Staking from "../components/Staking"
import Bitcoin from "../components/Bitcoin"
import Defi from "../components/Defi"
import Trading from "../components/Trading"

export default function Catalogue() {

    return (
      <div>
        <Head>
          <title>ChainBook - Catalogue</title>
          <meta name="description" content="Online Blockchain library"/>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar/>

        <div id="library">
          <Downloads />
          <Solidity />
          <Bitcoin />
          <Defi />
          <Staking />
          <Trading />
          <Farming />
          <style jsx>{`
          div {
            padding-top: 30px;
            padding-bottom: 30px;
          }
        `}</style>
        </div>

      </div>
    )
}