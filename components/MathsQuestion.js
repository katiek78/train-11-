import { useState, useEffect } from "react";
import NewQuestion from "./NewQuestion";

const MathsQuestion = ({question, answer, refreshQuestion}) => {

    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        setIsChecked(false);        
    }, [question])

    const handleClickCheck = () => {
        setIsChecked(true);
        if (answer.toString() === document.getElementById("inpAnswer").value) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    return(
        <div className="maths-question-container">
        <div className="maths-question">{question}</div>
       
        <label htmlFor="inpAnswer">Enter your answer:</label>
        <input id="inpAnswer" disabled={isChecked}></input><button className='btn' disabled={isChecked} onClick={handleClickCheck}>Check</button>
        
        {isCorrect && isChecked && <div className="maths-answer">Correct! <br/><NewQuestion refreshQuestion={refreshQuestion} /></div>}
        {!isCorrect && isChecked && <div className="maths-answer">Incorrect! The answer was {answer} <br /> <NewQuestion refreshQuestion={refreshQuestion} /></div>}
        </div>
    )

}

export default MathsQuestion