import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import RandomWord from '../components/RandomWord';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr'


const Train = ({ words }) => {
  const router = useRouter();
  const contentType = 'application/json';
 const [random, setRandom] = useState({});
 const [needNewWord, setNeedNewWord] = useState(false);
 const [message, setMessage] = useState('');
 
    const refreshData = () => {
      router.replace(router.asPath);
    }
    useEffect(() => {
        setRandom(words[Math.floor(Math.random() * words.length)]);   
        setNeedNewWord(false);
        return () => {};
    }, [needNewWord]);

    const handleNext = () => {
        setNeedNewWord(true);
    }

    const increaseTimesTested = async (id) => {
        const word = words.filter(word => word._id === id)[0];        
        if (word) {
          const newTimesTested = (word.timesTested || 0) + 1;
          try {
           
             const res = await fetch(`/api/words/${id}`, {
               method: 'PUT',
               headers: {
                 Accept: contentType,
                 'Content-Type': contentType,
               },
               body: JSON.stringify({
                 ...word,
                 timesTested: newTimesTested,
               }),
           
             })
             
             
             // Throw error with status code in case Fetch API req failed
             if (!res.ok) {
               throw new Error(res.status)
             }
             console.log("done");
             const { data } = await res.json()
       
             mutate(`/api/words/${id}`, data, false) // Update the local data without a revalidation         
            
            } catch (error) {
              setMessage('Failed to update word')
            }

            //update local copy
            // words = words.map(word => {
            //   word._id === id ? {...word, timesTested} : word

            // })
            refreshData();
        }
          
    }

    const increaseTimesTestedAndCorrect = async (id) => {
      const word = words.filter(word => word._id === id)[0];        
      if (word) {
        try {         
        
           const res = await fetch(`/api/words/${id}`, {
             method: 'PUT',
             headers: {
               Accept: contentType,
               'Content-Type': contentType,
             },
             body: JSON.stringify({
               ...word,
               timesTested: (word.timesTested || 0) + 1,
               timesCorrect: (word.timesCorrect || 0) + 1,
             }),
         
           })
           
           
           // Throw error with status code in case Fetch API req failed
           if (!res.ok) {
             throw new Error(res.status)
           }
           console.log("done");
           const { data } = await res.json()
     
           mutate(`/api/words/${id}`, data, false) // Update the local data without a revalidation         
          
          } catch (error) {
            setMessage('Failed to update word')
          }

          refreshData();
      }
    }
    
return(
    <div className="grid wrapper">
  <div className="card-wrapper">
  <p>Click on the card to see meaning.</p>
  <RandomWord word={random.word} meaning={random.meaning} id={random._id} handleNewWord={handleNext} increaseTimesTested={increaseTimesTested} increaseTimesTestedAndCorrect={increaseTimesTestedAndCorrect} />
  </div>
  <p>{message}</p>
   
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
