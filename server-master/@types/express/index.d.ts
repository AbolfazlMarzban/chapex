declare global {
  namespace Express {
    interface Request {
      TU_FID: number,
      user: object
    }
  }
}

export { }