import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck,    faXmark } from '@fortawesome/free-solid-svg-icons'
import ConfidenceLevel from "./ConfidenceLevel";

const RandomWord = ({wordObj, handleNewWord, increaseTimesTested, increaseTimesTestedAndCorrect}) => {
  
    const [isShowing, setIsShowing] = useState(false);
    const {word, meaning, timesTested, timesCorrect} = wordObj;
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
        increaseTimesTestedAndCorrect(id);        
        handleNewWord();
    }

    const handleIncorrect = (e) => {
        e.stopPropagation();          
        setIsShowing(false);
        increaseTimesTested(id);        
        handleNewWord();
    }

    
    
    

return(

    <div className="card-view" onClick={handleClick}>
    <h5 className="word-view">{word}</h5>
    <h6 className="word-view">{timesCorrect}/{timesTested}</h6>
    <ConfidenceLevel timesCorrect={timesCorrect} timesTested={timesTested} />

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