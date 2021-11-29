import { useState } from "react";
import Form from "../components/Form";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const nocUrl = "https://orient.onrender.com/noc";
  const pruidUrl = "https://orient.onrender.com/pruid";

  // Get NOC
  const nocResponse = await fetch(nocUrl);
  const nocUnsorted = await nocResponse.json();
  const nocList = await nocUnsorted.slice().sort((a, b) => a.noc - b.noc);

  // Get PRUID
  const pruidResponse = await fetch(pruidUrl);
  const pruid = await pruidResponse.json();

  return { props: { nocList, pruid } };
}

export default function Home({ nocList, pruid }) {
  const [nocSelected, setNocSelected] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Canadian Wages</title>
        <meta
          name="description"
          content="Find wages by occupation (NOC) throughout Canada"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Search Canadian Wages</h1>
        <div className={styles.formContainer}>
          <Form
            nocList={nocList}
            nocSelected={nocSelected}
            setNocSelected={setNocSelected}
          />
        </div>

        <div className={styles.grid}></div>
      </main>

      <footer className={styles.footer}>© Felix</footer>
    </div>
  );
}
