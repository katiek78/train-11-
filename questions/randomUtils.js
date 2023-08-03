export const extractTagNames = (str) => {
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
  

  export const replaceTagsWithValues = (obj, sentence) => {
    const regex = /<([^<>]+)>/g;
    const replacedSentence = sentence.replace(regex, function(match, tagName) {
      const trimmedTagName = tagName.trim();
      const tagValue = obj[trimmedTagName];
      
      if (trimmedTagName.includes('fraction') && typeof tagValue === 'object' && 'numerator' in tagValue && 'denominator' in tagValue) {
        return `${tagValue.numerator}⁄${tagValue.denominator}`;
      }
      
      return tagValue || match;
    });
  
    return replacedSentence;
  }



export const getVariables = (sentence) => {
    
    //initialise the object
    const variablesObj = {}

    //get all the tag names into an array
    const variables = extractTagNames(sentence);

    //for each tag, pick something from that list (if includes name, use name list, if includes fraction, make up a fraction smaller than 1)
    //add a property to the object
    variables.forEach(variable => {
       
       
        if (variable.includes("fraction")) {
             variablesObj[variable] = getRandomFraction();     
        } else if (variable.includes("percentage")) {
            variablesObj[variable] = getRandomPercentage();
        } else if (variable.includes("mainNumber")) {
            variablesObj[variable] = getRandomMainNumber();
        } else if (variable.includes("nextNoteUp")) {
            variablesObj[variable] = getNextNoteUp((100 - variablesObj.percentage) / 100 * variablesObj.mainNumber);
        } else if (variable.includes("measurement")) {
          variablesObj[variable] = getRandomMeasurement();  
        } else if (variable.includes("placeholder")) {
            variablesObj[variable] = 0;
        } else variablesObj[variable] = getRandomItem(variablesObj, removeNumbersFromString(variable));
    })
    
    console.log(variablesObj);

    //return the object
    return variablesObj
}

export const getRandomPercentage = (min = 0, max = 100) => {
    let randomDecimal = Math.random(); // Generate a random decimal between 0 and 1    
    let roundedPercentage = Math.round(randomDecimal * 100); // Convert to a whole number percentage between 0 and 100
    let roundedAndAdjusted = Math.floor(roundedPercentage / 5) * 5; // Round down to the nearest multiple of 5
  
    while (roundedAndAdjusted < min || roundedAndAdjusted > max) {
      randomDecimal = Math.random(); // Generate a random decimal between 0 and 1    
      roundedPercentage = Math.round(randomDecimal * 100); // Convert to a whole number percentage between 0 and 100
      roundedAndAdjusted = Math.floor(roundedPercentage / 5) * 5; // Round down to the nearest multiple of 5
      
    }

    return roundedAndAdjusted;
};

export const getRandomMainNumber = () => {
  
  // Main function to get a random number between 10 and 1000 (excluding prime numbers and above 100, only round numbers ending in '00')
    const min = 10;
    const max = 1000;
    let randomNumber;
  
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      // Increase the number to the next round number ending in '00' if it's greater than 100
      if (randomNumber > 100) {
        randomNumber = Math.ceil(randomNumber / 100) * 100;
      }
    } while (isPrime(randomNumber));
  
    return randomNumber;
  };

  // Helper function to check if a number is prime
  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
  
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
    }
  
    return true;
  };

  export const isStringFoundInObject = (obj, searchStr) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (isStringFoundInObject(obj[key], searchStr)) {
          return true;
        }
      } else if (typeof obj[key] === 'string' && obj[key].includes(searchStr)) {
        return true;
      }
    }
    return false;
  };
  
  const removeNumbersFromString = (str) => {
    return str.replace(/\d+/g, '');
  };

  export const getValuesOfPropertiesWithNumber = (obj) => {
    const valuesOfPropertiesWithNumber = [];
  
    for (const propertyName in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, propertyName)) {
        if (typeof obj[propertyName] === 'number') {
          valuesOfPropertiesWithNumber.push(obj[propertyName]);
        }
      }
    }
  
    return valuesOfPropertiesWithNumber;
  }

  const getRandomMeasurement = () => {
    let result;
    do {
      result = getRandomInteger(10) + "." + getRandomInteger(10, false);
    } while (result === "0.0");
    return result;
    
  }

  const getRandomInteger = (max, zeroAllowed = true) => {
    if (zeroAllowed) {
      return Math.floor(Math.random() * max);
    }
    else return Math.floor(Math.random() * max - 1) + 1;
  }


  export const getRandomItem = (variablesObj, itemType) => {
    console.log(itemType);
    //const itemArrayName = itemType + "s";
    // const itemArray = eval(itemArrayName); //this doesn't work on mobile or tablet
    let itemArray;
    let mustBeUnique = true;

    switch(itemType) {
      case 'colour':
        itemArray = colours;
        break;
      case 'dartsNumber':
        itemArray = dartsNumbers;
        mustBeUnique = false;
        break;
      case 'food':
        itemArray = foods;
        break;
      case 'group':
        itemArray = groups;
        break;
      case 'name':
          itemArray = names;
          break;
      case 'object':
        itemArray = objects;
        break;
      case 'place':
        itemArray = places;
        break;
      case 'smallThing':
        itemArray = smallThings;
        break;
      case 'sport':
        itemArray = sports;
        break;
      case 'transport':
        itemArray = transports;
        break;
      case 'longObject':
        itemArray = longObjects;
      
        break;
      case 'lengthUnit':
        itemArray = lengthUnits
        mustBeUnique = false; //seems to cause a crash
        break;
    }
    console.log(itemArray);
    console.log("length is " + itemArray.length);
    let selectedItem = itemArray[Math.floor(Math.random() * itemArray.length)];    
    
    if (mustBeUnique) {
      while (isStringFoundInObject(variablesObj, selectedItem)) {
          selectedItem = itemArray[Math.floor(Math.random() * itemArray.length)]; 
      }
    }
    return selectedItem;
}


