import { useMoralisQuery } from "react-moralis";
import {useState} from "react"
import ScrollList from "../ScrollList";

export default function Trading() {

    const [limit, setLimit] = useState(6)

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
      
    return <ScrollList books={data} title={"Trading"}/>;
    
}