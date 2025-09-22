function checkEmail(mail) {
  if (mail.validity.typeMismatch) {
    mail.setCustomValidity("I am expecting an email address!");
    mail.reportValidity();
  } else {
    mail.setCustomValidity("");
    mail.reportValidity();
  }
}

function addEmailValidation() {
  const mail = document.getElementById("mail");

  mail.addEventListener("input", () => {
    checkEmail(mail);
  });
}

function checkPostal(postal, country) {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
    no: ["^\\d{4}$", "Norwegian postal codes must have 4 digits."],
  };

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");
  //  console.log(constraint);

  // Check it!
  if (constraint.test(postal.value)) {
    // The postal code follows the constraint, we use the ConstraintAPI to tell it
    postal.setCustomValidity("");
  } else {
    // The postal code doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    postal.setCustomValidity(constraints[country][1]);
  }
}

function addPostalValidation() {
  const countrySelect = document.getElementById("country");
  const postal = document.getElementById("postal");

  // For each country, defines the pattern that the postal code has to follow

  postal.addEventListener("input", () => {
    checkPostal(postal, countrySelect.value);
  });

  countrySelect.addEventListener("change", () => {
    checkPostal(postal, countrySelect.value);
  });
}

function checkFirstPassword(password) {
  if (password.validity.tooShort) {
    password.setCustomValidity(`Need to be atleast ${password.minLength}`);
  } else {
    password.setCustomValidity("");
  }
}

function checkSecondPassword(firstPassword, secondPassword) {
  if (secondPassword.value !== firstPassword.value) {
    secondPassword.setCustomValidity("Need to match first password");
  } else {
    secondPassword.setCustomValidity("");
  }
}

function addPasswordValidation() {
  const firstPassword = document.getElementById("password1");
  const secondPassword = document.getElementById("password2");
  secondPassword.validity.valid;

  firstPassword.addEventListener("input", () => {
    checkFirstPassword(firstPassword);
    checkSecondPassword(firstPassword, secondPassword);
  });

  secondPassword.addEventListener("input", () => {
    checkSecondPassword(firstPassword, secondPassword);
  });
}

function addFormValidation() {
  addEmailValidation();
  addPostalValidation();
  addPasswordValidation();

  const form = document.getElementById("submit");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      alert("Hi Five");
    } else {
      alert("Bummer");
    }
  });
}

export default addFormValidation;
