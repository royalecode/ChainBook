import Link from "next/link"
import Image from "next/image"
import metamask_icon from '../../public/home/metamask_icon.svg'
import styles from '../../styles/Home/CoverButton.module.css'

import { useMoralis } from "react-moralis"

export default function CoverButton ({title, icon=false}) {
    
    const {isAuthenticated, authenticate, authError, logout} = useMoralis(); 
    
    if (!title) return null
    
    if (icon) {
        if (!isAuthenticated) {
            return (
                <button className={styles.login} onClick={authenticate}>
                    <div>
                        <Image
                            src={metamask_icon}
                            alt="Metamask Icon"
                            priority
                        />
                        <p className={styles.login_title}>Login with Metamask</p>
                    </div>
                </button>
            )
        } else {
            return (
                <button className={styles.login} onClick={logout}>
                    <div>
                        <Image
                            src={metamask_icon}
                            alt="Metamask Icon"
                            priority
                        />
                        <p className={styles.login_title}>Logout</p>
                    </div>
                </button>
            )
        }
    }

    return (
        <Link href="/catalogue">
            <a className={styles.catalogue}>Catalogue</a>
        </Link>
    )
}
