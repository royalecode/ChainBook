import Image from "next/image";
import styles from "../styles/Detail.module.css";
import BackButton from "../components/BackButton";
import Stars from "../components/Stars";
import Link from "next/Link";
import Payment from "../components/Payment";
import AuthorBooks from "./AuthorBooks";
import Default_Image from "../public/default_book_image.png";
import Review from "../components/Review";
import { useResizeDetector } from "react-resize-detector"

export default function Detail({ data }) {
      
    //console.log(data);
    const regExp = /[a-zA-Z]/g;
    const { width: coverWidth, ref: coverRef } = useResizeDetector();
    
    if (data === undefined) {
        return <></>;
    }

    return (
        <div className={styles.detail}>
            <BackButton />
            <div className={styles.info}>
                <div>
                    <div className={styles.image} ref={coverRef}>
                        {!data['attributes'].isDefaultImage &&
                            <Image
                                src={`https://gateway.moralisipfs.com/ipfs/${data['attributes'].hashImage}`}
                                width={595}
                                height={842}
                                alt={data['attributes'].title}
                                priority
                            />
                        }

                        {data['attributes'].isDefaultImage &&
                            <Image
                                src={Default_Image}
                                width={595}
                                height={842}
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
                    <h2 className={styles.title}>{data['attributes'].title}</h2>
                    {regExp.test(data['attributes'].author) &&
                        <p className={styles.author}><span className={styles.span}>from </span>{data['attributes'].author}</p>
                    }
                    {!regExp.test(data['attributes'].author) &&
                        <p className={styles.author}><span className={styles.span}>from </span>None</p>
                    } 
                </div>         
            </div>
            <div>
                <Payment />
            </div>
            <div className={styles.synopsis_section}>
                <h3>Synopsis</h3>
                <p>{data['attributes'].synopsis}</p>
            </div>

            <div className={styles.other_books}>
                <AuthorBooks author={data['attributes'].author}/>
            </div>

            <div>
                <Review objectId={data['id']}/>
            </div>

            <div className={styles.book_details}>
                <h3>Book Details</h3>
                <p>Title: {data['attributes'].title}</p>
                <p>Author: {data['attributes'].author}</p>
                <p>Type: {data['attributes'].type}</p>
                <p>Language: {data['attributes'].language}</p>
            </div>
        </div>
    );   
}