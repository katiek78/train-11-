export const createAlgebraQuestion = () => {
    
    // Generate a random integer value for x
    //const x = Math.floor(Math.random() * 20) - 10; // Allow negative value
    const x = Math.floor(Math.random() * 10); // Don't allow negative value
  
    // Generate random coefficients
    let a, b;
    do {
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
    } while (a === b); // Ensure a and b are not equal
  
    // Calculate the constants based on x and the desired answer
    const c = Math.floor(Math.random() * 20) - 10;
    const d = a * x + c - b * x;
  
    // Generate a random variable letter (a, b, c, d, x, y)
    const variables = ["a", "b", "c", "d", "𝑥", "y"];
    const variable = variables[Math.floor(Math.random() * variables.length)];
  
    // Adjust the operator and constant based on the sign
    const operator = c < 0 ? " - " : " + ";
    const constant = Math.abs(c);
    const rhsOperator = d < 0 ? " - " : " + ";
    const rhsConstant = Math.abs(d);
  
    // Generate the question
    const question = (a === 1 ? "" : a) + variable + (constant === 0 ? "" : operator + constant) + " = " + (b === 1 ? "" : b) + variable + (rhsConstant === 0 ? "" : rhsOperator + rhsConstant);
  
    return { question: question, answer: x };
  }
  