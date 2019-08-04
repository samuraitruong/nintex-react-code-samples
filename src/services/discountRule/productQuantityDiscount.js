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
        const {
            relatedProductIds = []
        } = this.discount;
        if (relatedProductIds.length === 0) {
            relatedProductIds.push(this.discount.appyProductId);
        }

        const totalOrder = products.reduce((total, item) => total + item.price * item.quantity || 0, 0);
        // find total item purchase that meet with discount relatedProductIds
        const quantityCount = products.reduce((total, item) => {
            if (relatedProductIds.some(x => x === item.id)) {
                return total + item.quantity;
            }
            return total;
        }, 0);
        const discountItems = products.filter((product) => product.id === this.discount.appyProductId && this.discount.applyQuantity <= quantityCount);
        let discountAmount = discountItems.reduce((total, item) => total + this.discount.priceDiscount * item.quantity || 0, 0);;
        return {totalOrder, discountAmount}
    }
}