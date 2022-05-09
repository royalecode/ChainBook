import { useMoralisQuery } from "react-moralis";
import {useState} from "react"
import ScrollList from "../components/ScrollList";

export default function Solidity() {

    const { data, error, isLoading } = useMoralisQuery("Article", query =>
        query
            .equalTo("solidity_category", true)
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
      
    return <ScrollList books={data} title={"Solidity"}/>;
    
}