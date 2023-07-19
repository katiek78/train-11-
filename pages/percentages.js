import { createPercentagesQuestion } from '../questions/percentages';

import MathsQuestion from '../components/MathsQuestion';
import { useState, useEffect } from "react"
import PieChart from '../components/PieChart';

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

    const data = [50, 20, 15, 15]; // Example data (sum should be 100)
    const colors = ['#FF5733', '#33FFA8', '#037DFF', '#882944', '#A2459E']; // Example colors
  

    return(
        <div className="grid wrapper">
            <div className="maths-question-page">
        <h1>Percentages Practice</h1>
        <MathsQuestion question={question.question} answer={question.answer} refreshQuestion={refreshQuestion} />
        <PieChart data={data} colors={colors} />
        </div>
        </div>
    )
}

export default Percentages