import { createAlgebraQuestion} from '../questions/algebra'
import { createFractionsQuestion } from '../questions/fractions';
import { createPercentagesQuestion } from '../questions/percentages';
import MathsQuestion from '../components/MathsQuestion';
import { useState, useEffect } from "react"
import { createMMMRQuestion } from '../questions/mmmr';

const Mixed = () => {

    const [question, setQuestion] = useState({});
    const [needNewQuestion, setNeedNewQuestion] = useState(true);

    useEffect(() => {
        if (needNewQuestion) {
            setQuestion(createRandomQuestion());
            setNeedNewQuestion(false);
        }

    },[needNewQuestion])

    const questionTypes = ['fractions', 'algebra', 'percentages', 'mmmr'];
    const createRandomQuestion = () => {
        const chosenTypeIndex = Math.floor(Math.random() * questionTypes.length);
        const chosenType = questionTypes[chosenTypeIndex];
//         const functionName = 'create' + chosenType + 'Question';
//         const questionFunction = Function(functionName);
// console.log(questionFunction);
//         if (typeof questionFunction === 'function') {
//           return questionFunction();          
//         } else {
//           throw new Error('Invalid question type');
//         }
        switch (chosenType) {
            case 'fractions':
                return createFractionsQuestion();
                break;
            case 'algebra':
                return createAlgebraQuestion();
                break;
            case 'percentages':
                return createPercentagesQuestion();
                break;
            case 'mmmr':
                return createMMMRQuestion();
                break;
            default:
                throw new Error("Invalid question type selected");
        }
    }

    const refreshQuestion = () => {
       
        setNeedNewQuestion(true);
    }

    return(
        <div className="grid wrapper">
            <div className="maths-question-page">
        <h1>Mixed Practice</h1>
        <MathsQuestion question={question.question} answer={question.answer} refreshQuestion={refreshQuestion} />
        {question.supportingInfo && question.supportingInfo}      
        </div>
        </div>
    )
}

export default Mixed