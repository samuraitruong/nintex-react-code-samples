import React, {Component} from 'react'
import {Table} from 'react-bootstrap';
import {ProductRow} from './productRow';

export class ProductTable extends Component {

    render() {
        const {
            products = []
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
                    {products.map(product => <ProductRow
                        product={product}
                        key={product.id}
                        onQuantityUpdate={this.props.onQuantityUpdate}/>)}

                </tbody>
            </Table>
        )
    }
}