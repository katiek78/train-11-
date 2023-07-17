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
  
  // Helper function to simplify fractions
//   function simplifyFraction(numerator, denominator) {
//     var gcd = calculateGCD(numerator, denominator);
//     let newNumerator = numerator / gcd;
//     let newDenominator = denominator / gcd;
//     if (newDenominator < 0) {
//         newDenominator = -newDenominator;
//         newNumerator = -newNumerator;
//     }
//     return newNumerator + "/" + newDenominator;
//   }

  function simplifyFraction(numerator, denominator) {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero.");
    }
  
    // Find the greatest common divisor (gcd) of the numerator and denominator
    var divisor = calculateGCD(numerator, denominator);
  
    // Simplify the fraction by dividing both numerator and denominator by their gcd
    var simplifiedNumerator = numerator / divisor;
    var simplifiedDenominator = denominator / divisor;
  
    //return [simplifiedNumerator, simplifiedDenominator];
    return simplifiedNumerator + "/" + simplifiedDenominator;
  }
  
  // Helper function to calculate the greatest common divisor (GCD)
//   function calculateGCD(a, b) {
//     if (b === 0) {
//       return a;
//     }
//     return calculateGCD(b, a % b);
//   }

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
 var question = numerator1 + "/" + denominator1 + " " + operator + " " + numerator2 + "/" + denominator2;

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

 return { question: question, answer: answer };
}
  

const createWordFractionsQuestion = () => {    
    const sentences = [
        {sentence: '<name1> and <name2> cooked a <food>. <name1> ate <fraction1> of the <food> and <name2> ate <fraction2> of the <food>. What fraction of the <food> was left?', description: "whatIsLeft"}
    ]

    const chosenSentenceIndex = Math.floor(Math.random() * sentences.length);
    const chosenSentence = sentences[chosenSentenceIndex];
    
    const variablesObj = getVariableNames(chosenSentence.sentence);

    const question = replaceTagsWithValues(variablesObj, chosenSentence.sentence);

    let answer;

    switch(chosenSentence.description) {
        case "whatIsLeft":
            const { numerator, denominator} = whatIsLeft(1, variablesObj.fraction1, variablesObj.fraction2);
            answer = simplifyFraction(numerator, denominator);
         
            break;
        default:
            answer = "";
    }

    return {question, answer}
}


const whatIsLeft = (total, fraction1, fraction2) => {
    const numerator = total * fraction1.denominator * fraction2.denominator -
      (fraction1.numerator * fraction2.denominator) - (fraction2.numerator * fraction1.denominator);
    const denominator = fraction1.denominator * fraction2.denominator;
  
    return { numerator, denominator };
  };

const getVariableNames = (sentence) => {
    //initialise the object
    const variablesObj = {}

    //get all the tag names into an array
    const variables = extractTagNames(sentence);

    //for each tag, pick something from that list (if includes name, use name list, if includes fraction, make up a fraction smaller than 1)
    //add a property to the object
    variables.forEach(variable => {
       
        if (variable.includes("name")) {
            variablesObj[variable] = getRandomName();
        } else if (variable.includes("fraction")) {
            variablesObj[variable] = getRandomFraction();
        } else variablesObj[variable] = "cake";
    })
    
    //return the object
    return variablesObj
}

const getRandomName = () => {
    const names = ['Adam', 'Amelia', 'Anna', 'Ali', 'Bethany', 'Boris', 'Caleb', 'Charlotte', 'Dan', 'Dev', 'Emily', 'Ethan', 'Freya', 'Freddie', 'Gavin', 'George', 'Greta', 'Harry', 'Helen', 'Ishaan', 'Isabelle', 'Jenny', 'Jack', 'Katie', 'Lauren', 'Luca', 'Millie', 'Nathan', 'Oliver', 'Paula', 'Robin', 'Rishab', 'Sunny', 'Stella', 'Tim', 'Tom', 'Vera', 'Wendy', 'Zoe', 'Zac'];
    return names[Math.floor(Math.random() * names.length)];
}

const getRandomFraction = () => {
    //should simplify here**
    const denominator = Math.floor(Math.random() * 10) + 2;
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    return ({numerator, denominator});
}

const extractTagNames = (str) => {
    const regex = /<([^<>]+)>/g;
    const tagNames = [];
    let match;
  
    while ((match = regex.exec(str)) !== null) {
      tagNames.push(match[1]);
    }
  
    const uniqueTagNames = [];
    for (let i = 0; i < tagNames.length; i++) {
        if (uniqueTagNames.indexOf(tagNames[i]) === -1) {
          uniqueTagNames.push(tagNames[i]);
        }
      }

    return uniqueTagNames;
  }
  
// const replaceTagsWithValues = (obj, sentence) => {
//     const regex = /<([^<>]+)>/g;
//     const replacedSentence = sentence.replace(regex, function(match, tagName) {
//       return obj[tagName.trim()] || match;
//     });
  
//     return replacedSentence;
//   }

const replaceTagsWithValues = (obj, sentence) => {
    const regex = /<([^<>]+)>/g;
    const replacedSentence = sentence.replace(regex, function(match, tagName) {
      const trimmedTagName = tagName.trim();
      const tagValue = obj[trimmedTagName];
      
      if (trimmedTagName.includes('fraction') && typeof tagValue === 'object' && 'numerator' in tagValue && 'denominator' in tagValue) {
        return `${tagValue.numerator}/${tagValue.denominator}`;
      }
      
      return tagValue || match;
    });
  
    return replacedSentence;
  }


  
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
  
  