import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import RandomWord from '../components/RandomWord';

import { getConfidenceLevel, confidenceColours, confidenceLabels } from '../utilities/confidenceLevel';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr'


const Train = ({ words }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [random, setRandom] = useState({});
  const [needNewWord, setNeedNewWord] = useState(false);
  const [message, setMessage] = useState('');
  const [cardSet, setCardSet] = useState('all');
  const [filteredData, setFilteredData] = useState(words);

  const refreshData = () => {
    router.replace(router.asPath);
  }

  useEffect(() => {

    const filterData = () => {

      if (cardSet === 'all') {
        setFilteredData(words);
      } else setFilteredData(words.filter(word => getConfidenceLevel(word.recentAttempts) === parseInt(cardSet)));
    }

    filterData();

    if (filteredData.length) {
      setRandom(filteredData[Math.floor(Math.random() * filteredData.length)]);
      setMessage('');
    } else setMessage('There are no cards of this type! Choose another.');
    setNeedNewWord(false);
    return () => { };
  }, [needNewWord]);


  const getGroupTotals = () => {
     //console.log("getting group totals - this means page has refreshed") //this happens when you change select, when you click Start, when you click submit, when you press correct
     let result = [];
     for (let i = 0; i < confidenceLabels.length; i++) {
       const group = words.filter(word => getConfidenceLevel(word.recentAttempts) === parseInt(i))
       result.push(group.length);
     }
     return result;
   }
 
   const groupTotals = getGroupTotals();

  const handleNext = () => {
    setNeedNewWord(true);
  }

  const handleChangeSelect = () => {
    const level = document.getElementById("selSet").value;
    console.log(level)
    setCardSet(level);
    setNeedNewWord(true);
  }

  // const increaseTimesTested = async (id) => {
  //   const word = words.filter(word => word._id === id)[0];
  //   if (word) {
  //     const newTimesTested = (word.timesTested || 0) + 1;
  //     try {

  //       const res = await fetch(`/api/words/${id}`, {
  //         method: 'PUT',
  //         headers: {
  //           Accept: contentType,
  //           'Content-Type': contentType,
  //         },
  //         body: JSON.stringify({
  //           ...word,
  //           timesTested: newTimesTested,
  //         }),

  //       })


  //       // Throw error with status code in case Fetch API req failed
  //       if (!res.ok) {
  //         throw new Error(res.status)
  //       }
  //       console.log("done");
  //       const { data } = await res.json()

  //       mutate(`/api/words/${id}`, data, false) // Update the local data without a revalidation         

  //     } catch (error) {
  //       setMessage('Failed to update word')
  //     }

  //     //update local copy
  //     // words = words.map(word => {
  //     //   word._id === id ? {...word, timesTested} : word

  //     // })
  //     refreshData();
  //   }

  // }

  // const increaseTimesTestedAndCorrect = async (id) => {
  //   const word = words.filter(word => word._id === id)[0];
  //   if (word) {
  //     try {

  //       const res = await fetch(`/api/words/${id}`, {
  //         method: 'PUT',
  //         headers: {
  //           Accept: contentType,
  //           'Content-Type': contentType,
  //         },
  //         body: JSON.stringify({
  //           ...word,
  //           timesTested: (word.timesTested || 0) + 1,
  //           timesCorrect: (word.timesCorrect || 0) + 1,
  //         }),

  //       })


  //       // Throw error with status code in case Fetch API req failed
  //       if (!res.ok) {
  //         throw new Error(res.status)
  //       }
  //       console.log("done");
  //       const { data } = await res.json()

  //       mutate(`/api/words/${id}`, data, false) // Update the local data without a revalidation         

  //     } catch (error) {
  //       setMessage('Failed to update word')
  //     }

  //     refreshData();
  //   }
  // }

  const addToRecentAttempts = async (isCorrect, id) => {
    const word = words.filter(word => word._id === id)[0];
    if (word) {      

           //create the property if it doesn't exist
           if (!word.recentAttempts) word.recentAttempts = [];

      //cap at 6 attempts
      if (word.recentAttempts.length === 6) word.recentAttempts.shift();
  
      word.recentAttempts.push(isCorrect ? 1 : 0);
      try {

        const res = await fetch(`/api/words/${id}`, {
          method: 'PUT',
          headers: {
            Accept: contentType,
            'Content-Type': contentType,
          },
          body: JSON.stringify({
            ...word,
            recentAttempts: word.recentAttempts,
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




  return (
    <>
      <div className="grid wrapper">
        <div className="card-wrapper">

          <div>
            <p>Which words do you want to train?</p>

            <select id="selSet" onChange={handleChangeSelect}>
              <option value="all">All 🌍 </option>
              {/* <option value="untested">Untested ❓</option>
              <option value="very-low">Very tricky 🤯</option>
              <option value="low">Tricky 😓</option>
              <option value="medium-low">A little tricky 🙁</option>
              <option value="medium">Medium 😑</option>
              <option value="medium-high">Fairly easy 🙂</option>
              <option value="high">Easy 😊</option>
               */}
               
      {confidenceLabels.map((label, i) => <option value={i}>{label} ({groupTotals && groupTotals[i]})</option>)}  
            </select>

          </div>
          {filteredData.length > 0 &&
            <><RandomWord wordObj={random} handleNewWord={handleNext} addToRecentAttempts={addToRecentAttempts} />
              <p>Click on the card to see the word's meaning.</p>
            </>
          }


        </div>



      </div>

      <div className="grid">{message}</div>
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
