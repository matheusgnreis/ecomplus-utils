import config from './../lib/config'
import price from './price'

const formatMoney = (value, currency = config.get('currency'), lang = config.get('lang')) => {
  // price to number
  if (typeof value === 'object') {
    if (value !== null) {
      // suppose to be product object
      value = price(value)
    }
  } else if (typeof value === 'string') {
    value = parseFloat(value)
  }

  if (currency) {
    try {
      // format price string
      // lang code format: pt-br, en-us...
      return value.toLocaleString(lang.replace('_', '-'), { style: 'currency', currency })
    } catch (err) {
      console.error(err)
    }
  }
  // fallback using configured currency symbol
  const moneyPrefix = (currency || config.get('currency_symbol')) + ' '
  return typeof value === 'number' ? moneyPrefix + value : ''
}

/**
 * @method
 * @memberof ecomUtils
 * @name formatMoney
 * @description Parse price number to formatted currency string.
 * @param {number|object} value - Price number or body object (product or variation)
 * @param {string|null} [currency=config.get('currency')] - Currency code such as 'BRL'
 * @param {string} [lang=config.get('lang')] - Snake case language code, eg.: 'en_us', 'pt_br'
 * @returns {string}
 *
 * @example
 * // With number as value
 * ecomUtils.formatMoney(10.6)
 * // => $10.60
 * ecomUtils.formatMoney(10.6, 'BRL')
 * // => R$10.60
 * ecomUtils.formatMoney(10.6, 'BRL', 'pt_br')
 * // => R$ 10,60
 *
 * @example
 * // With product, variation or cart item object as value
 * // Full object ref.: https://developers.e-com.plus/docs/api/#/store/products/
 * ecomUtils.formatMoney({ sku: 'TEST', name: 'Test', price: 140.56 })
 * // => $140.56
 *
 * @example
 * // You can also set the configured lang and currency first
 * ecomUtils._config.set('lang', 'pt_br')
 * ecomUtils._config.set('currency', 'BRL')
 * ecomUtils._config.set('currency_symbol', 'R$')
 * // Then call `formatMoney` without expliciting currency and lang
 * ecomUtils.formatMoney(10.6)
 * // => R$ 10,60
 *
 * @example
 * // Importing this method standalone
 * import formatMoney from '@ecomplus/utils/dist/methods/format-money'
 */

export default formatMoney
