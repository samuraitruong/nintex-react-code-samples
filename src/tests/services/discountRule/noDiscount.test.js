import NoDiscount from '../../../services/discountRule/noDiscount';

describe('No Discount rule test', () => {
  it('Should calculate order summary correctly with single product items', () => {
    const rule = new NoDiscount();
    const summary = rule.calculateDiscount([
      {
        id: '1',
        price: 10,
        quantity: 5,
      },
    ]);
    expect(summary).toEqual({ discountAmount: 0, totalOrder: 50 });
  });

  it('Should calculate order summary correctly with multiple product items', () => {
    const rule = new NoDiscount();
    const summary = rule.calculateDiscount([
      {
        id: '1',
        price: 10,
        quantity: 5,
      }, {
        id: '2',
        price: 100,
        quantity: 3,
      },
    ]);
    expect(summary).toEqual({ discountAmount: 0, totalOrder: 350 });
  });
  it('Should not calculate order with quantity=0', () => {
    const rule = new NoDiscount();
    const summary = rule.calculateDiscount([
      {
        id: '1',
        price: 10,
        quantity: 0,
      }, {
        id: '2',
        price: 100,
        quantity: 0,
      },
    ]);
    expect(summary).toEqual({ discountAmount: 0, totalOrder: 0 });
  });
});
