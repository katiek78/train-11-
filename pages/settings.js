import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'
import { useState } from 'react';
import { useRouter } from 'next/router';

const Settings = ({words}) => {
    const [message, setMessage] = useState('');
    const router = useRouter();
    const contentType = 'application/json';
    console.log(words);
    const handleClickResetStatistics = () => {
        const confirmed = window.confirm('Are you sure you want to reset the statistics?');
        if (confirmed) resetStatistics();
    }

    const resetStatistics = async () => {

        const newWords = words.map(word => { return {...word, timesTested: 0, timesCorrect: 0}});
        console.log(newWords);
        try {
            const res = await fetch('/api/wordsMultiple', {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify({words: newWords}),
            })

          //  Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            refreshData();
            setMessage('Statistics have been reset')
        } catch (error) {
            setMessage('Failed to add words')
        }



    }

    const refreshData = () => {
        router.replace(router.asPath);
    }
    return (
        <div className="grid wrapper">          
            <div className='btn-container-settings'>
                <button onClick={handleClickResetStatistics} className="btn">Reset statistics</button>
                <div>{message}</div>
            </div>
            
          
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

export default Settings

