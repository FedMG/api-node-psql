import { CustomError } from '../errors/custom-error.js'

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Something went wrong!' })
}

export default errorHandler
