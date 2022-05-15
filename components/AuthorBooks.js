import { useMoralisQuery } from "react-moralis";
import ScrollList from "./ScrollList";

export default function Detail({ author }) {
      
    //console.log(author)

    const { data, error, isLoading } = useMoralisQuery("Article", query => {
        return query
            .equalTo("author", author)
        },[author],{
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

    //console.log(data)

    return (
        <div>
            {data.length > 1 &&
                <div>
                    <h3>Same Author</h3>
                    <ScrollList books={data} title={"Same author"} isTitle={true}/>
                </div>
            }
        </div>
    );   
}