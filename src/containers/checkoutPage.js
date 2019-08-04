import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
} from 'react-bootstrap';
import ProductTable from '../components/shopping-cart/productTable';
import ShoppingCartService from '../services/shoppingCartService';
import HttpService from '../services/httpService';
import Utils from '../utils';
import '../styles/checkoutPage.scss';

class CheckoutPageComponent extends Component {
  constructor(props) {
    super(props);
    this.http = new HttpService();
    this.cart = new ShoppingCartService();

    this.state = {
      cartItems: [],
      discountCode: '',
      checkedDiscount: false,
      summary: {
        orderTotal: 0,
      },
    };
  }

  async componentDidMount() {
    const products = await this
      .http
      .getProducts();
    if (products) {
      const cartItems = products.map(product => ({
        ...product,
        quantity: 0,
        discountedPrice: 0,
      }));
      this.setState({ cartItems });
    }
  }

  onQuantityUpdate(product) {
    // below is ok to access state because it for reference only, however, It can be
    // avoid by pass product item in this function eslint-disable-next-line
    // react/no-access-state-in-setstate
    const { cartItems } = this.state;
    const match = cartItems.find(x => x.id === product.id);
    match.quantity = product.quantity;

    this.setState({
      cartItems,
    }, () => {
      this.handleDiscountChanged();
    });
  }

  async handleDiscountChanged() {
    const { cartItems, discountCode } = this.state;
    const summary = await this
      .cart
      .calculateOrder(cartItems, discountCode);
    this.setState({
      summary,
      checkedDiscount: discountCode !== '',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderPriceItem(label, price) {
    const id = `priceItem_${label
      .toLowerCase()
      .replace(/\s/i, '_')}`;

    return (
      <div className="checkoutPage__checkout__price">
        {label}
        <span className="checkoutPage__checkout__price__value" id={id}>
          {`$${Utils.round(price)}`}
        </span>
      </div>
    );
  }

  render() {
    const { 
summary, checkedDiscount, cartItems, discountCode 
} = this.state;
    return (
      <Container className="checkoutPage">
        <Row>
          <Col xs="8" className="checkoutPage__products">
            <h3 className="checkoutPage__products__title mt-0 mb-0">Nintex cloud services</h3>
            <ProductTable
              products={cartItems}
              onQuantityUpdate={p => this.onQuantityUpdate(p)} 
            />
          </Col>
          <Col xs="4" className="pt-3 pb-5 checkoutPage__checkout">
            <h3 className="text-center">Process Checkout</h3>
            {this.renderPriceItem('Price', summary.total)}
            {summary.discountPrice > 0 && this.renderPriceItem('Discount', summary.discountPrice)}
            {summary.discountPrice > 0 && this.renderPriceItem('Total', summary.total - summary.discountPrice)}

            {summary.discount && <div className="alert bg-success mt-2">{summary.discount.description}</div>}

            <div className="mt-5">
              Do you have discount code?
            </div>
            <InputGroup className="mb-3 mt-1">
              <FormControl
                id="discountCodeInput"
                placeholder="Discount Code"
                aria-label="Discount Code"
                value={discountCode}
                onChange={e => this.setState({ discountCode: e.target.value })} 
              />

              <InputGroup.Append>
                <Button
                  id="discountBtn"
                  variant="primary"
                  primary="true"
                  onClick={e => this.handleDiscountChanged(e)}
                >
                  Apply
                </Button>
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
    );
  }
}

export default CheckoutPageComponent;
