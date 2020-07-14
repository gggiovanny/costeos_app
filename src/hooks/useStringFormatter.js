import { number } from 'prop-types'

export function useStringFormatter() {
  return {
    money: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
    toFloat: (string) => {
      if (typeof string == 'string') {
        string = string.replace('$', '')
        return parseFloat(string.replace(',', ''))
      } else return string
    },
  }
}
