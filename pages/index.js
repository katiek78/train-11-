import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { sortAlpha } from '../utilities/sort'
import { useRouter } from 'next/router'

const Index = ({ words }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  
  const handleClick = (e) => {
    setWordType(''); //for now, if we choose a letter, we are showing all word types
    setLetter(e.target.innerText.trim());
  }

  const handleClickWordType = (e) => {
    const selectedType = e.target.id || e.target.parentNode.id; //this ensures if you click the h5 rather than the parent div it still uses the div's id
    setWordType(selectedType);
   // setFilterData(filterData.filter(word => word.wordType === selectedType));
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

  const [letter, setLetter] = useState(router.query.letter || 'A');
  const [wordType, setWordType] = useState('');
  const [filterData, setFilterData] = useState([]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  useEffect(() => {
    setFilterData(words.filter(word => (wordType === '' && word.word[0] === letter.toLowerCase()) || word.wordType === wordType)); //for now, either filtering on a word type or a letter
  }, [letter, words, wordType]);

  return(
  <>
    <div className="alphabet">
    {alphabet.split('').map((l) => (
      <span onClick={handleClick}>  {l}  </span>
    ))}
      </div>

      <div className="typeCards">
        <div className="miniCard noun" id="noun" onClick={handleClickWordType}><h5 className="mini">nouns</h5></div>
        <div className="miniCard verb" id="verb" onClick={handleClickWordType}><h5 className="mini">verbs</h5></div>
        <div className="miniCard adjective" id="adjective" onClick={handleClickWordType}><h5 className="mini">adjectives</h5></div>
        <div className="miniCard adverb" id="adverb" onClick={handleClickWordType}><h5 className="mini">adverbs</h5></div>
        <div className="miniCard other" id="other" onClick={handleClickWordType}><h5 className="mini">other</h5></div>
        <div className="miniCard multiple" id="multiple" onClick={handleClickWordType}><h5 className="mini">multi</h5></div>        
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
