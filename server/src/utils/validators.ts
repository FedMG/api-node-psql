export const isStringWithLength = (name: string): boolean => {
  return !isNaN(Number(name)) || !(typeof(name) === 'string') || name.length > 10
}