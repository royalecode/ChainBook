import { useMoralisQuery, useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import styles from "../styles/BoughtBooks.module.css";
import LoginButton from "../components/Home/CoverButton";
import React from "react";
import Book from "./Book"
import Link from "next/link"

export default function BoughtBooks({ list }) {

  const { Moralis, user, isAuthenticated, authenticate } = useMoralis();
  const [books, setBooks] = useState()

  /*useEffect(() => {
    const serverUrl = "https://x3d9ac64hx5b.usemoralis.com:2053/server"
    const appId = "vE8qvzkr4JMOcA4WzZDzWB5QOUnTgpoyccVtnrtK"
    Moralis.start({ serverUrl, appId })
    let userBooks = Moralis.User.current().attributes.books;
    setBooks(userBooks);
  }, [Moralis])*/

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        setBooks(user.attributes.books); 
      }    
    },100);
    return () => {
      if (isAuthenticated) clearInterval(interval);
    }
  }, [isAuthenticated, user]);

  const { data, error, isLoading } = useMoralisQuery("Article", query => {
      return query.containedIn("objectId", books)
    },
      [books], {
      live: true,
      onLiveEnter: (entity, all) => [...all, entity],
    }
  );

  if (error && books === undefined) {
    return <></>;
  }

  if (isLoading && books === undefined) {
    return <></>;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.login}>
        <LoginButton title="Login with Metamask" icon={true}/>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {data.map((e, index) => (
        <Link key={index} className={styles.book} href={`https://gateway.moralisipfs.com/ipfs/${e['attributes'].hashFile}`} passHref>
          <div>
              <Book data={e} myBook={true}/> 
          </div>
        </Link>
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
}