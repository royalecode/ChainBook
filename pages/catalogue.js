import Head from "next/head"
import Navbar from "../components/Navbar"
import Downloads from "../components/Catalogue/Downloads"
import Solidity from "../components/Catalogue/Solidity"
import Farming from "../components/Catalogue/Farming"
import Staking from "../components/Catalogue/Staking"
import Bitcoin from "../components/Catalogue/Bitcoin"
import DeFi from "../components/Catalogue/DeFi"
import Trading from "../components/Catalogue/Trading"

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
          <DeFi />
          <Staking />
          <Trading />
          <Farming />
        </div>

      </div>
    )
}