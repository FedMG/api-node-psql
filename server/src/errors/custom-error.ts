export class CustomError extends Error {
  status: number
  
  constructor (msg: string, status: number) {
    super(msg)
    this.status = status
  }
}

export const createCustomError = (msg: string, status: number) => {
  return new CustomError(msg, status)
}
