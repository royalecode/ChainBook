import Image from "next/image"
import Book from "./Book"
import styles from "../styles/ScrollList.module.css"

export default function ScrollList({books, title}) {
      
    return (
        <div className={styles.component}>
            <h2>{title}</h2>
            <div className={styles.list}>
            {books.map( (data,index) =>(
                <div key={index} className={styles.book}>
                    <Book data={data}/> 
                </div>
            ))}
            </div>
        </div>
    )
    
}