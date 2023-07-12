import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import RandomWord from '../components/RandomWord';
import { useState, useEffect } from 'react';



const Train = ({ words }) => {
 const [random, setRandom] = useState({});
 const [needNewWord, setNeedNewWord] = useState(false);
 
    useEffect(() => {
        setRandom(words[Math.floor(Math.random() * words.length)]);   
        setNeedNewWord(false);
        return () => {};
    }, [needNewWord]);

    const handleNext = () => {
        setNeedNewWord(true);
    }
    
return(
  <div className="card-wrapper">
  <p>Click on the card to see meaning.</p>
  <RandomWord word={random.word} meaning={random.meaning} id={random._id} handleNewWord={handleNext} />
  </div>
  )
}

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

export default Train
