/**
 * Factory method to return the discount rule
 * @param {*} discount
 * @returns {*} return the discount rule
 */
import {AmountDiscountRule} from './totalAmountDiscount';
import {ProductQuantityDiscount} from './productQuantityDiscount';
import {NoDiscountRule} from './noDiscount';

export function getDiscountRule(discount) {
    const {applyDiscountAmount, percentDiscount, priceDiscount, appyProductId, applyQuantity} = discount || {};
    if (applyDiscountAmount && percentDiscount) {
        return new AmountDiscountRule(discount);
    }
    if (priceDiscount && appyProductId && applyQuantity) {
        return new ProductQuantityDiscount(discount);
    }
    return new NoDiscountRule();
}