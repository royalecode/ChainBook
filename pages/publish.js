import Head from "next/head"
import Navbar from "../components/Navbar"
import Form from "../components/Publish/Form"
import BackButton from "../components/BackButton"

export default function Publish() {
  return (
    <div>
      <Head>
        <title>ChainBook - Catalogue</title>
        <meta name="description" content="Online Blockchain library"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>

      <Form/>
        
    </div>
  )
}