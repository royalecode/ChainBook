import Image from "next/image"
import Book from "./Book"
import styles from "../styles/ScrollList.module.css"
import Link from "next/link"

export default function ScrollList({books, title, isTitle=false, pathChange=false}) {

    if (pathChange) {
        return (
            <div className={styles.component}>
                {!isTitle && <h2 className={styles.title}>{title}</h2>}
                <div className={styles.list}>
                {books.map( (data,index) =>(
                    <Link key={index} className={styles.book} href={`./${data['id']}`} passHref>
                        <div className={styles.book_inner_div}>
                            <Book data={data} myBook={false}/> 
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.component}>
            {!isTitle && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.list}>
            {books.map( (data,index) =>(
                <Link key={index} className={styles.book} href={`detail/${data['id']}`} passHref>
                    <div className={styles.book_inner_div}>
                        <Book data={data} myBook={false}/> 
                    </div>
                </Link>
            ))}
            </div>
        </div>
    )
    
}