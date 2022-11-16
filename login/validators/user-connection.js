export const validateDataUser = ({ name, email, password, password2 }) => {
  const errors = [];
  if (!name || !email || !password) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Please should be at least 6 characters" });
  }

  if (password != password2) {
    errors.push({ message: "Password do not match" });
  }

  return errors.length > 0 && errors;
};
