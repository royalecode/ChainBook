import { useMoralisQuery } from "react-moralis";
import {useState} from "react"
import ScrollList from "../ScrollList";

export default function Downloads() {

    const [limit, setLimit] = useState(10)

    const { data, error, isLoading } = useMoralisQuery("Article", query =>
        query
            .descending("downloads")
            .limit(limit),
        [limit],
        {
            live: true,
            onLiveEnter: (entity, all) => [...all, entity],
        },
    );

    if (error) {
        return <></>;
    }
      
    if (isLoading) {
        return <></>;
    }
      
    return <ScrollList books={data} title={"Most Downloads"}/>;
    
}