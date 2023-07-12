import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const Index = ({ words }) => {
 
  return(
  <>
    
    {/* Create a card for each word */}
    {words.sort((a, b) => {
      if (a.word > b.word) {
        return 1
      } else if (b.word > a.word) {
        return -1 
      } else return 0;
    }).map((word) => (
      <>
      
      <div className="card-wrapper flip-card">      
     
        <div className="flip-card-inner" key={word._id}>
        
          <div className="card flip-card-front">
            <h5 className="word">{word.word}</h5>
           
          </div>
          <div className="card flip-card-back" >
            <h5 className="meaning">{word.meaning}</h5>
          
          
            <div className='buttons'>
            <Link href="/[id]/edit" as={`/${word._id}/edit`} legacyBehavior><FontAwesomeIcon className='btn' icon={faEdit} /></Link>
            </div>
             
           
          </div>
        </div>
       
        </div>  
 </>
    ))}
  </>
)}

/* Retrieves word(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Word.find({})
  const words = result.map((doc) => {
    const word = doc.toObject()
    word._id = word._id.toString()
    return word
  })

  return { props: { words: words } }
}

export default Index
