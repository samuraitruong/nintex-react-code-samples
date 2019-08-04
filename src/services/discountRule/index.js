/**
 * Factory method to return the discount rule
 * @param {*} discount
 * @returns {*} return the discount rule
 */
import {OrderAmountDiscount} from './orderAmountDiscount';
import {ProductQuantityDiscount} from './productQuantityDiscount';
import {NoDiscount} from './noDiscount';

export function getDiscountRule(discount) {
    const {applyDiscountAmount, percentDiscount, priceDiscount, appyProductId, applyQuantity} = discount || {};
    if (applyDiscountAmount && percentDiscount) {
        return new OrderAmountDiscount(discount);
    }
    if (priceDiscount && appyProductId && applyQuantity) {
        return new ProductQuantityDiscount(discount);
    }
    return new NoDiscount();
}