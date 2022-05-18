import { useMoralisQuery, useMoralis, useERC20Balances, useMoralisWeb3Api, useNativeBalance } from "react-moralis";
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
    //const { fetchERC20Balances, info, isLoading, isFetching, error } = useERC20Balances();
    const Web3Api = useMoralisWeb3Api();
    //const { getBalances, data: balance, nativeToken, error, isLoading } = useNativeBalance({ chain : "mumbai" });
    const { data: balance } = useNativeBalance({ chain : "mumbai" });

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

    const fetchTokenBalances = async () => {
        const options = {
            chain: "mumbai",
          };
        const balances = await Web3Api.account.getTokenBalances(options);
        console.log("++" ,balances);
      };

    const pay = async function () {
        if (isAuthenticated) {
            console.log("start payment");
            console.log(user.attributes.ethAddress);
            console.log(data['attributes'].claim_wallet);

            await Moralis.enableWeb3();
            const balances = await Moralis.Web3API.account.getTokenBalances({chain: "mumbai"});
            console.log("++" ,balances);

            //fetchTokenBalances();
            //console.log(balance.formatted)
            //await fetchERC20Balances()
            //console.log("+++", info, "+++")

            const tokenInfo = { chain: "mumbai", symbols: "MATIC" };
            const tokenMetadata = await Moralis.Web3API.token.getTokenMetadataBySymbol(tokenInfo);
            //console.log(tokenMetadata)
            const contractAddress = tokenMetadata?.address;
            //console.log(contractAddress);
            const web3 = await Moralis.enableWeb3();

            /*const options = {
                type: "erc20", 
                amount:Moralis.Units.Token("0.000001", "18"), 
                receiver: "0x40A58f3428886DA65A5b305a68EB1cac9c801d5C", 
                contractAddress: "0x2fbc97e030d450b3580dbbb54ee4165dd78f6817"
            }
            let result = await Moralis.transfer(options)
            console.log(result);*/
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