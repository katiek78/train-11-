import { getVariables, extractTagNames, replaceTagsWithValues, getRandomFraction } from "./randomUtils";

export const createFractionsQuestion = () => {
    const questionTypes = ['simple', 'word']
    const chosenTypeIndex = Math.floor(Math.random() * questionTypes.length);
    const chosenType = questionTypes[chosenTypeIndex];

    switch (chosenType) {
        case 'simple':
            return createSimpleFractionsQuestion();
           
        case 'word':
            return createWordFractionsQuestion();
           
        default:
            throw new Error("Invalid question type selected");
    }
  }
  

  function simplifyFraction(numerator, denominator) {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero.");
    }
  
    // Find the greatest common divisor (gcd) of the numerator and denominator
    var divisor = calculateGCD(numerator, denominator);
  
    // Simplify the fraction by dividing both numerator and denominator by their gcd
    var simplifiedNumerator = numerator / divisor;
    var simplifiedDenominator = denominator / divisor;

    if (simplifiedDenominator < 0) {
           simplifiedDenominator = -simplifiedDenominator;
           simplifiedNumerator = -simplifiedNumerator;
     }
  
    //return [simplifiedNumerator, simplifiedDenominator];
    return simplifiedNumerator + "/" + simplifiedDenominator;
  }

  function calculateGCD(a, b) {
    while (b !== 0) {
      var temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  
  
const createSimpleFractionsQuestion = () => {
 // Generate random numerator and denominator for the fractions
 var numerator1 = Math.floor(Math.random() * 10) + 1;
 var denominator1 = Math.floor(Math.random() * 10) + 1;
 var numerator2 = Math.floor(Math.random() * 10) + 1;
 var denominator2 = Math.floor(Math.random() * 10) + 1;

 // Generate the operator for the question
 var operators = ["+", "-", "*", "÷"];
 var operator = operators[Math.floor(Math.random() * operators.length)];

 // Generate the question
 var question = numerator1 + "⁄" + denominator1 + " " + operator + " " + numerator2 + "⁄" + denominator2;

 // Calculate the answer based on the operator
 var answer;
 switch (operator) {
   case "+":
     answer = simplifyFraction((numerator1 * denominator2 + numerator2 * denominator1), (denominator1 * denominator2));
     break;
   case "-":
     answer = simplifyFraction((numerator1 * denominator2 - numerator2 * denominator1), (denominator1 * denominator2));
     break;
   case "*":
     answer = simplifyFraction((numerator1 * numerator2), (denominator1 * denominator2));
     break;
   case "÷":
     answer = simplifyFraction((numerator1 * denominator2), (denominator1 * numerator2));
     break;
 }

 if (answer.endsWith("/1")) answer = answer.slice(0, -2)

 return { question: question, answer: answer };
}
  

const createWordFractionsQuestion = () => {    
    const sentences = [
        {sentence: '<name1> and <name2> cooked a <food>. <name1> ate <fraction1> of the <food> and <name2> ate <fraction2> of the <food>. What fraction of the <food> was left?', description: "whatIsLeft"},
        {sentence: 'A group of <group> were going to <place>. <fraction1> of them went by <transport1> and <fraction2> of them went by <transport2>. The rest went by <transport3>. What fraction went by <transport3>?', description: "whatIsLeft"},
        {sentence: '<fraction> carriages on a train have been painted <colour>. There are total of <mainNumber> carriages. How many of the carriages are not painted <colour>?', description: "howManyAreNot"},
        {sentence: '<fraction> carriages on a train have been painted <colour>. There are total of <mainNumber> carriages. How many of the carriages are painted <colour>?', description: "howManyAre"}
    ]

    const chosenSentenceIndex = Math.floor(Math.random() * sentences.length);
    const chosenSentence = sentences[chosenSentenceIndex];
    
    const variablesObj = getVariables(chosenSentence.sentence);

    
    let answer;

    switch(chosenSentence.description) {
        case "whatIsLeft":
            let { numerator, denominator} = whatIsLeft(1, variablesObj.fraction1, variablesObj.fraction2);
            while (numerator < 1 || denominator < 1 || numerator === 0) {
                console.log("replacing " + numerator + " and " + denominator);
                //replace all the fractions
                for (const key in variablesObj) {
                    if (key.includes("fraction")) {
                        variablesObj[key] = getRandomFraction();
                        console.log(key);
                    }
                }
                ({ numerator, denominator} = whatIsLeft(1, variablesObj.fraction1, variablesObj.fraction2));
            }
            answer = simplifyFraction(numerator, denominator);
            console.log(variablesObj);
            break;
    
        case "howManyAreNot":
          //replace if fraction is a half
          while (variablesObj.fraction.denominator === 2 * variablesObj.fraction.numerator) {
            variablesObj.fraction = getRandomFraction();
          }
          variablesObj.mainNumber = getSmallMultiple(variablesObj.fraction.denominator);
          
          answer = variablesObj.mainNumber - (variablesObj.mainNumber / variablesObj.fraction.denominator * variablesObj.fraction.numerator);
          variablesObj.fraction = variablesObj.fraction.numerator + " in " + variablesObj.fraction.denominator;
          break;
        case "howManyAre":
             //replace if fraction is a half
             while (variablesObj.fraction.denominator === 2 * variablesObj.fraction.numerator) {
              variablesObj.fraction = getRandomFraction();
            }
          variablesObj.mainNumber = getSmallMultiple(variablesObj.fraction.denominator);
          console.log("main number is " + variablesObj.mainNumber);                    
          answer = (variablesObj.fraction.numerator / variablesObj.fraction.denominator * variablesObj.mainNumber);
          variablesObj.fraction = variablesObj.fraction.numerator + " in " + variablesObj.fraction.denominator;
          break;
        default:
            answer = "";
    }

    const question = replaceTagsWithValues(variablesObj, chosenSentence.sentence);


    return {question, answer}
}


const whatIsLeft = (total, fraction1, fraction2) => {
    const numerator = total * fraction1.denominator * fraction2.denominator -
      (fraction1.numerator * fraction2.denominator) - (fraction2.numerator * fraction1.denominator);
    const denominator = fraction1.denominator * fraction2.denominator;
  
    return { numerator, denominator };
  };

  
// const convertToFraction = (value) => {
//     const gcd = calculateGCD(value * 100, 100);
//     const numerator = (value * 100) / gcd;
//     const denominator = 100 / gcd;
  
//     return numerator + "/" + denominator;
//   }

// const convertToFraction = (value) => {
//     const gcd = calculateGCD(value, 1e-6); // Use a small epsilon value for comparison
//     const numerator = value / gcd;
//     const denominator = 1 / gcd;
  
//     return numerator + "/" + denominator;
//   }

const convertToFraction = (value) => {
    const epsilon = 1e-6; // Small epsilon value for comparison
    let numerator = value;
    let denominator = 1;
  
    while (Math.abs(numerator - Math.round(numerator)) > epsilon) {
      numerator *= 10;
      denominator *= 10;
    }
  
    const gcd = calculateGCD(numerator, denominator);
    numerator /= gcd;
    denominator /= gcd;
  
    return numerator + "/" + denominator;
  };
  
const getSmallMultiple = (value) => {
  const multiplicand = Math.floor(Math.random() * 8 + 1);
  return multiplicand * value;
}