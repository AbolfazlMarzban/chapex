import { Request, NextFunction } from 'express'
import UserModel from './../model/userModel'

export default async (TU_FID: number, req: Request, next: NextFunction) => {
  try {
    const user = await UserModel.findById(TU_FID)
    req.user = user
  } catch (error) {
    console.log(error)
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
}