import { useMoralisQuery } from "react-moralis";
import {useState} from "react"
import ScrollList from "../ScrollList";

export default function Farming() {

    const { data, error, isLoading } = useMoralisQuery("Article", query =>
        query
            .equalTo("farming_category", true)
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
      
    return <ScrollList books={data} title={"Farming"}/>;
    
}