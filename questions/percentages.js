import { getRandomPercentage, replaceTagsWithValues, getVariables, getRandomMainNumber, getNextNoteUp} from "./randomUtils";

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
  const question = `What is ${percentage}% of ${mainNumber}?`;


  return { question: question, answer: answer };
   }

 

  const createWordPercentagesQuestion = () => {

    const sentences = [
        {sentence: 'There are <mainNumber> children in a school. <percentage>% of them have hot dinners. How many children do not have hot dinners?', description: "howManyLeftPercentage"},
        {sentence: 'There are <mainNumber> <smallThing> in a bag. <percentage>% of them are <colour1>, the rest are <colour2>. How many <smallThing> are <colour2>?', description: "howManyLeftPercentage"},
        {sentence: 'A <object> has been reduced in price by <percentage>%. If the original price was £<mainNumber>, what is the new price?', description: "howManyLeftPercentage"},
        {sentence: '<name> is buying a <object>. It usually costs £<mainNumber> but today there is <percentage>% off. What change will <name> get from a £<nextNoteUp> note?', description: "howManyLeftPlusChangePercentage"},
    ]
   
    const chosenSentenceIndex = Math.floor(Math.random() * sentences.length);
    const chosenSentence = sentences[chosenSentenceIndex];
    
    const variablesObj = getVariables(chosenSentence.sentence);

    let answer;

    switch(chosenSentence.description) {
        case "howManyLeftPercentage":                       
            answer = (100 - variablesObj.percentage) / 100 * variablesObj.mainNumber;
            while (!Number.isInteger(answer) || variablesObj.percentage === 0) {
                variablesObj.percentage = getRandomPercentage();
                variablesObj.mainNumber = getRandomMainNumber();
                answer = (100 - variablesObj.percentage) / 100 * variablesObj.mainNumber;
            }
            console.log(variablesObj);
            break;
         case "howManyLeftPlusChangePercentage":            
            let newPrice = (100 - variablesObj.percentage) / 100 * variablesObj.mainNumber;
            variablesObj.nextNoteUp = getNextNoteUp(newPrice);
            answer = variablesObj.nextNoteUp - newPrice;
            while (!Number.isInteger(newPrice) || variablesObj.percentage === 0 || variablesObj.nextNoteUp === 0) {
                variablesObj.percentage = getRandomPercentage();
                variablesObj.mainNumber = getRandomMainNumber();
                variablesObj.nextNoteUp = getNextNoteUp((100 - variablesObj.percentage) / 100 * variablesObj.mainNumber);               
                newPrice = (100 - variablesObj.percentage) / 100 * variablesObj.mainNumber
                answer = variablesObj.nextNoteUp - newPrice;
            }
            console.log(variablesObj);
            break;
        default:
            answer = "";
    }

    const question = replaceTagsWithValues(variablesObj, chosenSentence.sentence);

  
  
    return { question: question, answer: answer };
   }