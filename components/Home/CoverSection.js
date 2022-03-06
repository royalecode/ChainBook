import Image from "next/image"
import CoverButton from "./CoverButton"

import styles from '../../styles/Home/CoverSection.module.css'
import home_logo from '../../public/home/home_logo.svg'
import arrow_down_icon from '../../public/home/arrow_down_icon.svg'

function scroll_page() {
  let pageHeight = window.innerHeight;
  window.scrollBy({
    top: pageHeight,
    left: 0,
    behavior: 'smooth'
  });
}

export default function CoverSection() {
    return (
        <section className={styles.section}>

          <div className={styles.center}>
            <div>
              <div className={styles.logo}>
                <Image
                  src={home_logo}
                  alt='ChainBook Logo'
                  width={140}
                  height={140}  
                  priority
                />
              </div>
              <h1 className={styles.title}>ChainBook</h1>
              <p className={styles.subtitle}>
                Knowledge is for everyone, and so is the Blockchain.<br></br>
                Read, research, study, learn about the technology of the future.
              </p>

              <div className={styles.button_container}>
                <CoverButton title="Login with Metamask" icon={true}/>
                <CoverButton title="Catalogue"/>
              </div>
            </div>
          </div>
          
          <div className={styles.arrow} onClick={scroll_page}>
            <Image
              src={arrow_down_icon}
              alt='Down arrow'
              width={60}
              height={60}  
              priority
            />
          </div>

        </section>
    )
}