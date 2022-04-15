import Head from "next/head"
import Navbar from "../components/navbar"

export default function Catalogue() {
    return (
      <div>
        <Head>
          <title>ChainBook - Catalogue</title>
          <meta name="description" content="Online Blockchain library"/>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar/>

      </div>
    )
}