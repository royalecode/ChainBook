import { useMoralisQuery, useMoralis } from "react-moralis";
import {useState, useEffect} from "react"
import {useRouter} from "next/router";
import styles from "../styles/Payment.module.css";
import Link from "next/Link";
import Image from "next/image";
import polygon_icon from "../public/polygon_icon_light.svg";
import lock_closed from "../public/lock_close.svg";
import lock_open from "../public/lock_open.svg";

export default function Payment({data}) {
      
    const { user, isAuthenticated, authenticate } = useMoralis();
    const [bought, setBought] = useState(false);
    const router = useRouter();

    //console.log(user.attributes.books);

    useEffect(() => {
        if (isAuthenticated && user != null) {
            if (user.attributes.books.indexOf(data['id']) > -1) {
                setBought(true);
            }
        }
    }, [data, isAuthenticated, user])


    const readBook = async function () {
        router.push(`/read/${data['attributes'].hashFile}`);
    }

    const pay = async function () {
        if (isAuthenticated) {
            console.log("start payment");
            console.log(user.attributes.ethAddress);
            console.log(data['attributes'].claim_wallet);
        } else {
            authenticate();
        }
    }

    if (data['attributes'].isFree) {
        return (
            <Link href={`/read/${data['attributes'].hashFile}`} passHref>
                        <div className={styles.read_btn}>
                            <a className={styles.read_btn_text}>Start Reading</a>
                        </div>
            </Link>
        )
    }

    return (
        <div className={styles.box}>
            <div className={styles.payment}>
                <h3 className={styles.title}>Payment</h3>
                <div>
                    <button className={styles.pay} disabled={bought} onClick={pay}>
                        <div className={styles.price}>
                            <p>{data['attributes'].price} MATIC</p>
                            <div className={styles.icon}>
                                <Image
                                    src={polygon_icon}
                                    alt='Polygon Logo'
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <button className={styles.read_btn_pay} disabled={!bought} onClick={readBook}>
                <div>
                    <p>Start reading</p>
                    {bought && <Image
                        src={lock_open}
                        alt='Locker'
                        width={20}
                        height={20}
                    />}
                    {!bought && <Image
                        src={lock_closed}
                        alt='Locker'
                        width={20}
                        height={20}
                    />}
                </div>
            </button>
        </div>
    );
    
}