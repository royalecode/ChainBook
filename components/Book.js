import Image from "next/image"
import Default_Image from "../public/default_book_image.png"
import styles from "../styles/Books.module.css"
import polygon_icon from "../public/publish/polygon_crypto_icon.svg"

export default function Library({data}) {

    const regExp = /[a-zA-Z]/g;

    return (
        <div>
            {!data['attributes'].isDefaultImage && 
            <div className={styles.image}>
                <Image
                    src={`https://gateway.moralisipfs.com/ipfs/${data['attributes'].hashImage}`}
                    layout="fill"
                    alt={data['attributes'].title}
                    priority
                />
            </div>}

            {data['attributes'].isDefaultImage && 
            <div className={styles.image}>
                <Image
                    src={Default_Image}
                    layout="fill"
                    alt={data['attributes'].title}
                    priority
                />
            </div>}

            <div className={styles.info}>
                <p className={styles.title}>{data['attributes'].title}</p>
                {regExp.test(data['attributes'].author) &&
                    <p className={styles.author}>{data['attributes'].author}</p>
                }
                {!regExp.test(data['attributes'].author) &&
                    <p className={styles.author}>None</p>
                }
            </div>

            {!data['attributes'].isFree && 
            <div className={styles.price_group}>
                <p className={styles.price}>{data['attributes'].price}</p>
                <Image
                    src={polygon_icon}
                    alt='Polygon Logo'
                    width={18}
                    height={18}  
                />
            </div>
            }
            
            {data['attributes'].isFree && <p className={styles.price_free}>FREE</p>}
        </div>
    )
    
}