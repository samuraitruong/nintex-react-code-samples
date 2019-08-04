/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProductRow from './productRow';
// eslint-disable-next-line react/prefer-stateless-function
export default class ProductTable extends Component {
  render() {
    const {
      products = [],
      onQuantityUpdate,
    } = this.props;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <ProductRow
              product={product}
              key={product.id}
              onQuantityUpdate={item => onQuantityUpdate(item)}
            />
          ))}

        </tbody>
      </Table>
    );
  }
}
ProductTable.propTypes = {
  products: PropTypes.array,
  onQuantityUpdate: PropTypes.func,
};
