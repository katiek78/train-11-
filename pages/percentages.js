import { createPercentagesQuestion } from '../questions/percentages';

import MathsQuestion from '../components/MathsQuestion';
import { useState, useEffect } from "react"

const Percentages = () => {

    const [question, setQuestion] = useState({});
    const [needNewQuestion, setNeedNewQuestion] = useState(true);

    useEffect(() => {
        if (needNewQuestion) {
            setQuestion(createPercentagesQuestion());
            setNeedNewQuestion(false);
        }

    },[needNewQuestion])

    
    const refreshQuestion = () => {       
        setNeedNewQuestion(true);
    }

   

    return(
        <div className="grid wrapper">
            <div className="maths-question-page">
        <h1>Percentages Practice</h1>
        <MathsQuestion question={question.question} answer={question.answer} refreshQuestion={refreshQuestion} />
        {question.supportingInfo && question.supportingInfo}      
        </div>
        </div>
    )
}

export default Percentages