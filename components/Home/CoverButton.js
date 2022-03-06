import Link from "next/link"
import Image from "next/image"
import metamask_icon from '../../public/home/metamask_icon.svg'
import styles from '../../styles/Home/CoverButton.module.css'

export default function CoverButton ({title, icon=false}) {
    if (!title) return null
    
    if (icon) {
        return (
            <button className={styles.login}>
                <Image
                    src={metamask_icon}
                    alt="Metamask Icon"
                    priority
                />
                <p className={styles.login_title}>Login with metamask</p>
            </button>
        )
    }

    return (
        <Link href="/catalogue">
            <a className={styles.catalogue}>Catalogue</a>
        </Link>
    )
}
