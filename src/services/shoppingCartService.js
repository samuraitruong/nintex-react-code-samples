import {HttpService} from ".";
import {getDiscountRule} from "./discountRule";

export class ShoppingCartService {

    constructor(http) {
        this.discount = null;
        this.http = http || new HttpService();
    }
    /**
     * @param {*} products list or product with quantity
     * @param {*} code promotion code if provided
     * @returns card summary with discount, total summary, and discount details.
     */
    async calculateOrder(products, code) {
        if (code && (!this.discount || this.discount.code !== code)) {
            this.discount = await this
                .http
                .getDiscountCode(code);
        }
        const summary = {
            discount: this.discount
        };

        const rule = getDiscountRule(this.discount);
        const {totalOrder, discountAmount} = rule.calculateDiscount(products);
        summary.total = totalOrder;
        summary.discountPrice = discountAmount;

        return summary;
    }
}