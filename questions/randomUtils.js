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
    console.log(sentence);
    //initialise the object
    const variablesObj = {}

    //get all the tag names into an array
    const variables = extractTagNames(sentence);

    //for each tag, pick something from that list (if includes name, use name list, if includes fraction, make up a fraction smaller than 1)
    //add a property to the object
    variables.forEach(variable => {
       
       
        if (variable.includes("fraction")) {
             variablesObj[variable] = getRandomFraction();
        // } else if (variable.includes("group")) {
        //     variablesObj[variable] = getRandomGroup(variablesObj);
        // } else if (variable.includes("place")) {
        //     variablesObj[variable] = getRandomPlace(variablesObj);
        // } else if (variable.includes("transport")) {
        //     variablesObj[variable] = getRandomTransport(variablesObj);
        // } else if (variable.includes("food")) {
        //     variablesObj[variable] = getRandomFood();
        } else if (variable.includes("percentage")) {
            variablesObj[variable] = getRandomPercentage();
        } else if (variable.includes("mainNumber")) {
            variablesObj[variable] = getRandomMainNumber();
        } else variablesObj[variable] = getRandomItem(variablesObj, removeNumbersFromString(variable));
    })
    
    console.log(variablesObj);

    //return the object
    return variablesObj
}

export const getRandomPercentage = () => {
    const randomDecimal = Math.random(); // Generate a random decimal between 0 and 1
    const roundedPercentage = Math.round(randomDecimal * 100); // Convert to a whole number percentage between 0 and 100
    const roundedAndAdjusted = Math.floor(roundedPercentage / 5) * 5; // Round down to the nearest multiple of 5
  
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


  const getRandomItem = (variablesObj, itemType) => {
    const itemArrayName = itemType + "s";
    const itemArray = eval(itemArrayName);
    let selectedItem = itemArray[Math.floor(Math.random() * itemArray.length)];    
    while (isStringFoundInObject(variablesObj, selectedItem)) {
        selectedItem = itemArray[Math.floor(Math.random() * itemArray.length)]; 
    }
    return selectedItem;
}


const getRandomFraction = () => {
    //should simplify here**
    const denominator = Math.floor(Math.random() * 10) + 2;
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    return ({numerator, denominator});
}

const colours = ['blue', 'red', 'yellow' ,'green', 'orange', 'purple'];
const foods = ['cake', 'pizza', 'paella', 'pie', 'rhubarb crumble'];
const groups = ['friends', 'schoolchildren', 'elderly people', 'nuns', 'footballers', 'cricketers', 'teachers'];
const names = ['Adam', 'Amelia', 'Anna', 'Ali', 'Bethany', 'Boris', 'Caleb', 'Charlotte', 'Dan', 'Dev', 'Emily', 'Ethan', 'Freya', 'Freddie', 'Gavin', 'George', 'Greta', 'Harry', 'Helen', 'Ishaan', 'Isabelle', 'Jenny', 'Jack', 'Katie', 'Lauren', 'Luca', 'Millie', 'Nathan', 'Oliver', 'Paula', 'Robin', 'Rishab', 'Sunny', 'Stella', 'Tim', 'Tom', 'Vera', 'Wendy', 'Zoe', 'Zac'];
const places = ['Alton Towers', 'Disneyland', 'the Trafford Centre', 'Timperley village', 'London', 'Edinburgh', 'Chessington World of Adventures'];
const smallThings = ['sweets', 'marbles', 'socks'];
const transports = ['bus', 'car', 'train', 'motorbike', 'hovercraft', 'tram', 'coach'];
  