/* eslint-disable consistent-return */
// eslint-disable-next-line func-names
module.exports = function (req, res) {
  const { code } = req.params;

  const data = [
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
    }, {
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
  ].find(x => x.code === code);

  if (!data) {
    return res
      .status(404)
      .send('No coupon');
  }
  res.send(data);
};
