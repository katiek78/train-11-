import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { sortAlpha } from '../utilities/sort'

const Index = ({ words }) => {
  const [message, setMessage] = useState('')
  const handleClick = (e) => {
    setLetter(e.target.innerText.trim());
  }

  const handleDelete = async (id) => {
    //remove it from our word set so it disappears from the view 
    setFilterData(filterData.filter(word => word._id !== id));

    //remove it from the database
    try {
      await fetch(`/api/words/${id}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the word.')
    }
  }

  const [letter, setLetter] = useState('A');
  const [filterData, setFilterData] = useState([]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  useEffect(() => {
    setFilterData(words.filter(word => word.word[0] === letter.toLowerCase()));
  }, [letter, words]);

  return(
  <>
    <div className="alphabet">
    {alphabet.split('').map((l) => (
      <span onClick={handleClick}>  {l}  </span>
    ))}
      </div>
    <div className="wrapper grid">
    {/* Create a card for each word */}
    {filterData.sort(sortAlpha).map((word) => (
      <>
      
      <div className="card-wrapper flip-card">      
     
        <div className="flip-card-inner" key={word._id}>
        
          <div className={"card flip-card-front" + " " + (word.wordType || "")}>
            <h5 className="word">{word.word}</h5>            
           
          </div>
          <div className={"card flip-card-back" + " " + (word.wordType || "")}>
            <h5 className="meaning">{word.meaning}</h5>
          
          
            <div className='buttons'>
            <Link href="/[id]/edit" as={`/${word._id}/edit`} legacyBehavior><FontAwesomeIcon className='btn' icon={faEdit} /></Link>
          
            <FontAwesomeIcon className='btn' icon={faTrash} onClick={() => handleDelete(word._id)} />
            </div>
           
          </div>
        </div>
       
        </div>  
     
 </>
    ))}
    </div>
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
