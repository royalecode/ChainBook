import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Detail from "../../components/Detail";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMoralisQuery } from "react-moralis";

export default function BookInfo( {info} ) {

  const router = useRouter()
  //console.log(info['params']['id'])
  /*const { fetch } = useMoralisQuery(
    "ARTICLE",
    (query) => query.equalTo("objectId", id),
    [],
    { autoFetch: false }
  );

  useEffect(() => {
    if (router.query) {
      setId(router.query);
      const results = fetch;
      setData(results);
    }  
  }, [router.query, fetch])

  /*useEffect(() => {
    const interval = setInterval(() => {
      if (router.query) {
        setId(router.query);
        const results = await fetch;
        setData(results);
      }    
    },100);
    return () => {
      if (id != undefined) clearInterval(interval);
    }
  }, [fetch, id, router.query]);*/

  const { data, error, isLoading } = useMoralisQuery("Article", query => {
        return query
            .equalTo("objectId", info['params']['id'])
      },
      [info],{
          live: true,
          onLiveEnter: (entity, all) => [...all, entity],

      },
  );

  return (
    <div>
        <Head>
            <title>ChainBook - Detail</title>
            <meta name="description" content="Online Blockchain library"/>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <Detail data={data[0]}/>
    </div>
  )
}

export const getServerSideProps = ({ params }) => {
  const info = { params }
  return {
    props: {
      info
    }
  }
}