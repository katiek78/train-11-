import { getRandomPercentage, replaceTagsWithValues, getVariables, getRandomMainNumber} from "./randomUtils";

export const createPercentagesQuestion = () => {
    const questionTypes = ['simple', 'word']
    const chosenTypeIndex = Math.floor(Math.random() * questionTypes.length);
    const chosenType = questionTypes[chosenTypeIndex];

    switch (chosenType) {
        case 'simple':
            return createSimplePercentagesQuestion();
           
        case 'word':
            return createWordPercentagesQuestion();
           
        default:
            throw new Error("Invalid question type selected");
    }

}

const createSimplePercentagesQuestion = () => {
  // Generate random percentage
  let percentage = getRandomPercentage();
   
  // Generate the number you want to find the percentage of
  let mainNumber = Math.floor(Math.random() * 100) + 1;
 
  // Calculate the answer based on the operator
  let answer = percentage / 100 * mainNumber;
 
  while (!Number.isInteger(answer) || percentage === 0) {
      percentage = getRandomPercentage();
      
      mainNumber = Math.floor(Math.random() * 100) + 1;

      answer = percentage / 100 * mainNumber;
  }

  // Generate the question
  const question = `What is ${percentage}% of ${mainNumber}`;


  return { question: question, answer: answer };
   }

 

  const createWordPercentagesQuestion = () => {
  
    const sentences = [
        {sentence: 'There are <mainNumber> children in a class. <percentage>% of them go on a school trip. How many children do not go on the trip?', description: "howManyLeftPercentage"},
        {sentence: 'There are <mainNumber> <smallThing> in a bag. <percentage>% of them are <colour1>, the rest are <colour2>. How many <smallThing> are <colour2>?', description: "howManyLeftPercentage"},
    ]
   
    const chosenSentenceIndex = Math.floor(Math.random() * sentences.length);
    const chosenSentence = sentences[chosenSentenceIndex];
    
    const variablesObj = getVariables(chosenSentence.sentence);

    let answer;

    switch(chosenSentence.description) {
        case "howManyLeftPercentage":
                
            // while (numerator < 1 || denominator < 1 || numerator === 0) {
            //     console.log("replacing " + numerator + " and " + denominator);
            //     //replace all the fractions
            //     for (const key in variablesObj) {
            //         if (key.includes("fraction")) {
            //             variablesObj[key] = getRandomFraction();
            //             console.log(key);
            //         }
            //     }
            //     ({ numerator, denominator} = whatIsLeft(1, variablesObj.fraction1, variablesObj.fraction2));
            // }
            // while (variablesObj.percentage === 0) {
            //     variablesObj.percentage = getRandomPercentage();
            // }
            answer = (100 - variablesObj.percentage) / 100 * variablesObj.mainNumber;
            while (!Number.isInteger(answer) || variablesObj.percentage === 0) {
                variablesObj.percentage = getRandomPercentage();
                variablesObj.mainNumber = getRandomMainNumber();
                answer = (100 - variablesObj.percentage) / 100 * variablesObj.mainNumber;
            }
            console.log(variablesObj);
            break;
        default:
            answer = "";
    }

    const question = replaceTagsWithValues(variablesObj, chosenSentence.sentence);

  
  
    return { question: question, answer: answer };
   }