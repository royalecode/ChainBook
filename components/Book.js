import Image from "next/image"
import Default_Image from "../public/default_book_image.png"
import styles from "../styles/Books.module.css"

export default function Library({data}) {

    console.log(data)

    return (
        <div>
            {!data['attributes'].isDefaultImage && 
            <div className={styles.image}>
                <Image
                    src={`https://gateway.moralisipfs.com/ipfs/${data['attributes'].hashImage}`}
                    height={350}
                    width={325}
                    alt={data['attributes'].title}
                    priority
                />
            </div>}

            {data['attributes'].isDefaultImage && 
            <div className={styles.image}>
                <Image
                    src={Default_Image}
                    height={350}
                    width={325}
                    alt={data['attributes'].title}
                    priority
                />
            </div>}

            <p className={styles.title}>{data['attributes'].title}</p>
            <p className={styles.author}>{data['attributes'].author}</p>
            {!data['attributes'].isFree && <p className={styles.price}>{data['attributes'].price}</p>}
            {data['attributes'].isFree && <p className={styles.price}>FREE</p>}

        </div>
    )
    
}