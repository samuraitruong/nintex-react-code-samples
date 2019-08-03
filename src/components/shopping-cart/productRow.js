import React, {Component} from 'react'
import {Form} from 'react-bootstrap';
import {round} from '../../utils';

export class ProductRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product
        };
    }
    handleQuantityChange(e) {
        const product = {
            ...this.state.product
        };
        product.quantity = parseInt(e.target.value);
        this.setState({product});
        if (this.props.onQuantityUpdate) {
            this
                .props
                .onQuantityUpdate(product);
        }
    }
    render() {
        const {product} = this.state;
        return (
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Quantity"
                        defaultValue="0"
                        value={product.value}
                        onChange={this
                        .handleQuantityChange
                        .bind(this)}/></td>
                <td>${round(product.price * product.quantity, 2)}</td>
            </tr>

        )
    }
}