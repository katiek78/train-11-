export const createFractionsQuestion = () => {
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
  
  // Helper function to simplify fractions
  function simplifyFraction(numerator, denominator) {
    var gcd = calculateGCD(numerator, denominator);
    let newNumerator = numerator / gcd;
    let newDenominator = denominator / gcd;
    if (newDenominator < 0) {
        newDenominator = -newDenominator;
        newNumerator = -newNumerator;
    }
    return newNumerator + "/" + newDenominator;
  }
  
  // Helper function to calculate the greatest common divisor (GCD)
  function calculateGCD(a, b) {
    if (b === 0) {
      return a;
    }
    return calculateGCD(b, a % b);
  }
  

  