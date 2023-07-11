import { useState } from "react";

const RandomWord = ({word, meaning}) => {
  
    const [isShowing, setIsShowing] = useState(false);

    const handleClick = () => {
        console.log(isShowing)
        setIsShowing(!isShowing);
    }

return(

    <div className="card-view" onClick={handleClick}>
    <h5 className="word-view">{word}</h5>
       <div className={"main-content-view" + (isShowing ? '' : ' hide')}>
        <p>{meaning}</p>
       
       </div>
    </div>

)

}

export default RandomWord