//file for validation pattern, length, and custom validation for form fields
// i can use this object in the register and login modals to validate the form fields before dispatching the actions, and show the error messages if the validation fails

export const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 50,
    message: "Username must be between 3 and 50 characters",
  },

  password: {
    required: true,
    pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$",
    message: `Password must contain at least 4 characters, 1 number, 1 lowercase letter, 1 uppercase letter`,
  },

  city: {
    required: true,
    minLength: 2,
    maxLength: 40,
    message: "City must be between 2 and 40 characters",
  },

  dateOfBirth: {
    required: true,
    validate: (date) => {
      if (!date) return false;
      const today = new Date();
      const selected = new Date(date);
      return selected < today;
    },
    message: "Date of birth must be in the past",
  },
};
