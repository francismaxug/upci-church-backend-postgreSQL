import { Request, Response, NextFunction } from "express"
const handleError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message
  })
}

export default handleError
