import Head from 'next/head'

import CoverSection from '../components/Home/CoverSection'
import DescriptionSection from '../components/Home/DescriptionSection'
import ValuesSection from '../components/Home/ValuesSection'
import ContactSection from '../components/Home/ContactSection'

export default function Home() {
  return (
    <div>
      <Head>
        <title>ChainBook - Home</title>
        <meta name="description" content="Online Blockchain library"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CoverSection/>
        <DescriptionSection/>
        <ValuesSection/>
        <ContactSection/>
        <style jsx>{`
          main {
            width: 100%;
            height: 100vh;
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
          }
        `}</style>
      </main>


    </div>
  )
}
