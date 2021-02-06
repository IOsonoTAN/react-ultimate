export const getCurrentTimestamp = (digit: number = 10) => (
  +new Date().getTime().toString().substr(0, 10)
)