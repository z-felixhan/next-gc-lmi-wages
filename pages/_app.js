import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://z-felixhan.github.io/next-gc-lmi-wages/favicon.ico"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
