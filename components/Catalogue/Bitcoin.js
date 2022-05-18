import { useMoralisQuery } from "react-moralis";
import {useState} from "react"
import ScrollList from "../ScrollList";

export default function Bitcoin() {


    const { data, error, isLoading } = useMoralisQuery("Article", query =>
        query
            .equalTo("bitcoin_category", true)
        ,{
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
      
    return <ScrollList books={data} title={"Bitcoin"}/>;
    
}