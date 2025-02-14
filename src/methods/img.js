const img = (product, pictureId, size = 'normal') => {
  if (product) {
    // product object has 'pictures'
    // cart item object has 'picture'
    let { pictures, picture } = product
    if (!picture) {
      if (!pictures) {
        if (Array.isArray(product)) {
          // received list of pictures ?
          pictures = product
        } else {
          // received picture object ?
          picture = product
        }
      }
    }
    if (Array.isArray(pictures)) {
      // select one img object from product pictures
      picture = (pictureId && pictures.filter(pic => pic._id === pictureId)[0]) || pictures[0]
    }

    let img
    if (typeof picture === 'object' && picture !== null) {
      img = picture[size]
      if (!img) {
        // try with any size
        let sizes = [ 'big', 'normal', 'zoom', 'small' ]
        for (let i = 0; i < sizes.length; i++) {
          let size = sizes[i]
          if (picture[size]) {
            return picture[size]
          }
        }
        // last try with custom sizes
        for (let size in picture) {
          if (picture[size] && picture[size].url) {
            return picture[size]
          }
        }
      }
    }
    return img
  }
  return undefined
}

/**
 * @method
 * @memberof ecomUtils
 * @name img
 * @description Returns img object (with url and alt) from product body or pictures list.
 * @param {object|array} product - Product body object or list of picture objects
 * @param {string} [pictureId] - ObjectID of preferred picture to find in the list
 * @param {string} [size='normal'] - Preferred image size to find on picture object
 * @returns {object|undefined}
 *
 * @example
 * const product = { 'pictures': [ { 'small': { 'url': 'https://ecom.com/imgs/100px/64gb.jpg'}, 'big': { 'url': 'https://ecom.com/imgs/700px/64gb.jpg' }, '_id': '694890155127368133600000' }, { 'small': { 'url': 'https://ecom.com/imgs/100px/e-5-64gb.jpg' }, 'big': { 'url': 'https://ecom.com/imgs/700px/e-5-64gb.jpg' }, '_id': '694890155127368133600001' }, { 'small': { 'url': 'https://ecom.com/imgs/100px/5-64gb.jpg' }, 'big': { 'url': 'https://ecom.com/imgs/700px/5-64gb.jpg' }, '_id': '694890155127368133600002' } ], 'name': 'Smartphone Xiaomi' }
 * const id = '694890155127368133600001'
 * const size = 'big'
 * ecomUtils.img(product, id, size)
 * // => {url: 'https://ecom.com/imgs/700px/e-5-64gb.jpg'}
 *
 * @example
 * // Importing this method standalone
 * import img from '@ecomplus/utils/dist/methods/img'
 */

export default img
