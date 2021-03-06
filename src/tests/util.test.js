import Utils from '../utils';

describe('Utils test', () => {
  it('round(10.556677889) should return 10.56', () => {
    const roundedNumber = Utils.round(10.556677889);
    expect(roundedNumber).toBe(10.56);
  });

  it('round(10.556677889, 3) should return 10.557', () => {
    const roundedNumber = Utils.round(10.556677889, 3);
    expect(roundedNumber).toBe(10.557);
  });

  it('round(null) should return 0', () => {
    const roundedNumber = Utils.round(undefined, 3);
    expect(roundedNumber).toBe(0);
  });

  it('round(NaN) should return 0', () => {
    const roundedNumber = Utils.round('dfdf', 3);
    expect(roundedNumber).toBe(0);
  });
});
