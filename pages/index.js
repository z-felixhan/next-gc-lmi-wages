import { useState } from "react";
import Form from "../components/Form";
import Head from "next/head";
import styles from "../styles/Home.module.css";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
});

export async function getStaticProps() {
  const nocUrl = "https://orient.onrender.com/noc";
  const pruidUrl = "https://orient.onrender.com/pruid";

  // Get NOC
  const nocResponse = await fetch(nocUrl);
  const nocUnsorted = await nocResponse.json();
  const nocList = await nocUnsorted.slice().sort((a, b) => a.noc - b.noc);

  // Get PRUID
  const pruidResponse = await fetch(pruidUrl);
  const pruidUnsorted = await pruidResponse.json();
  const pruidList = await pruidUnsorted
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  console.log(pruidList);
  return {
    props: {
      nocList,
      pruidList,
    },
  };
}

export default function Home({ nocList, pruidList }) {
  const [nocSelected, setNocSelected] = useState("");
  const [wages, setWages] = useState([]);

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
            pruidList={pruidList}
            setNocSelected={setNocSelected}
            setWages={setWages}
            wages={wages}
          />
        </div>

        <div className={styles.grid}>
          {wages.length
            ? wages.map((wage) => {
                const {
                  eruid,
                  max_wage,
                  med_wage,
                  min_wage,
                  name,
                  noc,
                  pruid,
                  ref_period,
                } = wage;

                return (
                  <div key={eruid} className={styles.card}>
                    <h2>{name}</h2>
                    <p>{formatter.format(max_wage)}</p>
                    <p>{formatter.format(med_wage)}</p>
                    <p>{formatter.format(min_wage)}</p>
                    <p>Updated: {ref_period}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </main>

      <footer className={styles.footer}>© Felix</footer>
    </div>
  );
}
