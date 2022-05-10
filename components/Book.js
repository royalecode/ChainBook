import Image from "next/image"
import Default_Image from "../public/default_book_image.png"
import styles from "../styles/Books.module.css"
import polygon_icon from "../public/publish/polygon_crypto_icon.svg"
import Link from "next/link"
import { useResizeDetector } from "react-resize-detector"

export default function Library({ data, myBook }) {

    const regExp = /[a-zA-Z]/g;

    const { width: coverWidth, ref: coverRef } = useResizeDetector();

    return (
        <div className={styles.book_inner_div}>
            <div className={styles.image} ref={coverRef}>
                {!data['attributes'].isDefaultImage &&
                    <Image
                        src={`https://gateway.moralisipfs.com/ipfs/${data['attributes'].hashImage}`}
                        layout="fill"
                        alt={data['attributes'].title}
                        priority
                    />
                }

                {data['attributes'].isDefaultImage &&
                    <Image
                        src={Default_Image}
                        layout="fill"
                        alt={data['attributes'].title}
                        priority
                    />
                }

                <style jsx>{`
                    div {
                        height: ${coverWidth*1.414}px;
                    }
                `}</style>
            </div>
            <div className={styles.info}>
                <p className={styles.title}>{data['attributes'].title}</p>
                {regExp.test(data['attributes'].author) &&
                    <p className={styles.author}>{data['attributes'].author}</p>
                }
                {!regExp.test(data['attributes'].author) &&
                    <p className={styles.author}>None</p>
                }
            </div>

            {!myBook && !data['attributes'].isFree &&
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

            {!myBook && data['attributes'].isFree && <p className={styles.price_free}>FREE</p>}

        </div>
    )

}