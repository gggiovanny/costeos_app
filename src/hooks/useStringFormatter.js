export function useStringFormatter() {
  return {
    money: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
  }
}
