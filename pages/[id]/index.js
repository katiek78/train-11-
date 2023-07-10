import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Word from '../../models/Word'

/* Allows you to view pet card info and delete pet card*/
const WordPage = ({ word }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const wordID = router.query.id

    try {
      await fetch(`/api/words/${wordID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the word.')
    }
  }

  return (
    <>
    {/* <div className="card-wrapper">
      <div className="card-view">
        <h5 className="word-view">{word.word}</h5>
         <div className="main-content-view">
          <p>{word.meaning}</p>
          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${word._id}/edit`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div> 
      </div>
      {message && <p>{message}</p>}
    </div> */}
    <div className="card-wrapper">
    <div className="card-view"  key={word._id}>
       
       <h5 className="word-view">{word.word}</h5>
       <div className="main-content-view">
        <p>{word.meaning}</p>
       
       </div>
       <div className="btn-container-view">
           <Link href="/[id]/edit" as={`/${word._id}/edit`} legacyBehavior>
             <button className="btn edit">Edit</button>
           </Link>
      
             <button className="btn delete" onCick={handleDelete}>Delete</button>
         </div>
     </div>
      </div>
      </>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const word = await Word.findById(params.id).lean()
  word._id = word._id.toString()

  return { props: { word } }
}

export default WordPage
