import { getVariables, getRandomItem, replaceTagsWithValues, getValuesOfPropertiesWithNumber } from "./randomUtils";

export const createMeasureQuestion = () => {
    const sentences = [
        {sentence: "<name1> made a <longObject> that was <measurement1><lengthUnit1> long. <name2>'s <longObject> was <measurement2><lengthUnit2> long. How much longer was <name1>'s <longObject> in <lengthUnit2>?", description: 'longerThan'},        
    ]
   

    const chosenSentenceIndex = Math.floor(Math.random() * sentences.length);
    const chosenSentence = sentences[chosenSentenceIndex];
    
    const variablesObj = getVariables(chosenSentence.sentence);

    let answer;
 
    switch(chosenSentence.description) {
        case "longerThan":                       
            //Ensure lengthUnit1 and lengthUnit2 are different
            while (variablesObj.lengthUnit1 === variablesObj.lengthUnit2) {
                lengthUnit1 = getRandomItem(variablesObj, "lengthUnit")
            }
            
            const equivalentMeasurement1 = 20;
           answer = (equivalentMeasurement1 - variablesObj.measurement2) + "" + variablesObj.lengthUnit2;

           break;
       
        default:
            answer = "";
    }

    const question = replaceTagsWithValues(variablesObj, chosenSentence.sentence);
  
   
  
    return { question: question, answer: answer };
  }
  