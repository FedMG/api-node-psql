export const isStringWithLength = (name) => {
  return !isNaN(Number(name)) || !(typeof(name) === 'string') || name.length > 10
}