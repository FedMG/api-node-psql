const notFound = (_, res) =>
  res.status(404).send("That route does not exist");

export default notFound