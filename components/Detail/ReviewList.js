import { useMoralisQuery } from "react-moralis";
import Stars from "./Stars";

export default function Review({objectId}) {

    const { data, error, isLoading } = useMoralisQuery("Review", query => {
        return query
            .equalTo("bookId", objectId)
    },[objectId],{
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
      
    return (
        <div>
            {data.length > 0 && <h3>Reviews</h3>}
            {data.map((e, index) => (
                <div key={index}>
                    <div>
                        <h4>{e['attributes'].name}</h4>
                        <Stars number={e['attributes'].score} />
                        <p>{e['attributes'].comment}</p>
                    </div>
                    <style jsx>{`
                        h4 {
                            margin-bottom: 0;
                        }

                        p {
                            text-align: justify;
                            margin-top: 5px;
                            font-size: 15px;
                        }

                        div {
                            margin: 15px 0;
                        }
                    `}</style>
                </div>
            ))}
        </div>
    );
}