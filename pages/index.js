import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import home_logo from '../public/home/home_logo.svg'
import arrow_down from '../public/home/arrow_down.svg'
import Main_Button from '../components/Main_Button'

export default function Home() {
  return (
    <div>
      <Head>
        <title>ChainBook</title>
        <meta name="description" content="Online Blockchain library"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.section1}>
          <div className={styles.section1_main}>
            <div className={styles.logo}>
              <Image
                src={home_logo}
                alt='ChainBook Logo'
                width={120}
                height={120}  
                priority
              />
            </div>
            <h1 className={styles.title}>ChainBook</h1>
            <p className={styles.subtitle}>
              Knowledge is for everyone, and so is the Blockchain.<br></br>
              Read, research, study, learn about the technology of the future.
            </p>
            <Main_Button title="Login with Metamask"/>
            <Main_Button title="Catalogue"/>
          </div>

          <div className={styles.section1_footer}>
            <Image
              src={arrow_down}
              alt='Down arrow'
              width={60}
              height={60}  
              priority
            />
          </div>
        </section>

      </main>
    </div>
  )
}
