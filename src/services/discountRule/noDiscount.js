/* eslint-disable class-methods-use-this */
export default class NoDiscount {
  /**
     *
     * @param {*} products list or ordered item
     * @return {totalOrder: number, discountAmount: number}
     */
  calculateDiscount(products) {
    const totalOrder = products.reduce((total, item) => total + item.price * item.quantity || 0, 0);
    return { totalOrder, discountAmount: 0 };
  }
}
