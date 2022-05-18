import Head from "next/head"
import Navbar from "../components/Navbar"
import BoughtBooks from "../components/BoughtBooks"
import { useMoralisQuery, useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import React from "react";

export default function MyBooks() {

  const {Moralis, user, isAuthenticated} = useMoralis();

  const [books, setBooks] = useState()

  const { getBooks } = async function () {
    const serverUrl = "https://x3d9ac64hx5b.usemoralis.com:2053/server"
    const appId = "vE8qvzkr4JMOcA4WzZDzWB5QOUnTgpoyccVtnrtK"
    Moralis.start({serverUrl, appId})
    let userBooks = Moralis.User.current().attributes.books;
    return userBooks;
  }

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
  }, [Moralis.Object, Moralis.Query, Moralis.User])*/

  return (
    <div>
      <Head>
        <title>ChainBook - Catalogue</title>
        <meta name="description" content="Online Blockchain library"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar/>

      <div>
        <h2>My Books</h2>
        <BoughtBooks books={getBooks}/>
        <style jsx>{`
            div {
              padding-bottom: 25px;
            }

            h2 {
              padding-left: 15px;
            }
          `}</style>
      </div>
    </div>
  )
  
}