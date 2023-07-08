import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Train 11+ App</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">Add Word</Link>
          <Link href="/import">Import Words</Link>
        </div>

        <img
          id="title"
          src=""
          alt=""
        ></img>
        
      </div>
      <div className="app-title">Train 11+</div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
