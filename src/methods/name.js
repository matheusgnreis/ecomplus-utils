import config from './../lib/config'
import i18n from './i18n'

const name = (body, lang = config.get('lang')) => {
  // prefer translated item name
  if (lang && body.i18n && body.i18n[lang]) {
    return body.i18n[lang]
  } else {
    return body.name || body.title || i18n(body.i18n, lang) || ''
  }
}

/**
 * @method
 * @memberof ecomUtils
 * @name name
 * @description Returns object name by lang.
 * @param {object} body - Object (product, category, brand, grid...) body
 * @param {string} [lang=config.get('lang')] - Snake case language code, eg.: 'en_us', 'pt_br'
 * @returns {string}
 *
 * @example
 * // Sample object with name and translations
 * const product = { name: 'Test', i18n: { en_us: 'Test', pt_br: 'Teste' } }
 * ecomUtils.name(product)
 * // => 'Test'
 * ecomUtils.name(product, 'pt_br')
 * // => 'Teste'
 *
 * @example
 * // Without translations
 * ecomUtils.name({ name: 'Hello' })
 * // => 'Hello'
 * ecomUtils.name({ name: 'Hello' }, 'pt_br')
 * // => 'Hello'
 * ecomUtils.name({ title: 'Mundo' }, 'en_us')
 * // => 'Mundo'
 *
 * @example
 * // You can also set the configured lang first
 * ecomUtils._config.set('lang', 'pt_br')
 * // Then call `name` without expliciting lang
 * ecomUtils.name({ name: 'Test', i18n: { en_us: 'Test', pt_br: 'Teste' } })
 * // => 'Teste'
 *
 * @example
 * // Importing this method standalone
 * import name from '@ecomplus/utils/dist/methods/name'
 */

export default name
