/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Utils from '../../utils';

export default class ProductRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
    };
  }

  handleQuantityChange(e) {
    const { product } = this.state;
    const { onQuantityUpdate } = this.props;
    product.quantity = parseInt(e.target.value, 10);
    this.setState({ product });
    if (onQuantityUpdate) {
      onQuantityUpdate(product);
    }
  }

  render() {
    const { product } = this.state;
    return product
      ? (
        <tr className="productRow">
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <Form.Control
              className="quantity"
              size="sm"
              type="text"
              placeholder="Quantity"
              defaultValue="0"
              value={product.value}
              onChange={e => this.handleQuantityChange(e)} 
            />
          </td>
          <td>
            <span className="price">
              {`$${Utils.round(product.price * product.quantity, 2)}`}
            </span>
          </td>
        </tr>

      )
      : null;
  }
}

ProductRow.propTypes = {
  product: PropTypes.object,
  onQuantityUpdate: PropTypes.func,
};
