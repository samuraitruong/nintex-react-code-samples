/* eslint-disable func-names */
module.exports = function (_, res) {
  res.send([
    {
      id: 'wf',
      name: 'Workflow',
      price: 199.99,
    }, {
      id: 'docgen',
      name: 'Document Generation',
      price: 9.99,
    }, {
      id: 'form',
      name: 'Form',
      price: 99.99,
    },
  ]);
};
