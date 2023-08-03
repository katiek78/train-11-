import { getVariables, getRandomItem, replaceTagsWithValues, lengthUnits } from "./randomUtils";

const formatNumber = (number, dp) => {
    
    // Round the number to 4 decimal places
    const roundedNumber = Number(number.toFixed(dp));
    
    // Convert the number to a string
    let formattedNumber = roundedNumber.toString();
    
    // Remove trailing zeroes and decimal point if unnecessary
    if (formattedNumber.includes('.')) {
        while (formattedNumber.charAt(formattedNumber.length - 1) === '0') {
        formattedNumber = formattedNumber.slice(0, -1);
        }
        if (formattedNumber.charAt(formattedNumber.length - 1) === '.') {
        formattedNumber = formattedNumber.slice(0, -1);
        }
    }
    
    return formattedNumber;
      
}

const getEquivalentMeasurement = (measurement, currentUnit, desiredUnit) => {
    const conversionFactors = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
      };
    
      // Convert the measurement to a common base unit (meters)
      const measurementInMeters = measurement * conversionFactors[currentUnit];
    
      // Convert the measurement from meters to the desired unit
      const equivalentMeasurement = measurementInMeters / conversionFactors[desiredUnit];
    
      return equivalentMeasurement;
}

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
            //Ensure lengthUnit1 is bigger than lengthUnit2
             while (lengthUnits.indexOf(variablesObj.lengthUnit1) <= lengthUnits.indexOf(variablesObj.lengthUnit2) || lengthUnits.indexOf(variablesObj.lengthUnit1) > lengthUnits.indexOf(variablesObj.lengthUnit2) + 2 ) {
                console.log("re-roll")
                variablesObj.lengthUnit1 = getRandomItem(variablesObj, "lengthUnit")
                variablesObj.lengthUnit2 = getRandomItem(variablesObj, "lengthUnit")
       
             }
            
           const equivalentMeasurement1 = getEquivalentMeasurement(variablesObj.measurement1, variablesObj.lengthUnit1, variablesObj.lengthUnit2);
        //    console.log(equivalentMeasurement1)
           answer = formatNumber(equivalentMeasurement1 - variablesObj.measurement2, 4);

    

           break;
       
        default:
            answer = "";
    }

    const question = replaceTagsWithValues(variablesObj, chosenSentence.sentence);
  
   
  
    return { question: question, answer: answer };
  }
  