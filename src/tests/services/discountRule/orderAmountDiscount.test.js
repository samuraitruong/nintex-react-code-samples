import OrderAmountDiscount from '../../../services/discountRule/orderAmountDiscount';

const discount = {
  code: 'RRD4D32',
  description: '10% discount for orders above $1000 (pre-discount)',
  percentDiscount: 10,
  applyDiscountAmount: 1000,
};
let rule = new OrderAmountDiscount(discount);

describe('orderAmountDiscount Rule tests', () => {
  it('Should apply 10% discount if total order >= 1000$ and multiple product selected', () => {
    const summary = rule.calculateDiscount([
      {
        id: '1',
        price: 100,
        quantity: 5,
      }, {
        id: '2',
        price: 299.99,
        quantity: 3,
      },
    ]);
    expect(summary).toEqual({ discountAmount: 139.997, totalOrder: 1399.97 });
  });

  it('Should apply 10% discount if total order=1000$ and single product selected', () => {
    const summary = rule.calculateDiscount([
      {
        id: '1',
        price: 100,
        quantity: 10,
      },
    ]);
    expect(summary).toEqual({ discountAmount: 100, totalOrder: 1000 });
  });
  it('Should apply 10% discount if total order>1000$ and single product selected', () => {
    const summary = rule.calculateDiscount([
      {
        id: '1',
        price: 100.99,
        quantity: 10,
      },
    ]);
    expect(summary).toEqual({ discountAmount: 100.99, totalOrder: 1009.9 });
  });
  it('Should not apply any if total order < 1000$ and single product selected', () => {
    const summary = rule.calculateDiscount([
      {
        id: '1',
        price: 100,
        quantity: 1,
      },
    ]);
    expect(summary).toEqual({ discountAmount: 0, totalOrder: 100 });
  });

  it('Should apply 15% discount if total order>1000$ and single product selected', () => {
    const discount15 = {
      code: 'RRD4D32',
      description: '15% discount for orders above $1000 (pre-discount)',
      percentDiscount: 15,
      applyDiscountAmount: 1000,
    };
    rule = new OrderAmountDiscount(discount15);

    const summary = rule.calculateDiscount([
      {
        id: '1',
        price: 100.99,
        quantity: 10,
      },
    ]);
    expect(summary).toEqual({ discountAmount: 151.485, totalOrder: 1009.9 });
  });
});
