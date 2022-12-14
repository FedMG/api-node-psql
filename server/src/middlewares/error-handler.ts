import { CustomError } from '../errors/custom-error.js'

const errorHandler = (err: any, _req: any, res: any, _next: any) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Something went wrong!' })
}

export default errorHandler
