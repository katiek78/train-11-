import { getVariables, getRandomItem, replaceTagsWithValues, lengthUnits } from "./randomUtils";

export const createValueQuestion = () => {
    const sentences = [
        {sentence: "Which of these values is the largest? <percentage1>%, <fraction1>, <decimal1>, <fraction2>, <decimal2>", description: 'largest'},        
        {sentence: "Which of these values is the smallest? <percentage1>%, <fraction1>, <decimal1>, <fraction2>, <decimal2>", description: 'smallest'},        
    ]
   

    const chosenSentenceIndex = Math.floor(Math.random() * sentences.length);
    const chosenSentence = sentences[chosenSentenceIndex];
    
    const variablesObj = getVariables(chosenSentence.sentence);

    let answer;
    let equivalentValues = [];
    switch(chosenSentence.description) {
        case "largest":              
            //get array of values
          
            //Ensure all values different
            // while (lengthUnits.indexOf(variablesObj.lengthUnit1) <= lengthUnits.indexOf(variablesObj.lengthUnit2) || lengthUnits.indexOf(variablesObj.lengthUnit1) > lengthUnits.indexOf(variablesObj.lengthUnit2) + 2 ) {
            //     console.log("re-roll")
            //     variablesObj.lengthUnit1 = getRandomItem(variablesObj, "lengthUnit")
            //     variablesObj.lengthUnit2 = getRandomItem(variablesObj, "lengthUnit")
       
            //  }

            //return displayed value of largest
            equivalentValues.push({equiv: variablesObj.percentage1 / 100, displayed: variablesObj.percentage1 + "%"});
            equivalentValues.push({equiv: variablesObj.fraction1.numerator / variablesObj.fraction1.denominator, displayed: variablesObj.fraction1.numerator + "/" + variablesObj.fraction1.denominator});
            equivalentValues.push({equiv: variablesObj.decimal1, displayed: variablesObj.decimal1});
            equivalentValues.push({equiv: variablesObj.fraction2.numerator / variablesObj.fraction2.denominator, displayed: variablesObj.fraction1.numerator + "/" + variablesObj.fraction1.denominator});
            equivalentValues.push({equiv: variablesObj.decimal2, displayed: variablesObj.decimal2});
                        
          // const equivalentMeasurement1 = getEquivalentMeasurement(variablesObj.measurement1, variablesObj.lengthUnit1, variablesObj.lengthUnit2);
           console.log(equivalentValues);
          const elementWithMaxEquiv = equivalentValues.reduce((max, current) => {
            return current.equiv > max.equiv ? current : max;
          }, equivalentValues[0]);

           answer = elementWithMaxEquiv.displayed;
          
           break;
         case "smallest":              
           //get array of values
           
           //Ensure all values different
           // while (lengthUnits.indexOf(variablesObj.lengthUnit1) <= lengthUnits.indexOf(variablesObj.lengthUnit2) || lengthUnits.indexOf(variablesObj.lengthUnit1) > lengthUnits.indexOf(variablesObj.lengthUnit2) + 2 ) {
           //     console.log("re-roll")
           //     variablesObj.lengthUnit1 = getRandomItem(variablesObj, "lengthUnit")
           //     variablesObj.lengthUnit2 = getRandomItem(variablesObj, "lengthUnit")
      
           //  }

           //return displayed value of largest

                       
         // const equivalentMeasurement1 = getEquivalentMeasurement(variablesObj.measurement1, variablesObj.lengthUnit1, variablesObj.lengthUnit2);
       
          //answer = Math.max(...equivalentValues);

            //return displayed value of largest
            equivalentValues.push({equiv: variablesObj.percentage1 / 100, displayed: variablesObj.percentage1});
            equivalentValues.push({equiv: variablesObj.fraction1.numerator / variablesObj.fraction1.denominator, displayed: variablesObj.fraction1.numerator + "/" + variablesObj.fraction1.denominator});
            equivalentValues.push({equiv: variablesObj.decimal1, displayed: variablesObj.decimal1});
            equivalentValues.push({equiv: variablesObj.fraction2.numerator / variablesObj.fraction2.denominator, displayed: variablesObj.fraction1.numerator + "/" + variablesObj.fraction1.denominator});
            equivalentValues.push({equiv: variablesObj.decimal2, displayed: variablesObj.decimal2});
                        
          // const equivalentMeasurement1 = getEquivalentMeasurement(variablesObj.measurement1, variablesObj.lengthUnit1, variablesObj.lengthUnit2);
           console.log(equivalentValues);
          const elementWithMinEquiv = equivalentValues.reduce((min, current) => {
            return current.equiv < min.equiv ? current : min;
          }, equivalentValues[0]);

           answer = elementWithMinEquiv.displayed;
          

          break;

        default:
            answer = "";
    }

    const question = replaceTagsWithValues(variablesObj, chosenSentence.sentence);
  
   
  
    return { question: question, answer: answer };
  }
  