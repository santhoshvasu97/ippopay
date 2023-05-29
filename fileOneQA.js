// Check if a character is lowercase
function isLowercase(char) {
  return char >= 'a' && char <= 'z';
}

// Check if a character is uppercase
function isUppercase(char) {
  return char >= 'A' && char <= 'Z';
}

// Check if a character is a digit
function isDigit(char) {
  return char >= '0' && char <= '9';
}

// Check if a password is strong
function isStrongPassword(password) {
  if (password.length < 6 || password.length > 20) {
    return false;
  }

  let hasLowercase = false;
  let hasUppercase = false;
  let hasDigit = false;
  let repeatingCount = 0;

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (isLowercase(char)) {
      hasLowercase = true;
    } else if (isUppercase(char)) {
      hasUppercase = true;
    } else if (isDigit(char)) {
      hasDigit = true;
    }

    if (i > 0 && char === password[i - 1]) {
      repeatingCount++;
      if (repeatingCount % 3 === 0) {
        return false;
      }
    } else {
      repeatingCount = 1;
    }
  }

  return hasLowercase && hasUppercase && hasDigit;
}

// Calculate the minimum number of steps required to make password strong
function minimumStepsToMakeStrongPassword(password) {
  let steps = 0;

  if (password.length < 6) {
    steps += 6 - password.length;
  }

  if (password.length > 20) {
    steps += password.length - 20;
  }

  if (!isLowercase(password) || !isUppercase(password) || !isDigit(password)) {
    steps += 3;
  }

  let repeatingCount = 0;

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (i > 0 && char === password[i - 1]) {
      repeatingCount++;
      if (repeatingCount % 3 === 0) {
        steps++;
      }
    } else {
      repeatingCount = 1;
    }
  }

  return Math.max(steps, 6 - password.length);
}

// Unit tests
function runTests() {
  // Test case 1
  let password = "a";
  let expected = 5;
  let result = minimumStepsToMakeStrongPassword(password);
  console.log(result === expected);

  // Test case 2
  password = "aA1";
  expected = 3;
  result = minimumStepsToMakeStrongPassword(password);
  console.log(result === expected);

  // Test case 3
  password = "1337C0d3";
  expected = 0;
  result = minimumStepsToMakeStrongPassword(password);
  console.log(result === expected);
}

// Run the unit tests
runTests();