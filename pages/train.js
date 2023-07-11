import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import RandomWord from '../components/RandomWord';
import { useState, useEffect } from 'react';

const Train = ({ words }) => {
 const [random, setRandom] = useState('');
 
    useEffect(() => {
        setRandom(words[Math.floor(Math.random() * words.length)]);   
        return () => {};
    }, []);
    
return(
  <>
  <RandomWord word={random.word} meaning={random.meaning} />
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
