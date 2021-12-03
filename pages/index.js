import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Form from "../components/Form";
import Head from "next/head";
import styles from "../styles/Home.module.css";

// Table column headers
const headers = [
  { field: "name", headerName: "Province/Territory", flex: 1 },
  { field: "med_wage", headerName: "Median", flex: 1 },
  { field: "max_wage", headerName: "Maximum", flex: 1 },
  { field: "min_wage", headerName: "Minimum", flex: 1 },
  { field: "ref_period", headerName: "Reference Period", flex: 1 },
];

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

  return {
    props: {
      nocList,
      pruidList,
    },
  };
}

export default function Home({ nocList, pruidList }) {
  const [loading, setLoading] = useState(false);
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
            loading={loading}
            nocList={nocList}
            nocSelected={nocSelected}
            pruidList={pruidList}
            setLoading={setLoading}
            setNocSelected={setNocSelected}
            setWages={setWages}
            wages={wages}
          />
        </div>

        <div className={styles.dataGridContainer}>
          {wages.length ? (
            <DataGrid
              getRowId={(r) => r.eruid}
              columns={headers}
              rows={wages}
              autoHeight
              hideFooter
            />
          ) : (
            ""
          )}
        </div>
      </main>

      <footer className={styles.footer}>© Felix</footer>
    </div>
  );
}
