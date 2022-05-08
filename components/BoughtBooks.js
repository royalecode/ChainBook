import { useMoralisQuery, useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import React from "react";
import Book from "./Book"

export default function BoughtBooks({list}) {

  const {Moralis, user} = useMoralis();
  const [books, setBooks] = useState()

  useEffect(() => {
    const serverUrl = "https://x3d9ac64hx5b.usemoralis.com:2053/server"
    const appId = "vE8qvzkr4JMOcA4WzZDzWB5QOUnTgpoyccVtnrtK"
    Moralis.start({serverUrl, appId})
    let userBooks = Moralis.User.current().attributes.books;
    setBooks(userBooks);
  }, [Moralis])

  const { data, error, isLoading } = useMoralisQuery("Article", query =>
        query
            .equalTo("objectId", books)
        [books],{
            live: true,
            onLiveEnter: (entity, all) => [...all, entity],
        },
  );

  console.log(data)


  if (error && books === undefined) {
      return <>hola</>;
  }
    
  if (isLoading && books === undefined) {
      return <>hola2</>;
  }
    
  return (
    <div>
    {data.map( (e,index) =>(
        <div key={index} >
            <Book data={e}/> 
        </div>
    ))}
  </div>
  )

  /*const update = async () => {
    console.log(user.attributes.books);
    let books = user.attributes.books;
    books.push("qxudCvJASSbhpyxUziH8HEv1");
    user.set("books", books);
    await user.save();
    console.log(user.attributes.books);
  }*/

  /*useEffect(() => {
    async function fetchMoralis() {
        const serverUrl = "https://x3d9ac64hx5b.usemoralis.com:2053/server"
        const appId = "vE8qvzkr4JMOcA4WzZDzWB5QOUnTgpoyccVtnrtK"
        Moralis.start({serverUrl, appId})
        const userBooks = Moralis.User.current().attributes.books;
        console.log(userBooks);
        let Article = Moralis.Object.extend("Article");
        let localBooks = [];
        userBooks.forEach(async (book) => {
            console.log(book)
            let query = new Moralis.Query(Article);
            query.equalTo("objectId", book);
            let results = await query.find()
            localBooks.push(results[0]);
        });
        setBooks(localBooks);
        console.log(localBooks);  
    }    
    fetchMoralis();
  }, [Moralis])

  if (books === undefined) {
    return <>Still Loading...</>
  }

  return (
    <>
    {books.map((data,index)=>(
        <div key={index}>
            <h3>{data['attributes'].title}</h3>
            <p>{data['attributes'].author}</p>
        </div>

    ))}
    </>  
  )*/

}