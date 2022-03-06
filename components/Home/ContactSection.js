import Image from 'next/image'
import styles from '../../styles/Home/ContactSection.module.css'

import linkedin_icon from '../../public/home/linkedin_icon.svg'
import twitter_icon from '../../public/home/twitter_icon.svg'
import instagram_icon from '../../public/home/instagram_icon.svg'
import arrow_up from '../../public/home/arrow_up_icon.svg'

export default function ContactSection() {
    return (
        <section className={styles.section}>
            <div className={styles.filter}>
                <div className={styles.contact}>
                    <h2 className={styles.title}>Contact Us</h2>
                    <div className={styles.icons}>
                        <a className={styles.anchor} href='https://www.linkedin.com/in/edmon-bosch-i-bosch/' target="_blank" rel='noreferrer'>
                            <Image
                                src={linkedin_icon}
                                alt='Linkedin'
                                width={48}
                                height={48}
                            />
                        </a>
                        <a className={styles.anchor} href='https://www.linkedin.com/in/edmon-bosch-i-bosch/' target="_blank" rel='noreferrer'>
                            <Image
                                src={twitter_icon}
                                alt='Twitter'
                                width={48}
                                height={48}
                            />
                        </a>
                        <a className={styles.anchor} href='https://www.linkedin.com/in/edmon-bosch-i-bosch/' target="_blank" rel='noreferrer'>
                            <Image
                                src={instagram_icon}
                                alt='Instagram'
                                width={48}
                                height={48}
                            />
                        </a>
                    </div>
                    <p className={styles.email}>chainbook@info.com</p>
                </div>

            </div>
        </section>
    )
}