import { useMoralisQuery, useMoralis, useERC20Balances, useMoralisWeb3Api, useNativeBalance } from "react-moralis";
import { useWeb3Transfer } from "react-moralis";
import {useState, useEffect} from "react"
import {useRouter} from "next/router";
import styles from "../../styles/Detail/Payment.module.css";
import Link from "next/link";
import Image from "next/image";
import polygon_icon from "../../public/detail/polygon_icon_light.svg";
import lock_closed from "../../public/detail/lock_close.svg";
import lock_open from "../../public/detail/lock_open.svg";

export default function Payment({data}) {
      
    const { Moralis, user, isAuthenticated, authenticate, web3, enableWeb3 } = useMoralis();
    const [bought, setBought] = useState(false);
    const router = useRouter();

    useEffect(() => {
        Moralis.enableWeb3();
        if (isAuthenticated && user != null) {
            if (user.attributes.books?.indexOf(data['id']) > -1) {
                setBought(true);
            }
        }
    }, [Moralis, data, isAuthenticated, user])


    const readBook = async function () {
        router.push(`/read/${data['attributes'].hashFile}`);
    }

    const { fetch, error, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.Token(0.01),
        receiver: "0x40A58f3428886DA65A5b305a68EB1cac9c801d5C",
        type: "erc20",
        contractAddress: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    });

    const TransferWeth = async () => {
        const { fetch, error, isFetching } = useWeb3Transfer({
          amount: Moralis.Units.Token(2, 18),
          receiver: "0x40A58f3428886DA65A5b305a68EB1cac9c801d5C",
          type: "erc20",
          contractAddress: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        });
    }

    console.log(error)

    const pay = async function () {
        if (isAuthenticated) {
            console.log("start payment");
            console.log(user.attributes.ethAddress);
            console.log(data['attributes'].claim_wallet);

            //0x40A58f3428886DA65A5b305a68EB1cac9c801d5C
            //0x9311818E3ea3C65B7DF2D1bA0FBd4D78D23d0758
            const options = {
                type: "erc20", 
                amount: Moralis.Units.Token("1", "18"), 
                receiver: "0x9311818E3ea3C65B7DF2D1bA0FBd4D78D23d0758", 
                contractAddress: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
            }
            let result = await Moralis.transfer(options)
            console.log(result);

            /*const update = async () => {
                console.log(user.attributes.books);
                let books = user.attributes.books;
                books.push("qxudCvJASSbhpyxUziH8HEv1");
                user.set("books", books);
                await user.save();
                console.log(user.attributes.books);
            }*/
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
                    <button className={styles.pay} disabled={bought} onClick={() => fetch()}>
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