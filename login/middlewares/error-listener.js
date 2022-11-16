export const errorListener = (callback) => {
  return async ($1 = null, $2 = null, $3 = null) => {
    try {
      return await callback($1, $2, $3);
    } catch (error) {
      if (typeof $3 === 'function') {
        return $3(error)
      }
      throw error
    }
  };
};