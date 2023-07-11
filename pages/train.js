import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import RandomWord from '../components/RandomWord';
import { useState, useEffect } from 'react';

const Train = ({ words }) => {
 const [random, setRandom] = useState({});
 
    useEffect(() => {
        setRandom(words[Math.floor(Math.random() * words.length)]);   
        return () => {};
    }, []);
    
return(
  <>
  <div className="card-wrapper">
  <p>Click on the card or press space to see meaning.</p>
  <RandomWord word={random.word} meaning={random.meaning} />
  </div>
  </>
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
