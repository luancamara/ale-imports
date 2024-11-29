// ----------------------------------------------------------------------

/*
 * Locales code
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */

export type InputNumberValue = null | number | string | undefined

type Options = Intl.NumberFormatOptions | undefined

const DEFAULT_LOCALE = { code: 'pt-BR', currency: 'BRL' }

function processInput(inputValue: InputNumberValue): null | number {
  if (inputValue == null || Number.isNaN(inputValue)) {
    return null
  }
  return Number(inputValue)
}

// ----------------------------------------------------------------------

export function fNumber(inputValue: InputNumberValue, options?: Options) {
  const locale = DEFAULT_LOCALE

  const number = processInput(inputValue)
  if (number === null) {
    return ''
  }

  const fm = new Intl.NumberFormat(locale.code, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options
  }).format(number)

  return fm
}

// ----------------------------------------------------------------------

export function fCurrency(inputValue: InputNumberValue, options?: Options) {
  const locale = DEFAULT_LOCALE

  const number = processInput(inputValue)
  if (number === null) {
    return ''
  }

  const fm = new Intl.NumberFormat(locale.code, {
    currency: locale.currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: 'currency',
    ...options
  }).format(number)

  return fm
}

// ----------------------------------------------------------------------

export function fPercent(inputValue: InputNumberValue, options?: Options) {
  const locale = DEFAULT_LOCALE

  const number = processInput(inputValue)
  if (number === null) {
    return ''
  }

  const fm = new Intl.NumberFormat(locale.code, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    style: 'percent',
    ...options
  }).format(number / 100)

  return fm
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue: InputNumberValue, options?: Options) {
  const locale = DEFAULT_LOCALE

  const number = processInput(inputValue)
  if (number === null) {
    return ''
  }

  const fm = new Intl.NumberFormat(locale.code, {
    maximumFractionDigits: 2,
    notation: 'compact',
    ...options
  }).format(number)

  return fm.replace(/[A-Z]/g, match => match.toLowerCase())
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputNumberValue) {
  const number = processInput(inputValue)
  if (number === null || number === 0) {
    return '0 bytes'
  }

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']
  const decimal = 2
  const baseValue = 1024

  const index = Math.floor(Math.log(number) / Math.log(baseValue))
  const fm = `${Number.parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`

  return fm
}
