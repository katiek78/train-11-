import { createValueQuestion} from '../questions/value'

import MathsQuestion from '../components/MathsQuestion';
import { useState, useEffect } from "react"

const Value = () => {

    const [question, setQuestion] = useState({});
    const [needNewQuestion, setNeedNewQuestion] = useState(true);

    useEffect(() => {
        if (needNewQuestion) {
            setQuestion(createValueQuestion());
            setNeedNewQuestion(false);
        }

    },[needNewQuestion])

    
    const refreshQuestion = () => {       
        setNeedNewQuestion(true);
    }

    return(
        <div className="grid wrapper">
            <div className="maths-question-page">
        <h1>Comparing Values Practice</h1>
        <MathsQuestion question={question.question} answer={question.answer} refreshQuestion={refreshQuestion} />
        
        </div>
        </div>
    )
}

export default Value