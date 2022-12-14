export const errorListener = (controller: Function) => {
  return async (req: any, res: any, next: any) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
