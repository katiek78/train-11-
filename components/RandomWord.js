import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck,    faXmark } from '@fortawesome/free-solid-svg-icons'
import ConfidenceLevel from "./ConfidenceLevel";
import TrafficLights from '../components/TrafficLights';

const RandomWord = ({wordObj, handleNewWord, addToRecentAttempts}) => {
  
    const [isShowing, setIsShowing] = useState(false);
    const {word, meaning, recentAttempts} = wordObj;
    
    const id = wordObj._id;
    
    const handleClick = (e) => {                   
        setIsShowing(!isShowing);
        console.log(isShowing)
    }

    const handleNext = (e) => {
        e.stopPropagation();          
        setIsShowing(false);
        handleNewWord();
    }

    const handleCorrect = (e) => {
        e.stopPropagation();          
        setIsShowing(false);
        addToRecentAttempts(true, id);        
        handleNewWord();
    }

    const handleIncorrect = (e) => {
        e.stopPropagation();          
        setIsShowing(false);
        addToRecentAttempts(false, id);        
        handleNewWord();
    }

    
    
    

return(

    <div className="card-view" onClick={handleClick}>
    <h5 className="word-view">{word}</h5>
    <h6 className="word-view"><TrafficLights recentAttempts={recentAttempts} /></h6>
    <ConfidenceLevel recentAttempts={recentAttempts} />

       <div className={"main-content-view" + (isShowing ? '' : ' hide')}>
        <p>{meaning}</p>
       
       </div>
       <div className="btn-container-view">
           {/* <Link href="/[id]/edit" as={`/${id}/edit`} legacyBehavior>
             <button className="btn edit">Edit</button>
           </Link> */}
           <Link href="/[id]/edit" as={`/${id}/edit`} legacyBehavior><FontAwesomeIcon className='btn' icon={faEdit} /></Link>
      
             <button className="btn next" onClick={handleNext}>Skip</button>
             <FontAwesomeIcon className='btn correction correct' onClick={handleCorrect} icon={faCheck} />
             <FontAwesomeIcon className='btn correction incorrect' onClick={handleIncorrect} icon={faXmark} />
         </div>
  </div>

)

}

export default RandomWord