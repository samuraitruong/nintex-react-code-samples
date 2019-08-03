export class ProductQuantityDiscount {
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
        const discountItems = products.filter((product) => product.id === this.discount.id && product.quantity >= this.discount.appyProductId);
        let discountAmount = discountItems.reduce((total, item) => total + (item.price - this.discount.priceDiscount) * item.quantity || 0, 0);;

        return {totalOrder, discountAmount}
    }
}