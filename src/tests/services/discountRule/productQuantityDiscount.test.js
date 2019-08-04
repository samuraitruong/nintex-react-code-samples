import ProductQuantityDiscount from '../../../services/discountRule/productQuantityDiscount';

const discount = {
  code: 'FF9543D1',
  description: 'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchase'
      + 'd',
  priceDiscount: 1,
  appyProductId: 'docgen',
  applyQuantity: 10,
};

let rule = new ProductQuantityDiscount(discount);

describe('ProductQuantityDiscount Rule tests', () => {
  describe('Rule check on same product id', () => {
    it('Should apply 1$ discount if 10 docgen purchased', () => {
      const summary = rule.calculateDiscount([
        {
          id: 'docgen',
          price: 10,
          quantity: 10,
        },
      ]);
      expect(summary).toEqual({ discountAmount: 10, totalOrder: 100 });
    });

    it('Should apply 1$ discount if more than 10 docgen purchased', () => {
      const summary = rule.calculateDiscount([
        {
          id: 'docgen',
          price: 15,
          quantity: 12,
        },
      ]);
      expect(summary).toEqual({
        discountAmount: 12,
        totalOrder: 12 * 15,
      });
    });
    it('Should not apply discount if less than 10 docgen purchased', () => {
      const summary = rule.calculateDiscount([
        {
          id: 'docgen',
          price: 9,
          quantity: 12,
        },
      ]);
      expect(summary).toEqual({ discountAmount: 12, totalOrder: 108 });
    });
    it('Should not apply discount if quantity of apply product < 10 but other products> '
        + '10',
    () => {
      const summary = rule.calculateDiscount([
        {
          id: 'docgen',
          price: 15,
          quantity: 1,
        }, {
          id: 'wf',
          price: 299.99,
          quantity: 10,
        },
      ]);
      expect(summary).toEqual({
        discountAmount: 0,
        totalOrder: 299.99 * 10 + 15,
      });
    });

    it('Should not apply discount to other product if docgen > 10 ', () => {
      const summary = rule.calculateDiscount([
        {
          id: 'docgen',
          price: 15,
          quantity: 10,
        }, {
          id: 'wf',
          price: 299.99,
          quantity: 1,
        },
      ]);
      expect(summary).toEqual({
        discountAmount: 10,
        totalOrder: 299.99 + 150,
      });
    });
  });
  describe('Rule check on other product id', () => {
    beforeEach(() => {
      const discount1 = {
        code: 'YYGWKJD',
        description: 'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
        priceDiscount: 10,
        appyProductId: 'form',
        applyQuantity: 1,
        relatedProductIds: ['wf'],
      };

      rule = new ProductQuantityDiscount(discount1);
    });

    it('Should not apply 10$ discount for form when there is no wf in in shopping card', () => {
      const summary = rule.calculateDiscount([
        {
          id: 'form',
          price: 99.99,
          quantity: 10,
        },
      ]);
      expect(summary).toEqual({ discountAmount: 0, totalOrder: 999.9 });
    });

    it('Should apply 10$ discount for form when there is 1 wf in in shopping card', () => {
      const summary = rule.calculateDiscount([
        {
          id: 'form',
          price: 99.99,
          quantity: 2,
        }, {
          id: 'wf',
          price: 1,
          quantity: 1,
        },
      ]);
      expect(summary).toEqual({
        discountAmount: 20,
        totalOrder: 99.99 * 2 + 1,
      });
    });

    it('Should apply 10$ discount for form when there are more than 1 wf in in shopping '
        + 'card',
    () => {
      const summary = rule.calculateDiscount([
        {
          id: 'form',
          price: 99.99,
          quantity: 2,
        }, {
          id: 'wf',
          price: 1,
          quantity: 2,
        },
      ]);
      expect(summary).toEqual({
        discountAmount: 20,
        totalOrder: 99.99 * 2 + 2,
      });
    });

    it('Should not apply 10$ discount for form when there are other product but not wf c'
        + 'ard',
    () => {
      const summary = rule.calculateDiscount([
        {
          id: 'form',
          price: 99.99,
          quantity: 2,
        }, {
          id: 'docgen',
          price: 1,
          quantity: 2,
        },
      ]);
      expect(summary).toEqual({
        discountAmount: 0,
        totalOrder: 99.99 * 2 + 2,
      });
    });

    it('Should not apply 10$ discount for form when there is 1 wf product but the quanti'
        + 'ty is required 2',
    () => {
      const discount1 = {
        code: 'YYGWKJD',
        description: 'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
        priceDiscount: 10,
        appyProductId: 'form',
        applyQuantity: 2,
        relatedProductIds: ['wf'],
      };

      const discountMultipleQuantityRule = new ProductQuantityDiscount(discount1);

      const summary = discountMultipleQuantityRule.calculateDiscount([
        {
          id: 'form',
          price: 99.99,
          quantity: 2,
        }, {
          id: 'wf',
          price: 1,
          quantity: 1,
        },
      ]);
      expect(summary).toEqual({
        discountAmount: 0,
        totalOrder: 99.99 * 2 + 1,
      });
    });
  });
});
