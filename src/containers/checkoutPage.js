import React, {Component} from 'react'
import {
    Container,
    Row,
    Col,
    InputGroup,
    Button,
    FormControl,
    ListGroup
} from 'react-bootstrap';
import {ProductTable} from '../components';
import {ShoppingCartService, HttpService} from '../services';
import {round} from '../utils';

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
        console.log("new product", product);
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
        console.log("summary", summary);
        this.setState({
            summary,
            checkedDiscount: discountCode !== ''
        });
    }
    render() {
        const {summary, checkedDiscount} = this.state;
        console.log("checkedDiscount", checkedDiscount)
        return (
            <Container>
                <Row>
                    <Col xs="9">
                        <h3>Nintext offers product</h3>
                        <ProductTable
                            products={this.state.cartItems}
                            onQuantityUpdate={this
                            .onQuantityUpdate
                            .bind(this)}></ProductTable>
                    </Col>
                    <Col xs="3" className="pt-3">
                        <h3>CHECKOUT</h3>
                        <ListGroup>
                            <ListGroup.Item>Order Total: ${round(summary.total)}</ListGroup.Item>
                            {summary.discount
                                ? (
                                    <ListGroup.Item variant="info">Discount Total: ${round(summary.discountPrice, 2)}

                                    </ListGroup.Item>
                                )
                                : null}
                            {(checkedDiscount && !summary.discount)
                                ? (
                                    <div className="alert alert-danger mt-3">
                                        Discount code is invalid
                                    </div>
                                )
                                : null}
                        </ListGroup>
                        {summary.discount
                            ? <div className="alert alert-success mt-2">{summary.discount.description}</div>
                            : null}
                        <div className="mt-5">Do you have discount code?</div>

                        <InputGroup className="mb-3 mt-1">

                            <FormControl
                                placeholder="Discount Code"
                                aria-label="Discount Code"
                                value={this.state.discountCode}
                                onChange=
                                {(e) => this.setState({discountCode:e.target.value})}
                                aria-describedby="basic-addon2"/>
                            <InputGroup.Append>
                                <Button
                                    variant="primary"
                                    primary="true"
                                    onClick={this
                                    .handleDiscountChanged
                                    .bind(this)}>Apply</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Button variant="success" onClick={() => console.log("aaaa")}>Process</Button>

                    </Col>
                </Row>

            </Container>
        )
    }
}

export default CheckoutPage