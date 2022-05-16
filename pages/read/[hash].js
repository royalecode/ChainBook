import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


export default function BookInfo( {hash} ) {

  console.log(hash['params']['hash']);

  return (
    <div>
        <Head>
            <title>ChainBook - Detail</title>
            <meta name="description" content="Online Blockchain library"/>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">  
            <Viewer fileUrl={`https://gateway.moralisipfs.com/ipfs/${hash['params']['hash']}`}/>
        </Worker>
    </div>
  )
}

export const getServerSideProps = ({ params }) => {
  const hash = { params }
  return {
    props: {
      hash
    }
  }
}