import { useMoralisQuery } from "react-moralis";
import {useState, useEffect} from "react"
import ScrollList from "../ScrollList";
import star_empty from "../../public/detail/star-empty.svg";
import star_filled from "../../public/detail/star-filled.svg";
import Image from "next/image";

export default function Stars({number}) {
      
    const [width, setWidth] = useState(15);
    const [height, setHeight] = useState(15);
    const [source, _setSource] = useState([star_empty, star_empty, star_empty, star_empty, star_empty]);

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
    }

    useEffect(() => {
        setSource(number);
    }, [number])

    return (
        <>
        <div>
            <div>
                <Image
                    src={source[0]}
                    width={width}
                    height={height}
                    alt='star'
                />
            </div>
            <div>
                <Image
                    src={source[1]}
                    width={width}
                    height={height}
                    alt='star'
                />
            </div>
            <div>
                <Image
                    src={source[2]}
                    width={width}
                    height={height}
                    alt='star'
                />
            </div>
            <div>
                <Image
                    src={source[3]}
                    width={width}
                    height={height}
                    alt='star'
                />
            </div>
            <div>
                <Image
                    src={source[4]}
                    width={width}
                    height={height}
                    alt='star'
                />
            </div>
        </div>
        <style jsx>{`
            div {
              display: flex;
              flex-direction: row;
              margin: 5px 0;
            }
        `}</style>
        </>
    );
    
}