import React, {Component} from 'react'
import {
    Container,
    Row,
    Col,
    InputGroup,
    Button,
    FormControl
} from 'react-bootstrap';
import {ProductTable} from '../components';
import {ShoppingCartService, HttpService} from '../services';
import {round} from '../utils';
import '../styles/checkoutPage.scss';

export class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.cart = new ShoppingCartService();

        this.state = {
            cartItems: [],
            discountCode: '',
            checkedDiscount: false,
            summary: {
                orderTotal: 0
            }
        }
    }
    async componentDidMount() {
        const products = await this
            .http
            .getProducts();
        if (products) {
            const cartItems = products.map(product => {
                return {
                    ...product,
                    quantity: 0,
                    discountedPrice: 0
                }
            });
            this.setState({cartItems})
        }
    }
    onQuantityUpdate(product) {
        const cartItems = [...this.state.cartItems];
        const match = cartItems.find(x => x.id === product.id);
        match.quantity = product.quantity;

        this.setState({
            cartItems
        }, () => {
            this.handleDiscountChanged();
        })

    }
    async handleDiscountChanged() {
        const {cartItems, discountCode} = this.state;
        const summary = await this
            .cart
            .calculateOrder(cartItems, discountCode);
        this.setState({
            summary,
            checkedDiscount: discountCode !== ''
        });
    }
    renderPriceItem(label, price) {
        const id = "priceItem_" + label
            .toLowerCase()
            .replace(/\s/i, '_');

        return (
            <div className="checkoutPage__checkout__price">{label}
                <span className="checkoutPage__checkout__price__value" id={id}>${round(price)}</span>
            </div>
        )
    }
    render() {
        const {summary, checkedDiscount} = this.state;
        return (
            <Container className="checkoutPage">
                <Row>
                    <Col xs="8" className="checkoutPage__products">
                        <h3 className="checkoutPage__products__title mt-0 mb-0">Nintex cloud services</h3>
                        <ProductTable
                            products={this.state.cartItems}
                            onQuantityUpdate={this
                            .onQuantityUpdate
                            .bind(this)}></ProductTable>
                    </Col>
                    <Col xs="4" className="pt-3 pb-5 checkoutPage__checkout">
                        <h3 className="text-center">Process Checkout</h3>
                        {this.renderPriceItem('Price', summary.total)}
                        {summary.discountPrice > 0 && this.renderPriceItem('Discount', summary.discountPrice)}
                        {summary.discountPrice > 0 && this.renderPriceItem('Total', summary.total - summary.discountPrice)}

                        {summary.discount && <div className="alert bg-success mt-2">{summary.discount.description}</div>}

                        <div className="mt-5">
                            Do you have discount code ?
                        </div>
                        <InputGroup className="mb-3 mt-1">
                            <FormControl
                                id="discountCodeInput"
                                placeholder="Discount Code"
                                aria-label="Discount Code"
                                value={this.state.discountCode}
                                onChange=
                                {(e) => this.setState({ discountCode: e.target.value })}
                                aria-describedby="basic-addon2"/>

                            <InputGroup.Append>
                                <Button
                                    id="discountBtn"
                                    variant="primary"
                                    primary="true"
                                    onClick={this
                                    .handleDiscountChanged
                                    .bind(this)}>Apply</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {checkedDiscount && !summary.discount && (
                            <div className="alert bg-danger mt-3">
                                Invalid code or expired
                            </div>
                        )}

                        <Button variant="success">Process</Button>

                    </Col>
                </Row>

            </Container>
        )
    }
}