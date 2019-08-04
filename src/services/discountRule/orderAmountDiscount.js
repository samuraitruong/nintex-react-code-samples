export default class OrderAmountDiscount {
  constructor(discount) {
    this.discount = discount;
  }

  /**
     *
     * @param {*} products list or ordered item
     * @return {totalOrder: number, discountAmount: number}
     */
  calculateDiscount(products) {
    const totalOrder = products.reduce((total, item) => total + item.price * item.quantity || 0, 0);
    let discountAmount = 0;
    if (totalOrder >= this.discount.applyDiscountAmount) {
      discountAmount = (totalOrder * this.discount.percentDiscount) / 100;
    }
    return { totalOrder, discountAmount };
  }
}
