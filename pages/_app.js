import '../css/style.css'
import '../css/form.css'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function MyApp({ Component, pageProps }) {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <>
      <Head>
        <title>Train 11+ App</title>
      </Head>

      <div className="navbar">
        <div className="app-title">Train 11+</div>
        <div className="navbar-toggle" onClick={toggleLinks}>
          <span className="toggle-icon"></span>
        </div>
        <div className={`navbar-links ${showLinks ? "show" : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/maths">Maths</Link>
          <Link href="/words">Words</Link>
          <Link href="/train">Train Words</Link>
          <Link href="/new">Add Word</Link>
          <Link href="/import">Import Words</Link>
          <Link href="/edit-all">Edit All</Link>
          <Link href="/settings"><FontAwesomeIcon icon={faGear} /></Link>
        </div>

        <img
          id="title"
          src=""
          alt=""
        ></img>
        
      </div>
     
      <div className="">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
