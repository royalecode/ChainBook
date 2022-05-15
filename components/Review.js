import { useMoralisQuery } from "react-moralis";
import {useState} from "react"
import ScrollList from "../components/ScrollList";
import styles from "../styles/Review.module.css";
import Image from "next/image";
import star_empty from "../public/star-empty.svg";
import star_filled from "../public/star-filled.svg";
import ReviewList from "../components/ReviewList";

export default function Review({objectId}) {

    //console.log(objectId);

    const [width, setWidth] = useState(30);
    const [height, setHeight] = useState(30);
    const [source, _setSource] = useState([star_empty, star_empty, star_empty, star_empty, star_empty]);
    const [score, setScore] = useState(0);

    const setSource = (value) => {
        let sources= [];
        for (let i = 0; i < 5; i++) {
            if (i < value) {
                sources.push(star_filled)
            } else {
                sources.push(star_empty)
            }
        }
        _setSource(sources);
        setScore(value);
    }

    const sendReview = async (event) => {
        event.preventDefault();
        if (event.target.name.value != '' && event.target.comment.value != '') {
            console.log(event.target.name.value);
            console.log(event.target.comment.value);
            console.log(score);
        }
    }
      
    return (
        <div className={styles.review_section}>
            <h3>Write a review</h3>

            <div className={styles.stars}>
                <div>
                    <Image
                        src={source[0]}
                        width={width}
                        height={height}
                        alt='star'
                        onClick={() => setSource(1)}
                    />
                </div>
                <div>
                    <Image
                        src={source[1]}
                        width={width}
                        height={height}
                        alt='star'
                        onClick={() => setSource(2)}
                    />
                </div>
                <div>
                    <Image
                        src={source[2]}
                        width={width}
                        height={height}
                        alt='star'
                        onClick={() => setSource(3)}
                    />
                </div>
                <div>
                    <Image
                        src={source[3]}
                        width={width}
                        height={height}
                        alt='star'
                        onClick={() => setSource(4)}
                    />
                </div>
                <div>
                    <Image
                        src={source[4]}
                        width={width}
                        height={height}
                        alt='star'
                        onClick={() => setSource(5)}
                    />
                </div>
            </div>
            <form onSubmit={sendReview}>
                <input type="text" id="namefield"
                    name="name" placeholder="Name" className={styles.textfield}/>
                <textarea id="commentId" name="comment" rows="7" className={styles.textarea} 
                    defaultValue="Share your experience about this book"/>
                <div className={styles.right}>
                    <button className={styles.send} type="submit">Send</button>
                </div>
            </form>

            <div>
                <ReviewList objectId={objectId}/>
            </div>
        </div>
    );
    
}