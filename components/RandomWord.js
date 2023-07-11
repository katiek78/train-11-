import { useState } from "react";
import Link from "next/link";

const RandomWord = ({word, meaning, id, handleNewWord}) => {
  
    const [isShowing, setIsShowing] = useState(false);

    const handleClick = (e) => {                   
        setIsShowing(!isShowing);
        console.log(isShowing)
    }

    const handleNext = (e) => {
        e.stopPropagation();          
        setIsShowing(false);
        handleNewWord();
    }

return(

    <div className="card-view" onClick={handleClick}>
    <h5 className="word-view">{word}</h5>
       <div className={"main-content-view" + (isShowing ? '' : ' hide')}>
        <p>{meaning}</p>
       
       </div>
       <div className="btn-container-view">
           <Link href="/[id]/edit" as={`/${id}/edit`} legacyBehavior>
             <button className="btn edit">Edit</button>
           </Link>
      
             <button className="btn next" onClick={handleNext}>Next Word</button>
         </div>
  </div>

)

}

export default RandomWord