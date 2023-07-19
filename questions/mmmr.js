import { getVariables, getRandomItem, replaceTagsWithValues, getValuesOfPropertiesWithNumber } from "./randomUtils";

export const createMMMRQuestion = () => {
    const sentences = [
        {sentence: "<name> was playing darts. The first three throws were <dartsNumber1>, <dartsNumber2> and <dartsNumber3>. After the fourth throw, <name>'s mean score was <placeholder>. What score did <name> get with the fourth dart?", description: 'numberFromMean'},
        {sentence: "While playing a computer game, <name> scored <mainNumber1>, <mainNumber2>, <mainNumber3>, <mainNumber4>, <mainNumber5>, <mainNumber6> and <mainNumber7>. What was the median score?", description: 'getMedian'}
    ]
   

    const getMedian = (arr) => {
       
        const sortedArr = arr.sort();
        const isEven = sortedArr.length % 2 === 0
        return isEven ? (sortedArr[sortedArr.length / 2] + sortedArr[sortedArr.length/2 -1])/2 : sortedArr[(sortedArr.length -1) / 2];
    }


    const chosenSentenceIndex = Math.floor(Math.random() * sentences.length);
    const chosenSentence = sentences[chosenSentenceIndex];
    
    const variablesObj = getVariables(chosenSentence.sentence);

    let answer;
 
    switch(chosenSentence.description) {
        case "numberFromMean":                       
            //make up a 4th item and set mean
          
            answer = getRandomItem(variablesObj, "dartsNumber");
            
            //get mean
            variablesObj.placeholder = (answer + variablesObj.dartsNumber1 + variablesObj.dartsNumber2 + variablesObj.dartsNumber3) / 4;
         
            while (!Number.isInteger(variablesObj.placeholder)) {
                answer = getRandomItem(variablesObj, "dartsNumber");                            
                variablesObj.placeholder = (answer + variablesObj.dartsNumber1 + variablesObj.dartsNumber2 + variablesObj.dartsNumber3) / 4;
            }

            break;
        case "getMedian":
            answer = getMedian(getValuesOfPropertiesWithNumber(variablesObj))
            
            break;
        default:
            answer = "";
    }

    const question = replaceTagsWithValues(variablesObj, chosenSentence.sentence);
  
   
  
    return { question: question, answer: answer };
  }
  