const notFound = (_: any, res: any) =>
  res.status(404).send('That route does not exist')

export default notFound
