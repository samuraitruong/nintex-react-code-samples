import getDiscountRule from '../../../services/discountRule';
import NoDiscount from '../../../services/discountRule/noDiscount';
import ProductQuantityDiscount from '../../../services/discountRule/productQuantityDiscount';
import OrderAmountDiscount from '../../../services/discountRule/orderAmountDiscount';

describe('getDiscountRule test()', () => {
  it('getDiscountRule() should return NoDiscount rule', () => {
    const rule = getDiscountRule({});
    expect(rule).toBeInstanceOf(NoDiscount);
  });
  [
    {
      code: 'FF9543D1',
      description: 'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchase'
          + 'd',
      priceDiscount: 1,
      appyProductId: 'docgen',
      applyQuantity: 10,
    }, {
      code: 'YYGWKJD',
      description: 'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
      priceDiscount: 10,
      appyProductId: 'form',
      applyQuantity: 1,
      relatedProductIds: ['wf'],
    },
  ].forEach((data) => {
    it(`getDiscountRule() should return ProductQuantityDiscount rule when code =${data.code}`, () => {
      const rule = getDiscountRule(data);
      expect(rule).toBeInstanceOf(ProductQuantityDiscount);
    });
  });

  [
    {
      code: 'RRD4D32',
      description: '10% discount for orders above $1000 (pre-discount)',
      percentDiscount: 10,
      applyDiscountAmount: 1000,
    }, {
      code: '44F4T11',
      description: '15% discount for orders above $1500 (pre-discount)',
      percentDiscount: 15,
      applyDiscountAmount: 1500,
    },
  ].forEach((data) => {
    it(`getDiscountRule() should return AmountDiscountRule rule when code =${data.code}`, () => {
      const rule = getDiscountRule(data);
      expect(rule).toBeInstanceOf(OrderAmountDiscount);
    });
  });
});