export const getRandomFraction = () => {
    //should simplify here**
    const denominator = Math.floor(Math.random() * 10) + 2;
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    return ({numerator, denominator});
}

export const areAllMembersUnique = (arr) => {  
  const uniqueSet = new Set(arr);  
  return uniqueSet.size === arr.length;
}


export const getNextNoteUp = (amount) => {
  const noteValues = [5, 10, 20, 50];
  const highestNote = Math.max(...noteValues);
  if (amount > highestNote) return 0;

  for (let i = 0; i < noteValues.length; i++) {
    const note = noteValues[i];
    if (amount <= note) {
      return note;
    }
  }
}

function getPossibleDartsScores() {
  const scores = new Set([25, 50]); // Using a Set to ensure uniqueness
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1); // Numbers 1 to 20

  // Add single scores for each number (1 to 20)
  scores.add(...numbers);

  // Add double and triple scores for each number
  numbers.forEach((number) => {
    scores.add(number * 2); // Double
    scores.add(number * 3); // Triple
  });

  return Array.from(scores); // Convert Set back to an array
}

const colours = ['blue', 'red', 'yellow' ,'green', 'orange', 'purple', 'pink'];
const dartsNumbers = getPossibleDartsScores();
const foods = ['cake', 'pizza', 'paella', 'pie', 'rhubarb crumble', 'lemon meringue pie'];
const groups = ['friends', 'schoolchildren', 'elderly people', 'nuns', 'footballers', 'cricketers', 'teachers', 'doctors', 'hairdressers', 'software developers'];
const names = ['Adam', 'Amelia', 'Anna', 'Ali', 'Ben', 'Bethany', 'Boris', 'Caleb', 'Charlotte', 'Chloe', 'Dan', 'Dev', 'Eesa', 'Emily', 'Ethan', 'Freya', 'Freddie', 'Gavin', 
'George', 'Greta', 'Harriet', 'Harry', 'Helen', 'Ishaan', 'Isabelle', 'Jenny', 'Jack', 'Josh', 'Kath', 'Katie', 'Lauren', 'Lily', 'Luca', 'Millie', 'Nathan','Olive', 'Oliver',
 'Paula', 'Robin', 'Rohan', 'Roy', 'Rishab', 'Simon', 'Sunny', 'Stella', 'Steve', 'Tim', 'Toby', 'Tom', 'Vera', 'Wendy', 'Zoe', 'Zac'];
const places = ['Alton Towers', 'Disneyland', 'the Trafford Centre', 'Timperley village', 'London', 'Edinburgh', 'Chessington World of Adventures'];
const smallThings = ['bouncy balls', 'sweets', 'marbles', 'pegs', 'socks', 'stickers'];
const sports = ['football', 'cricket', 'tennis', 'rugby', 'cycling', 'netball', 'hockey', 'dodgeball', 'baseball'];
const transports = ['bus', 'car', 'train', 'bike', 'motorbike', 'scooter', 'tram', 'coach', 'boat'];
const objects = ['sofa', 'holiday', 'laptop', 'car', 'fridge', 'desk', 'washing machine']
const longObjects = ['daisy chain', 'paper chain', 'scarf'];
export const lengthUnits = ['mm', 'cm', 'm', 'km']