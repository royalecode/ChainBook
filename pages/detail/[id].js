import Head from 'next/head'
import Navbar from "../../components/navbar"


export default function Detail() {

  return (
    <div>
        <Head>
            <title>ChainBook - Detail</title>
            <meta name="description" content="Online Blockchain library"/>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar/>

        <div>
          <p>Loading detail book</p>
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
