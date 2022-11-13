class CustomError extends Error {
  constructor(msg, status) {
    super(msg);
    this.status = status;
  }
}

export const createCustomError = (msg, status) => {
  return new CustomError(msg, status);
};
