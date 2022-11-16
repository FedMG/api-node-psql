export const errorListener = (callback) => {
  return async ($1, $2, $3) => {
    try {
      await callback($1, $2, $3);
    } catch (error) {
      if ($3) {
        return $3(error)
      }
      throw new Error("ErrorListener: ", error)
    }
  };
};